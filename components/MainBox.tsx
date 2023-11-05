"use client";
import React, { useState } from "react";
import LoadingAnimation from "./LoadingAnimation";
import RenderData from "./RenderData";
import { availableRoutes } from "@utils/routes";

type Colors = "#242930" | "#33b249" | "#FF3333" | "#FF9900";
type Mode = "Visualizer" | "Prettier" | "Raw" | string;

const MainBox = () => {
    const [input, setInput] = useState("https://discord.com/api/v10/users/@me");
    const [visualizer, setVisualizer] = useState<Mode>("Visualizer");
    const [isPending, setIsPending] = useState(false);
    const [version, setVersion] = useState("v10");

    const [result, setResult] = useState<{} | []>({});
    const [statusColor, setStatusColor] = useState<Colors>("#242930");
    const [statusCode, setStatusCode] = useState<number | "none">("none");

    function applyRoute(elm: string) {
        setInput(`https://discord.com/api/${version}${elm}`);
    }

    function editInput(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);

        ["v7", "v8", "v9", "v10"].forEach((elm) => {
            if (e.target.value.includes(`/${elm}/`)) {
                setVersion(elm);
            }
        });
    }

    function editVersion(e: React.ChangeEvent<HTMLSelectElement>) {
        let versions = ["v7", "v8", "v9", "v10"];
        setVersion(e.target.value);

        for (let i = 0; i < versions.length; i++) {
            setInput((prev) => prev.replace(`/${versions[i]}/`, `/${e.target.value}/`));
        }
    }

    async function sendRequest() {
        if (isPending) return;
        setIsPending(true);

        const data = await fetch("/api", {
            body: JSON.stringify({ api: input }),
            cache: "no-cache",
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (data.status < 400) setStatusColor("#33b249");
        else if (data.status < 500) setStatusColor("#FF3333");
        else setStatusColor("#FF9900");

        const user = await data.json();
        setStatusCode(data.status);
        setIsPending(false);
        setResult(user);
    }

    return (
        <div id="main-box">
            <div id="left-box">
                <div id="request-box">
                    <div id="post-header">
                        <select value={version} id="version-select" onChange={editVersion}>
                            {["v10", "v9", "v8", "v7"].map((elm) => (
                                <option key={elm}>{elm}</option>
                            ))}
                        </select>

                        <input id="input" value={input} onChange={editInput} />

                        <button id="send" onClick={sendRequest}>
                            {isPending ? <LoadingAnimation /> : "Send"}
                        </button>
                    </div>

                    <div id="responses">
                        <div style={{ backgroundColor: statusColor }} id="status">
                            <p>Status: {statusCode}</p>
                        </div>

                        <div id="choose-visualizer">
                            {["Visualizer", "Prettier", "Raw"].map((elm: Mode) => (
                                <div
                                    key={elm}
                                    id={elm.toLowerCase()}
                                    onClick={() => setVisualizer(elm)}
                                    style={{ backgroundColor: elm === visualizer ? "#33b249" : "#141517" }}
                                >
                                    {elm}
                                </div>
                            ))}
                        </div>

                        <RenderData input={input} result={result} visualizer={visualizer} />
                    </div>
                </div>
            </div>

            <div id="right-box">
                <div id="history-box">
                    <div id="h-recent-cont">
                        <h3 id="h-recent">Available routes</h3>
                    </div>

                    <div id="route-cont">
                        {availableRoutes.map((route) => (
                            <div onClick={() => applyRoute(route)} key={route} className="route-btn">
                                {route}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainBox;
