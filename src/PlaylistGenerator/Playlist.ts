import {SongCluster} from "./SongCluster"
import {Song} from "./Song"
import {SongGraph} from "./SongGraph"

export class Playlist {

    constructor(
        private readonly songGraph: SongGraph,
        private readonly currentPositionCluster: string,
        readonly config: PlaylistConfig,
        private readonly revisitMultiplier: number = 1,
        readonly visitsLeftMap: { [key: string]: number } = {},
        readonly selectedSongs: string[] = [],
        private readonly streakInCurrentCluster = 0,
        readonly currentTime = 0
    ) {

        if (JSON.stringify(this.visitsLeftMap) === JSON.stringify({})) {
            this.songGraph.clusters.forEach((cluster: SongCluster) => {

                this.visitsLeftMap[cluster.name] = cluster.defaultVisitsLeft * this.revisitMultiplier
                cluster.songsList.forEach((song: Song) => {
                    this.visitsLeftMap[song.name] = song.defaultVisitsLeft * this.revisitMultiplier
                })
            })
        }
    }

    calculateUpperBoundTimeRemaining(): number {

        let totalTimeRemaining: number = 0
        const dfsVisited: { [key: string]: boolean } = {}
        let dfsStack: string[] = [this.currentPositionCluster]

        while (dfsStack.length > 0) {

            // Grab the top node off the stack
            const visitingName = dfsStack.pop()
            if (typeof visitingName === "undefined") throw "Undefined visiting name when using DFS to calculate time of playlist"

            // // TODO: remove debug breakpoint
            // try {
            //     if (dfsStack.length === 0) throw "REMOVE THIS DEBUG TEST BREAKPOINT"
            // } catch(e) {
            //     alert(e)
            // }

            // If it is visited ignore it
            if (dfsVisited[visitingName]) continue

            // Find the cluster
            const visitingCluster = this.songGraph.lookupCluster(visitingName)
            if (!visitingCluster) throw `Failed to lookup cluster when visiting cluster ${visitingName}`

            // Visit the node
            dfsVisited[visitingName] = true
            if (!this.config.isWithinBounds(visitingCluster)) continue

            // Calculate the additional time from this cluster
            let totalClusterTime = 0
            visitingCluster.songsList.forEach(song =>
                totalClusterTime += song.timeInSeconds * this.visitsLeftMap[song.name]
            )
            totalTimeRemaining += totalClusterTime * this.visitsLeftMap[visitingName]

            // Push all neighbors to the stack
            dfsStack = [...dfsStack, ...(visitingCluster.neighborNames)]
        }

        return totalTimeRemaining
    }

    findSongCandidates(): SongCandidate[] | null {

        const currentCluster = this.songGraph.lookupCluster(this.currentPositionCluster)
        if (!currentCluster) throw "failed to find current position cluster when finding song candidates"

        const canPickFromSameCluster = this.streakInCurrentCluster < currentCluster.highSongsPerVisit
        const canPickFromDifferentCluster = this.streakInCurrentCluster >= currentCluster.lowSongsPerVisit

        if (!canPickFromSameCluster && !canPickFromDifferentCluster)
            throw "Failed to determine which clusters to pick from when finding song candidates"

        const candidatesList: SongCandidate[] = []

        // if you can pick from this cluster
        if (canPickFromSameCluster) {
            currentCluster.songsList.forEach(song => {

                // add a candidate for each song with visits left
                if (this.visitsLeftMap[song.name] && this.config.isUnderMaxTime(this.currentTime, song.timeInSeconds))
                    candidatesList.push(new SongCandidate(song.name, currentCluster.name, song.timeInSeconds))
            })
        }

        // if you can pick from neighboring clusters
        if (canPickFromDifferentCluster) {

            // for each neighbor
            for (const neighborName of currentCluster.neighborNames) {

                // ensure there are visits left
                if (!this.visitsLeftMap[neighborName]) continue

                // lookup the cluster from the name
                const neighbor = this.songGraph.lookupCluster(neighborName)
                if (!neighbor) throw "Failed to find specific neighbor of current cluster when finding song candidates"

                // ensure the neighbor is withing the config parameters
                if (this.config.isWithinBounds(neighbor)) {

                    // add a candidate for each song with visits left
                    neighbor.songsList.forEach(song => {
                        if (this.visitsLeftMap[song.name] && this.config.isUnderMaxTime(this.currentTime, song.timeInSeconds))
                            candidatesList.push(new SongCandidate(song.name, neighbor.name, song.timeInSeconds))
                    })
                }
            }
        }

        if (candidatesList.length === 0) return null

        // if there is one or more songs that would finish the playlist choose them
        const candidatesThatWouldFinish = candidatesList.filter(
            candidate => this.config.wouldMeetTargetTime(this.currentTime, candidate.timeInSeconds)
        )
        if (candidatesThatWouldFinish.length > 0) return candidatesThatWouldFinish

        return candidatesList
    }

