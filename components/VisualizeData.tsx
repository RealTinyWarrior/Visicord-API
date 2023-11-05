"use client";

import VisualizeFunctions from "./VisualizeFunctions";
let keyCounter = 0;

const uid = () => {
    keyCounter++;
    return "vd-" + keyCounter.toString();
};

function VisualizeData(prop: any, fromObject?: boolean) {
    if (fromObject) {
        if (typeof prop[1] === "object" && prop[1] != null)
            return (
                <div key={uid()} className="obj-main">
                    <div className="propname-text">
                        &nbsp;{prop[0]}&nbsp;
                        <span className="typeof-vxt">{Array.isArray(prop[1]) ? "array" : "object"}</span>
                    </div>

                    <div className="prop-master">{VisualizeData(prop[1])}</div>
                </div>
            );

        return (
            <div className="vxt-container" key={uid()}>
                <div className="vxt-data">
                    {prop[0]}: {String(prop[1])}
                    <span className="type-color">
                        {typeof prop[1]}
                        {prop[1] === null ? " [NULL]" : ""}
                    </span>
                </div>

                <div className="vxt-functions">
                    <VisualizeFunctions textToCopy={prop[1]} />
                </div>
            </div>
        );
    }

    if (Array.isArray(prop)) {
        return (
            <div className="varr-container" key={uid()}>
                {prop.map((elm) => VisualizeData(elm))}
            </div>
        );
    }

    if (typeof prop === "object" && !Array.isArray(prop) && prop !== null) {
        const data = Object.entries(prop);

        return (
            <div key={uid()} className="vobj-container">
                {data.map((elm) => VisualizeData(elm, true))}
            </div>
        );
    }

    return (
        <div className="ving-container" key={uid()}>
            <div>{prop}</div>
            <div className="type-color-v">{typeof prop}</div>
        </div>
    );
}

export default function Visualizer({ prop }: { prop: any }) {
    return (
        <div id="alldata-cont" key={uid()}>
            <div id="alldata-cont2">{VisualizeData(prop)}</div>
        </div>
    );
}
