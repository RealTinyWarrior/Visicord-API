import React from "react";

const RootLayout = ({ children }: { children: React.ReactElement }) => {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Play&display=swap" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Play&display=swap" rel="stylesheet" />
            </head>

            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
