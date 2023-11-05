"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";

const DisplayPic = ({ token }: { token: string | null }) => {
    const [profileIcon, setIcon] = useState("https://cdn3.emoji.gg/emojis/5666-nothing-was-found.png");
    const router = useRouter();

    function logout() {
        ["user", "token", "profile-icon", "exp"].forEach((elm) => {
            localStorage.setItem(elm, "");
        });

        router.push("/login");
    }

    useEffect(() => {
        console.log("WARNING! Do not paste any code here, your account might get hacked.");
        console.log("Localstorage has your important data, DO NOT give it to anybody!");

        if (token != undefined) {
            localStorage.setItem("exp", String(Date.now() + 596160 * 1000));
            localStorage.setItem("token", token);

            fetch("/api", {
                body: JSON.stringify({ api: "https://discord.com/api/v10/users/@me" }),
                cache: "no-cache",
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((data) => data.json())
                .then((user) => {
                    if (user.code === 0) router.push("/login");

                    localStorage.setItem("profile-icon", `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
                    localStorage.setItem("user", JSON.stringify(user));

                    setIcon(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
                    router.push("/");
                })
                .catch(() => router.push("/login"));
        }

        setIcon(localStorage.getItem("profile-icon") || "https://cdn3.emoji.gg/emojis/5666-nothing-was-found.png");
        const refresh = localStorage.getItem("token");
        if (!refresh) router.push("/login");

        const expirationDate = Number(localStorage.getItem("exp") || "0");
        if (expirationDate < Date.now()) logout();
    }, []);

    return (
        <>
            <div id="logout" title="Log out" onClick={logout}>
                <BiLogOut id="logout-icon" />
            </div>

            <div onClick={() => router.push("/me")} id="display-pic" title="Your profile">
                <Image src={profileIcon} alt="User icon" height={30} width={30} />
            </div>
        </>
    );
};

export default DisplayPic;
