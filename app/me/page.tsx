import UserBox from "@components/UserBox";
import { AiFillApi } from "react-icons/ai";
import BotBox from "@components/BotBox";
import { Metadata } from "next";
import React from "react";
import "@styles/me.css";

export const metadata: Metadata = {
    openGraph: {
        title: "Me - Visicord API",
        description:
            "Visicord API, an application where you can easily test out discord api without having to code or joining a server! Just send a request and try out the api.",
        images: [
            {
                url: "https://i.ibb.co/xhhq704/about.png",
                width: 1200,
                height: 630,
            },
        ],
    },

    title: "Me - Visicord API",
    description:
        "Visicord API, an application where you can easily test out discord api without having to code or joining a server! Just send a request and try out the api.",
};

const Profile = () => {
    return (
        <>
            <AiFillApi id="icon" />

            <div id="container">
                <div id="main">
                    <UserBox />
                    <BotBox />
                </div>
            </div>
        </>
    );
};

export default Profile;
