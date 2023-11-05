"use client";

import React from "react";
import Visualizer from "./VisualizeData";
import RequestDisplay from "./RequestDisplay";
type Mode = "Visualizer" | "Prettier" | "Raw" | string;

interface Props {
    visualizer: Mode;
    result: {} | [];
    input: string;
}

const RenderData: React.FC<Props> = React.memo(
    ({ visualizer, result, input }) => {
        if (Array.isArray(result) && result.length === 0) return <RequestDisplay state={input} />;
        if (Object.keys(result).length === 0) return <RequestDisplay state={input} />;

        if (visualizer === "Prettier") {
            const data = JSON.stringify(result, undefined, 4);

            return (
                <div id="pretty-text">
                    <div>{data}</div>
                </div>
            );
        }

        if (visualizer === "Raw") {
            let data = JSON.stringify(result).replaceAll(",", ", ").replace("{", "{ ").replace("}", " }");

            return (
                <div id="raw-text">
                    <div>{data}</div>
                </div>
            );
        }

        return <Visualizer prop={result} />;
    },

    (prev, next) => prev.result === next.result && prev.visualizer === next.visualizer
);

export default RenderData;
