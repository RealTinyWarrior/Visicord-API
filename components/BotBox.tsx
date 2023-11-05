import icon from "@app/icon.svg";
import Image from "next/image";

const BotBox = () => {
    return (
        <div id="bot">
            <Image id="bot-img" src={icon} alt="api-logo" />
            <a href="/" id="goto-dashboard">
                <p className="data-text">Go to Dashboard</p>
            </a>
        </div>
    );
};

export default BotBox;
