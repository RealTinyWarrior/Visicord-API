import { routes, oauth2AtMe, categories, cachedRoutes } from "@utils/routes";
import { rateLimiter } from "@utils/rateLimiter";
import findRoute from "@utils/findRoute";
import { NextResponse } from "next/server";
import { verifyJWT } from "@utils/verify";
import { AES, enc } from "crypto-js";

type Payload = { act: string; exp: number };

const cache: { [key: string]: [{ [key: string]: any }, number] } = {
    "/gifs/trending": [{}, 0],
    "/gifs/trending-search": [[], 0],
    "/sticker-packs": [{}, 0],
    "/applications/detectable": [{}, 0],
    "/application-directory/collections": [[], 0],
    "/application-directory/search": [{}, 0],
};

export async function POST(req: Request) {
    const { api } = await req.json();
    if (!routes.includes(api)) return NextResponse.json({ error: "unavailable-api" }, { status: 400 });

    const authorization = req.headers.get("Authorization")?.split(" ")[1];
    if (!authorization) return NextResponse.json({ error: "unauthorized-user" }, { status: 401 });

    try {
        const payload = await verifyJWT<Payload>(authorization);
        const [actIV, actData] = payload.act.split(":");

        if (payload.exp < Date.now())
            return NextResponse.json(
                {
                    error: "TOKEN_EXPIRED",
                },
                { status: 401 }
            );

        const accessToken = AES.decrypt(actData, enc.Base64.parse(process.env.ACCESS_ENCRYPTION_TOKEN || ""), {
            iv: enc.Base64.parse(actIV),
        }).toString(enc.Utf8);

        const route = findRoute(api);

        if (route === "/auth/location-metadata") {
            if (!rateLimiter(accessToken, 1, 10000))
                return NextResponse.json({ error: "Too many requests.", tip: "Please try again later." }, { status: 429 });
        } else if (!rateLimiter(accessToken, 1, 1000))
            return NextResponse.json({ error: "Too many requests.", tip: "Please try again later." }, { status: 429 });

        if (route === "/gateway") return NextResponse.json({ url: "wss://gateway.discord.gg" });
        if (route === "/application-directory/categories") return NextResponse.json(categories);

        if (cachedRoutes.includes(route)) {
            if (cache[route][1] < Date.now()) {
                cache[route][1] = Date.now() + 1000 * 60 * 10; // 10 minutes

                const userData = await fetch(api, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await userData.json();
                cache[route][0] = data;
            }

            if (Object.keys(cache[route][0]).length !== 0 || cache[route][0].length !== 0)
                return NextResponse.json(cache[route][0]);
            else cache[route][1] = Date.now() - 1000;
        }

        const userData = await fetch(api, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await userData.json();

        if (oauth2AtMe.includes(api)) data.application.verify_key = "__<BLOCKED_BY_VISICORD_API>__";
        return NextResponse.json(data, { status: userData.status });
    } catch (err) {
        return NextResponse.json(
            {
                error: "unauthorized",
            },
            { status: 401 }
        );
    }
}
