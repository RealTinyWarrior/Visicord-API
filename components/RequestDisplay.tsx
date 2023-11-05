"use client";

import React from "react";
import { BiMailSend } from "react-icons/bi";

const RequestDisplay = ({ state }: { state: string }) => {
    return (
        <div id="no-req">
            <BiMailSend id="no-req-icon" />
            <p id="info-text">Send request to</p>

            <div id="api-route">{state}</div>
        </div>
    );
};

export default RequestDisplay;
