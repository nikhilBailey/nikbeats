import {Song} from "./Song"

class SongCluster {
    constructor(
        public readonly name: string,
        public readonly songsList: Song[],
        public readonly defaultVisitsLeft: number,
        public readonly highSongsPerVisit: number,
        public readonly lowSongsPerVisit: number,
        public readonly familyRating: number,
        public readonly pacingRating: number,
        public readonly gaynessRating: number,
        public readonly cultureRating: number,
        public readonly neighborNames: string[]
    ) {}

    lookupSong(songToFind: string) {
        for (const song of this.songsList) {
            if (song.name === songToFind) return song
        }
    }
}

export {SongCluster}