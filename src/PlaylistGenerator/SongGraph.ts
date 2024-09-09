import {SongCluster} from "./SongCluster"
import {Song} from "./Song"

class SongGraph {
    constructor(public readonly clusters: SongCluster[]) {}

    lookupCluster(clusterToFind: string): SongCluster | null {

        for (const cluster: SongCluster of this.clusters) {
            if (cluster.name === clusterToFind) return cluster
        }

        return null
    }

    lookupSong(songToFind: string): Song | null {

        for (const cluster: SongCluster of this.clusters) {
            for (const song: Song of cluster.songsList) {
                if (song.name === songToFind) return song
            }
        }

        return null

    }
}

export {SongGraph}