import randomString from "crypto-random-string";
import { NextResponse } from "next/server";
import { signJWT } from "@utils/sign";
import { AES, enc } from "crypto-js";

interface DiscordAuth {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: "Bearer" | "Bot";
    scope: string;
    error: string;
}

export async function middleware(req: Request) {
    const url = new URL(req.url);
    let code = url.searchParams.get("code");
    let captcha = url.searchParams.get("captcha");

    if (!code || code == "undefined" || !captcha || captcha == "undefined") return NextResponse.next();

    try {
        const captchaData = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${captcha}`
        );

        const result = await captchaData.json();

        if (!result.success) {
            return NextResponse.json({
                error: "Bot detected",
                success: false,
            });
        }

        const body = new URLSearchParams();

        body.append("client_id", process.env.CLIENT_ID || "");
        body.append("client_secret", process.env.CLIENT_SECRET || "");
        body.append("redirect_uri", process.env.ROOT + "/captcha" || "");
        body.append("grant_type", "authorization_code");
        body.append("code", code);

        const auth = await fetch("https://discord.com/api/oauth2/token", {
            body: body.toString(),
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const res: DiscordAuth = await auth.json();
        if (res.error === "invalid_grant") return NextResponse.next();

        const accessTokenIv = randomString({ length: 32 });
        const encryptedAccess = AES.encrypt(res.access_token, enc.Base64.parse(process.env.ACCESS_ENCRYPTION_TOKEN || ""), {
            iv: enc.Base64.parse(accessTokenIv),
        });

        const token = await signJWT({
            act: accessTokenIv + ":" + encryptedAccess,
            exp: Date.now() + 596160 * 1000,
        });

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("Authorization", token || "");

        console.log(res.access_token);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (err) {
        return NextResponse.redirect(process.env.ROOT + "/login");
    }
}

export const config = {
    matcher: "/",
};
