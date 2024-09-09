import {Container} from "react-bootstrap"
import {GeneratorForm} from "../components/GeneratorForm"
import {useState} from "react"
import {PlaylistConfig} from "../PlaylistGenerator/Playlist"
import {Generator, GeneratorConfig} from "../PlaylistGenerator/Generator"
import {SongGraph} from "../PlaylistGenerator/SongGraph"
import {ChosenSongsDisplay} from "../components/ChosenSongsDisplay"
import {ErrorMessage} from "../components/ErrorMessage"
import {defaultSongGraph} from "../data/songGraphData"

const Home = () => {

    const [playlistConfig, setPlaylistConfig] = useState<PlaylistConfig>(new PlaylistConfig(
        3600,
        180,
        10,
        1,
        10,
        1,
        10,
        1,
        10,
        1

    ))

    const [generatorConfig, setGeneratorConfig] = useState<GeneratorConfig>(new GeneratorConfig(
        6,
        5,
        3
    ))

    const [chosenSongs, setChosenSongs] = useState<String[]>([])

    const defaultErrorMessage = " "
    const [errorMessage, setErrorMessage] = useState(defaultErrorMessage)
    const isDefaultErrorMessage = (value) => value === defaultErrorMessage
    const resetErrorMessage = () => setErrorMessage(defaultErrorMessage)

    const [songGraph, setSongGraph] = useState<SongGraph>(defaultSongGraph)

    const generate = () => {

        resetErrorMessage()

        const generator = new Generator(songGraph, generatorConfig)

        const generatedSongsList = generator.generate(playlistConfig)

        if (generatedSongsList === null)
            setErrorMessage("Could not generate playlist from these settings. Try more relaxed settings or a shorter time")

        else setChosenSongs(generatedSongsList)
    }

    const generatorFormProps = {
        generate,
        playlistConfig,
        setPlaylistConfig,
        generatorConfig,
        setGeneratorConfig
    }

    const chosenSongsDisplayProps = {
        chosenSongs
    }

    const errorMessageProps = {
        errorMessage,
        isDefaultErrorMessage,
        setErrorMessage,
        resetErrorMessage
    }

    return (
        <>
            <ErrorMessage {...errorMessageProps} />
            <Container style={{display: "flex", flexWrap: "wrap", gap: "2rem"}}>
                <ChosenSongsDisplay {...chosenSongsDisplayProps} />
                {/*<div style={{flexGrow: 1}} />*/}
                <GeneratorForm {...generatorFormProps} />
            </Container>
        </>
    )
}

export { Home }