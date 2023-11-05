import { FaDiscord } from "react-icons/fa";
import MainBox from "@components/MainBox";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import "@styles/home.css";

export const metadata: Metadata = {
    openGraph: {
        title: "Dashboard - Visicord API",
        description:
            "Visicord API, an application where you can easily test out discord api without having to code or joining a server! Just send a request and try out the api.",
        images: [
            {
                url: "https://i.ibb.co/XWG62D7/visicord-logo.png",
                width: 1200,
                height: 630,
            },
        ],
    },

    title: "Dashboard - Visicord API",
    description:
        "Visicord API, an application where you can easily test out discord api without having to code or joining a server! Just send a request and try out the api.",
};

const TokenManager = dynamic(() => import("@components/TokenManager"), { ssr: true });

const Home = () => {
    return (
        <>
            <nav id="navbar">
                <div id="headers">
                    <FaDiscord id="discord-icon" />
                    <h1>Visicord API</h1>
                </div>

                <TokenManager />
            </nav>

            <MainBox />
        </>
    );
};

export default Home;
