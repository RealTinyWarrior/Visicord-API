"use client";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

type User = {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    premium_type: number;
    flags: number;
    banner: any;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: any;
    banner_color: string;
    mfa_enabled: boolean;
    locale: string;
    email: string;
    verified: boolean;
};

const UserBox = () => {
    const [user, setUser] = useState<User>();
    const [pfp, setPfp] = useState("https://cdn3.emoji.gg/emojis/5666-nothing-was-found.png");

    useEffect(() => {
        if (!localStorage.getItem("user") || !localStorage.getItem("profile-icon")) redirect("/login");

        setUser(JSON.parse(localStorage.getItem("user") || "{}"));
        setPfp(localStorage.getItem("profile-icon") || "");
    }, []);

    return (
        <div
            style={
                user?.banner
                    ? { backgroundImage: `url(https://cdn.discordapp.com/avatar/${user.id}/${user.banner}.png)` }
                    : { background: `linear-gradient(${user?.banner_color}, ${user?.banner_color}) no-repeat 0 0` }
            }
            id="user"
        >
            <Link id="pfp-link" href={pfp} target="_blank">
                <div id="pfp">
                    <Image fill src={pfp} alt="Profile Icon" />
                </div>
            </Link>

            <div id="user-container">
                <div id="name-cont">
                    <p id="username">{user?.global_name}</p>
                    <p id="name">{user?.username}</p>
                </div>

                <div id="user-data">
                    {Object.entries(user || {}).map((data, index) => (
                        <div key={data[0]} className="cont-holder">
                            <div
                                style={{ backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#1a1a1a" }}
                                className="user-object"
                                key={data[0] + "1"}
                            >
                                <p key={data[0] + "2"} className="text-padding">
                                    {data[0]}={String(data[1])}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserBox;
