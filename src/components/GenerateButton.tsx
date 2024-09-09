import {Button} from "react-bootstrap";
import {SongGraph} from "../PlaylistGenerator/SongGraph";
import {SongCluster} from "../PlaylistGenerator/SongCluster";
import {Song} from "../PlaylistGenerator/Song";
import {debugSongGraph, testGeneratorAlgorithm} from "../Tests/tests";

const GenerateButton = () => {

    const generatePlaylist = () => {
        const mySongGraph: SongGraph = debugSongGraph

        testGeneratorAlgorithm()

        return null

        // const myGenerator = Generator(1000)
        // return myGenerator.setSongGraph(mySongGraph).generate()
    }

    return (
        <Button onClick={() => generatePlaylist()}>
            Generate
        </Button>
    )
}

export {GenerateButton}