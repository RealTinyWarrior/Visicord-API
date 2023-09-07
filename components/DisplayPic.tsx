"use client";
import React, { useEffect } from "react";

const DisplayPic = () => {
    useEffect(() => {
        console.log("load successfull");
    }, []);

    return <div id="display-pic"></div>;
};

export default DisplayPic;
