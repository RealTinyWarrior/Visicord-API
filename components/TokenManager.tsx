import { headers } from "next/headers";
import React from "react";
import DisplayPic from "./DisplayPic";

const TokenManager = () => {
    const headerList = headers();
    const token = headerList.get("Authorization");

    return <DisplayPic token={token} />;
};

export default TokenManager;
