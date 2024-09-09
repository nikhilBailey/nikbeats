import {SongGraph} from "../PlaylistGenerator/SongGraph"
import {SongCluster} from "../PlaylistGenerator/SongCluster"
import {Song} from "../PlaylistGenerator/Song"
import {Playlist, PlaylistConfig} from "../PlaylistGenerator/Playlist";
import {Generator, GeneratorConfig} from "../PlaylistGenerator/Generator";

const debugSongGraph = new SongGraph([
    new SongCluster("Upbeat Disney", [
        new Song("Speechless", 208, 1),
        new Song("We Don't Talk About Bruno", 216, 1),
        new Song("Friend Like Me", 155, 1),
        new Song("Into the Unknown", 194, 1),
        new Song("I'll Make a Man Out of You", 201, 1)
    ], 1, 4, 3, 10, 7, 7, 6,
        ["Disney Offbeat Transition"]
    ),
    new SongCluster("Disney Offbeat Transition", [
        new Song("Life is a Highway", 275, 1)
    ], 1, 1, 1, 9, 5, 5, 5,
        ["Upbeat Disney"]
    ),
    new SongCluster("Movie Screaming", [
        new Song("Rewrite the Stars", 217, 1)
    ], 1, 1, 1, 9, 6, 7, 7,
        []
    )
])

const debugConfig = new PlaylistConfig(
    1000,
    180,
    10,
    1,
    10,
    1,
    10,
    1,
    10,
    1
)

const debugGeneratorConfig = new GeneratorConfig(
    8,
    6,
    1,
    1
)

const narrowerDebugConfig = new PlaylistConfig(
    3600,
    180,
    10,
    3,
    9,
    6,
    4,
    10,
    8,
    1
)

const broaderDebugGraph = new SongGraph([
    new SongCluster("Upbeat Disney", [
            new Song("Speechless", 208, 1),
            new Song("We Don't Talk About Bruno", 216, 1),
            new Song("Friend Like Me", 155, 1),
            new Song("Into the Unknown", 194, 1),
            new Song("I'll Make a Man Out of You", 201, 1)
        ], 1, 4, 3, 10, 7, 7, 6,
        ["Disney Offbeat Transition"]
    ),
    new SongCluster("Disney Offbeat Transition", [
            new Song("Life is a Highway", 275, 1)
        ], 1, 1, 1, 9, 5, 5, 5,
        ["Upbeat Disney"]
    ),
    new SongCluster("Movie Screaming", [
            new Song("Rewrite the Stars", 217, 1)
        ], 1, 1, 1, 9, 6, 7, 7,
        []
    )
])


const testGeneratorAlgorithm = () => {

    const assert = (condition: boolean, message: string) => {
        if (!condition) throw message
    }

    // Test song lookups
    assert(
        debugSongGraph.clusters[0].songsList[0].name === debugSongGraph.lookupSong("Speechless")?.name,
        "Song lookup Test Failed"
    )
    assert(
        debugSongGraph.lookupCluster("Disney Offbeat Transition" ) === debugSongGraph.clusters[1],
        "Cluster lookup Test Failed"
    )

    // Test playlist
    const debugPlaylist = new Playlist(debugSongGraph, debugSongGraph.clusters[0].name, debugConfig)
    const debugPlaylist2 = new Playlist(debugSongGraph, debugSongGraph.clusters[0].name, debugConfig,2)

    assert(debugPlaylist.calculateUpperBoundTimeRemaining() === 1249, "calc test failed")
    assert(debugPlaylist2.calculateUpperBoundTimeRemaining() === 4996, "calc test2 failed")

    const debugGenerator = new Generator(debugSongGraph, debugGeneratorConfig)
    const generatedPlaylist = debugGenerator.generate(debugConfig)
    alert(JSON.stringify(generatedPlaylist))
}





export {testGeneratorAlgorithm, debugSongGraph}