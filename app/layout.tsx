import { Metadata } from "next";
import React from "react";
import "@styles/home.css";

export const metadata: Metadata = {
    title: "Visicord API",
    description:
        "Visicord API, an application where you can easily test out discord api without having to code or joining a server! Just send a request and grab your data.",
};

const RootLayout = ({ children }: { children: React.ReactElement }) => {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Play&display=swap" rel="stylesheet" />
            </head>

            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
