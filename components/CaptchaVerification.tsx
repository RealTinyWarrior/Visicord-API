"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const CaptchaVerification = () => {
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (!params.has("code")) router.push("/login");
    }, []);

    return (
        <ReCAPTCHA
            sitekey="6LeUc_goAAAAAHE6NVePnpYSD0lin76Uk8iVe5c0"
            onChange={(e) => {
                router.push(`/?code=${params.get("code")}&captcha=${e}`);
            }}
        />
    );
};

export default CaptchaVerification;
