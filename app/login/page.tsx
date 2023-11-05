import { Metadata } from "next";
import { RxGlobe } from "react-icons/rx";
import "@styles/login.css";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

export const metadata: Metadata = {
    openGraph: {
        title: "Me - Visicord API",
        description:
            "Visicord API, an application where you can easily test out discord api without having to code or joining a server! Just send a request and try out the api.",
        images: [
            {
                url: "./logo.png",
                width: 1200,
                height: 630,
            },
        ],
    },

    title: "Me - Visicord API",
    description:
        "Visicord API, an application where you can easily test out discord api without having to code or joining a server! Just send a request and try out the api.",
};

const Login = () => {
    return (
        <>
            <div id="background">
                <div id="login">
                    <b id="login-text">Login</b>
                    <Link
                        id="link-id"
                        href="https://discord.com/api/oauth2/authorize?client_id=1149634255345963069&redirect_uri=https%3A%2F%2Fvisicord.vercel.app%2Fcaptcha&response_type=code&scope=identify%20connections%20guilds%20email%20messages.read%20gdm.join%20guilds.join%20rpc.notifications.read%20guilds.members.read"
                    >
                        <div id="login-btn">
                            <FaDiscord color="white" /> Authorize
                        </div>
                    </Link>
                    <p id="log-details">Login with your Discord account to use this API. No need to join a server!</p>
                    <div id="data">
                        Visicord API will let you visualize discord's APIs in a cleaner way. Just login with your discord account
                        and send requests!
                    </div>
                    <div id="discord-login">
                        <p id="discord-text">
                            Make sure you are logged into your <Link href="https://discord.com">Discord</Link> account in order to
                            use this application.
                        </p>
                    </div>

                    <p id="author-text">Developed by TinyWarrior</p>
                </div>
                <RxGlobe id="back-logo" />
            </div>
        </>
    );
};

export default Login;