    chooseCandidate(songCandidate: SongCandidate): Playlist {
        // check that song has a visit left
        if (!this.visitsLeftMap[songCandidate.songName]) throw "Attempted to add a song without visits left"

        // determine how to treat streak in current cluster
        const isInSameCluster = songCandidate.clusterName === this.currentPositionCluster
        const newStreak = isInSameCluster ? this.streakInCurrentCluster + 1 : 0

        // prevent mutations on visits left map
        // update visits left for the cluster and the song
        const newVisitsLeftMap = {...this.visitsLeftMap}
        newVisitsLeftMap[songCandidate.songName] = newVisitsLeftMap[songCandidate.songName] - 1
        if (!isInSameCluster)
            newVisitsLeftMap[songCandidate.clusterName] = newVisitsLeftMap[songCandidate.clusterName] - 1

        // select the song and prevent mutations on songlist
        const newSelectedSongs = [...this.selectedSongs, songCandidate.songName]
        const newCurrentTime = this.currentTime + songCandidate.timeInSeconds

        // return a new playlist with this song added, a new visits left
        return new Playlist(
            this.songGraph,
            songCandidate.clusterName,
            this.config,
            this.revisitMultiplier,
            newVisitsLeftMap,
            newSelectedSongs,
            newStreak,
            newCurrentTime
        )
    }

    copy() {
        return new Playlist(
            this.songGraph,
            this.currentPositionCluster,
            this.config,
            this.revisitMultiplier,
            {...this.visitsLeftMap},
            [...this.selectedSongs],
            this.streakInCurrentCluster,
            this.currentTime
        )
    }
}

export class PlaylistConfig {

    // All ratings on a scale of 1 - 10
    constructor(
        public readonly targetTime,
        public readonly allowedOvershoot,
        public readonly familyRatingMax,
        public readonly familyRatingMin,
        public readonly pacingRatingMax,
        public readonly pacingRatingMin,
        public readonly gaynessRatingMax,
        public readonly gaynessRatingMin,
        public readonly cultureRatingMax,
        public readonly cultureRatingMin
    ) {}

    public isWithinBounds(cluster: SongCluster): boolean {
        return cluster.familyRating >= this.familyRatingMin
            && cluster.familyRating <= this.familyRatingMax
            && cluster.pacingRating >= this.pacingRatingMin
            && cluster.pacingRating <= this.pacingRatingMax
            && cluster.gaynessRating >= this.gaynessRatingMin
            && cluster.gaynessRating <= this.gaynessRatingMax
            && cluster.cultureRating >= this.cultureRatingMin
            && cluster.cultureRating <= this.cultureRatingMax
    }

    public wouldMeetTargetTime(currentTimeInSeconds: number, candidateAddition: number): boolean {
        return this.isCompleted(currentTimeInSeconds + candidateAddition)
    }

    public isUnderMaxTime(currentTimeInSeconds: number, candidateAddition: number): boolean {
        return currentTimeInSeconds + candidateAddition <= this.targetTime + this.allowedOvershoot
    }

    public isCompleted(currentTimeInSeconds): boolean {
        return currentTimeInSeconds >= this.targetTime
        && currentTimeInSeconds <= this.targetTime + this.allowedOvershoot
    }
}

class SongCandidate {
    constructor(
        readonly songName: string,
        readonly clusterName: string,
        readonly timeInSeconds: number
    ) {}
}

export const createPlaylistConfig = (o: object): PlaylistConfig => {
        //
        // public readonly targetTime,
        // public readonly allowedOvershoot,
        // public readonly familyRatingMax,
        // public readonly familyRatingMin,
        // public readonly pacingRatingMax,
        // public readonly pacingRatingMin,
        // public readonly gaynessRatingMax,
        // public readonly gaynessRatingMin,
        // public readonly cultureRatingMax,
        // public readonly cultureRatingMin
    if (
           o["targetTime"] === undefined
        || typeof o["targetTime"] != "number"
        || o["allowedOvershoot"] === undefined
        || typeof o["allowedOvershoot"] != "number"
        || o["familyRatingMax"] === undefined
        || typeof o["familyRatingMax"] != "number"
        || o["familyRatingMin"] === undefined
        || typeof o["familyRatingMin"] != "number"
        || o["pacingRatingMax"] === undefined
        || typeof o["pacingRatingMax"] != "number"
        || o["pacingRatingMin"] === undefined
        || typeof o["pacingRatingMin"] != "number"
        || o["gaynessRatingMax"] === undefined
        || typeof o["gaynessRatingMax"] != "number"
        || o["gaynessRatingMin"] === undefined
        || typeof o["gaynessRatingMin"] != "number"
        || o["cultureRatingMax"] === undefined
        || typeof o["cultureRatingMax"] != "number"
        || o["cultureRatingMin"] === undefined
        || typeof o["cultureRatingMin"] != "number"
    ) throw "missing fields when attempting to create GeneratorConfig"

    return new PlaylistConfig(
        o["targetTime"],
        o["allowedOvershoot"],
        o["familyRatingMax"],
        o["familyRatingMin"],
        o["pacingRatingMax"],
        o["pacingRatingMin"],
        o["gaynessRatingMax"],
        o["gaynessRatingMin"],
        o["cultureRatingMax"],
        o["cultureRatingMin"]
    )
}