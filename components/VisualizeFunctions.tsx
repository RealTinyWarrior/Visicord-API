"use client";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";
import Link from "next/link";

type Props = {
    textToCopy: string;
};

const VisualizeFunctions = ({ textToCopy }: Props) => {
    const [showCopy, setShowCopy] = useState(true);

    return (
        <>
            <Link target="_blank" href={`https://google.com/search?q=${textToCopy}`}>
                <div className="search">
                    <BiSearchAlt />
                </div>
            </Link>

            <div
                className="copy"
                onClick={() => {
                    if (!showCopy) return;

                    navigator.clipboard.writeText(textToCopy);
                    setShowCopy((prev) => (prev ? false : true));

                    setTimeout(() => {
                        setShowCopy((prev) => (prev ? false : true));
                    }, 1000);
                }}
            >
                {showCopy ? <FaCopy /> : <TiTickOutline color="lime" />}
            </div>
        </>
    );
};

export default VisualizeFunctions;
