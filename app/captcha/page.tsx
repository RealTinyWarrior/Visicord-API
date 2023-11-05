import "@styles/captcha.css";
import { Metadata } from "next";
import CaptchaVerification from "@components/CaptchaVerification";

export const metadata: Metadata = {
    title: "Verify Captcha - Visicord API",
};

const Captcha = () => {
    return (
        <div id="container">
            <p>Verify that you are not a ROBOT</p>

            <CaptchaVerification />
        </div>
    );
};

export default Captcha;
