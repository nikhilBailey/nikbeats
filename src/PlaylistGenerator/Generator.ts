import {SongGraph} from "./SongGraph"
import {Playlist, PlaylistConfig} from "./Playlist"
import {sample, sampleIndex} from "../utilities/arrayUtils"

export class Generator {
    constructor(private readonly songGraph: SongGraph, private readonly config: GeneratorConfig) {}

    generate(playlistConfig: PlaylistConfig): string[] | null {

        const candidatesStack: Playlist[] = []
        const startingClusterCandidates: string[] = []

        // find the viable starting clusters
        this.songGraph.clusters.forEach(cluster => {
            if (playlistConfig.isWithinBounds(cluster)) startingClusterCandidates.push(cluster.name)
        })

        // If there are no viable starting clusters, no cluster can be chosen
        if (startingClusterCandidates.length === 0) return null

        // build the initial batch
        // Choose different starting clusters
        // While candidatesStack does not have entire intital batch and there are candidates left
        while(candidatesStack.length < this.config.maxBatchSize && startingClusterCandidates.length != 0) {

            // choose a new candidate starting cluster
            const startingClusterIndex = sampleIndex(startingClusterCandidates)
            const startingPlaylist = new Playlist(
                this.songGraph,
                startingClusterCandidates[startingClusterIndex],
                playlistConfig,
                this.config.revisitMultiplier
            )

            // remove it from the remaining options
            startingClusterCandidates.splice(startingClusterIndex, 1)

            // check if it could meet the desired time
            if (startingPlaylist.calculateUpperBoundTimeRemaining() < startingPlaylist.config.targetTime) continue

            // Add it to the initial batch
            candidatesStack.push(startingPlaylist)
        }

        // Even if we do not have a full initial batch, start to generate
        // While there are candidates left in the stack
        while (candidatesStack.length > 0) {

            // pop one candidate off the stack
            const currentPlaylist = candidatesStack.pop()
            if (!currentPlaylist) throw "Failed to pop off stack when generating a batch of playlists"

            // generate songsBetweenBatch songs on that candidate
            // if this fails, discard it
            // if it is completed, return it
            const newPlaylist = this.generateSongsBetweenBatch(currentPlaylist)
            if (!newPlaylist) continue
            if (newPlaylist.config.isCompleted(newPlaylist.currentTime)) return [...newPlaylist.selectedSongs]

            // create new batch from candidate and push those onto the stack
            for (let batchIndex = 0; batchIndex < this.config.maxBatchSize; batchIndex++) {
                candidatesStack.push(newPlaylist.copy())
            }
        }

        // if there are no candidates on the stack, we have failed to generate
        return null
    }

    private generateSongsBetweenBatch(startingPlaylist: Playlist): Playlist | null {

        // make maxBatchAttempts attempts to generate this batch
        for (let batchAttempt = 0; batchAttempt < this.config.maxBatchAttempts; batchAttempt++) {

            // copy the starting playlist to not mutate it
            let currentPlaylist = startingPlaylist.copy()
            let failedToFindCandidates = false

            // pick songsBetweenBatches songs
            for (let songsPicked = 0; songsPicked < this.config.songsBetweenBatches; songsPicked++) {

                // find candidates
                // if we fail, make a new attempt from startingPlaylist
                const choices = currentPlaylist.findSongCandidates()
                if (!choices) {
                    failedToFindCandidates = true
                    break
                }

                // chose one of those candidates
                currentPlaylist = currentPlaylist.chooseCandidate(sample(choices))

                // if the playlist is completed, return it
                if (currentPlaylist.config.isCompleted(currentPlaylist.currentTime)) return currentPlaylist
            }

            // Check that a candidate was found and that the final choice can meet the time requirements
            if (failedToFindCandidates) continue
            if (currentPlaylist.calculateUpperBoundTimeRemaining() + currentPlaylist.currentTime < currentPlaylist.config.targetTime) continue

            return currentPlaylist
        }

        return null
    }

}

export class GeneratorConfig {
    constructor(
        readonly maxBatchAttempts: number,
        readonly maxBatchSize: number,
        readonly songsBetweenBatches,
        readonly revisitMultiplier: number = 1
    ) {}
}

export const createGeneratorConfig = (o: object): GeneratorConfig => {
    if (
           o["maxBatchAttempts"] === undefined
        || typeof o["maxBatchAttempts"] != "number"
        || o["maxBatchSize"] === undefined
        || typeof o["maxBatchSize"] != "number"
        || o["songsBetweenBatches"] === undefined
        || typeof o["songsBetweenBatches"] != "number"
        || o["revisitMultiplier"] === undefined
        || typeof o["revisitMultiplier"] != "number"
    ) throw "missing fields when attempting to create GeneratorConfig"

    return new GeneratorConfig(o["maxBatchAttempts"], o["maxBatchSize"], o["songsBetweenBatches"], o["revisitMultiplier"])
}