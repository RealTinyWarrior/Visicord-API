import { FaDiscord } from "react-icons/fa";
import DisplayPic from "@components/DisplayPic";

const Home = () => {
    return (
        <div id="container">
            <nav id="navbar">
                <div id="headers">
                    <FaDiscord id="discord-icon" />
                    <h1>Visicord API</h1>
                </div>

                <DisplayPic />
            </nav>

            <div id="main">
                <div id="left-box"></div>
                <div id="container"></div>
            </div>
        </div>
    );
};

export default Home;
