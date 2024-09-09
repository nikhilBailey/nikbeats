import {Card} from "react-bootstrap";
import {Themes} from "../context/Themes";
import {ChosenSong} from "./ChosenSong";

export const ChosenSongsDisplay = (props) => {

    return (
        <Card style={{minWidth: "12rem", width: "80%", maxWidth: "24rem", backgroundColor: Themes.lightGreen, opacity: "50%", minHeight: "36rem"}}>
            {...props.chosenSongs.map((songName) => (<ChosenSong text={songName} />))}
        </Card>
    )
}