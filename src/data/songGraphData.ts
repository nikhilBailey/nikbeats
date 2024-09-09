import {SongGraph} from "../PlaylistGenerator/SongGraph";
import {SongCluster} from "../PlaylistGenerator/SongCluster";
import {Song} from "../PlaylistGenerator/Song";

export const defaultSongGraph = new SongGraph([
    new SongCluster("Upbeat Disney", [
            new Song("Speechless", 208, 1),
            new Song("We Don't Talk About Bruno", 216, 1),
            new Song("Friend Like Me", 155, 1),
            new Song("Into the Unknown", 194, 1),
            new Song("I'll Make a Man Out of You", 201, 1)
        ], 1, 4, 3, 10, 7, 7, 6,
        ["Disney Offbeat Transition", "Movie Screaming", "Screaming Hamilton", "Modern Male Screaming", "Modern Female Screaming"]
    ),
    new SongCluster("Movie Screaming", [ // TODO: EXPAND
            new Song("Rewrite the Stars", 217, 1)
        ], 1, 1, 1, 9, 6, 7, 7,
        ["Disney Offbeat Transition", "Upbeat Disney", "Screaming Hamilton"]
    ),
    new SongCluster("Disney Offbeat Transition", [ // TODO: EXPAND
            new Song("Life is a Highway", 275, 1)
        ], 1, 1, 1, 9, 5, 5, 5,
        ["Upbeat Disney", "Movie Screaming", "Offbeat Dance", "Screaming Hamilton", "Rapping Hamilton"]
    ),
    new SongCluster("Offbeat Dance", [ // TODO: EXPAND
            new Song("We Didn't Start The Fire", 215, 1),
            new Song("Mr. Brightside", 222, 1),
            new Song("Boulevard Of Broken Dreams", 262, 1),
            new Song("So What", 215, 1)
        ], 1, 4, 3, 4, 7, 4, 5,
        ["Disney Offbeat Transition", "Gay Latin American Dance"]
    ),
    new SongCluster("Screaming Hamilton", [
            new Song("Wait for It", 193, 1),
            new Song("You'll Be Back", 208, 1)
        ], 1, 1, 1, 8, 6, 7, 7,
        ["Upbeat Disney", "Disney Offbeat Transition", "Movie Screaming", "Rapping Hamilton", "Modern Male Screaming"]
    ),
    new SongCluster("Rapping Hamilton", [
            new Song("Guns and Ships", 127, 1)
        ], 1, 1, 1, 7, 8, 7, 7,
        ["Screaming Hamilton", "Disney Offbeat Transition", "Oldies Rap"]
    ),
    new SongCluster("Indian Dance", [ // TODO: EXPAND
            new Song("Desi Girl", 306, 1),
            new Song("Let's Break Up", 245, 1)
        ], 1, 2, 2, 7, 7, 6, 9,
        ["True Latin Dance", "Gay Latin American Dance"]
    ),
    new SongCluster("True Latin Dance", [ // TODO: EXPAND
        new Song("Bailando", 243, 1)
        ], 0, 1, 1, 7, 7, 6, 10,
        ["Indian Dance", "White Latin Dance"]
    ),
    new SongCluster("Explicit Latin Dance", [ // TODO: EXPAND
            new Song("Taki Taki", 212, 1)
        ], 1, 1, 1, 1, 8, 3, 10,
        []
    ),
    new SongCluster("White Latin Dance", [
            new Song("Timber", 204, 1),
            new Song("Fireball", 236, 1),
            new Song("Give me everything", 252, 1)
        ], 3, 1, 1, 5, 7, 5, 7,
        ["Indian Dance", "Gay Latin American Dance"]
    ),
    new SongCluster("Gay Latin American Dance", [ // TODO: EXPAND
            new Song("Hips Don't Lie", 218, 1)
        ], 1, 1, 1, 6, 6, 8, 6,
        ["White Latin Dance", "Offbeat Dance", "Indian Dance"]
    ),
    new SongCluster("Chill Explicit Rap", [
            new Song("Paint the Town Red", 231, 1),
            new Song("Congratulations", 220, 1),
            new Song("Remember the Name (Ed Sheeran)", 206, 1),
            new Song("Gold Digger", 207, 1)
        ], 1, 3, 2, 2, 4, 2, 4,
        ["Oldies Rap", "Gay Chill Rap"]
    ),
    new SongCluster("Gay Chill Rap", [ // TODO: EXPAND
            new Song("$ave Dat Money", 290, 1)
        ], 1, 1, 1, 4, 4, 8, 6,
        ["Oldies Rap", "Chill Explicit Rap"]
    ),
    new SongCluster("Oldies Rap", [
            new Song("Thrift Shop", 235, 1),
            new Song("It's Tricky", 183, 1),
            new Song("The Real Slim Shady", 284, 1),
            new Song("Informer", 268, 1),
            new Song("Who am I (What's My Name)?", 246, 1),
            new Song("Ignition", 186, 1),
            new Song("Without me (Eminem)", 290, 1),
            new Song("Temperature", 218, 1)
        ], 2, 5, 4, 6, 4, 4, 3,
        ["Gay Chill Rap", "Rapping Hamilton", "Chill Explicit Rap"]
    ),
    new SongCluster("Modern Male Screaming", [
            new Song("Ghost (Justin)", 153, 1),
            new Song("Lonely (Diplo)", 139, 1),
            new Song("Nice to Meet Ya", 158, 1),
            new Song("Sunroof", 163, 1),
            new Song("What Makes You Beautiful", 199, 1),
            new Song("Attention", 209, 1),
            new Song("Stitches", 206, 1)
        ], 2, 4, 3, 6, 7, 7, 2,
        ["Screaming Hamilton", "Upbeat Disney", "Modern Female Screaming"]
    ),
    new SongCluster("Modern Female Screaming", [
            new Song("Love Story (Taylor's Version)", 235, 1),
            new Song("good 4 u", 178, 1),
            new Song("Confident", 205, 1),
            new Song("A Thousand Miles", 237, 1)
        ], 2, 4, 2, 6, 7, 8, 2,
        ["Upbeat Disney"]
    ),
    new SongCluster("Modern Upbeat", [ // TODO: EXPAND
            new Song("Sing", 235, 1)
        ], 1, 1, 1, 5, 7, 5, 4,
        ["Modern Male Screaming"]
    ),
    new SongCluster("Oldies Screaming", [
            new Song("Don't Stop Believing", 248, 1),
            new Song("Livin on a Prayer", 249, 1),
            new Song("Eye of the Tiger", 243, 1)
        ], 1, 3, 2, 8, 6, 6, 2,
        ["Oldies Upbeat"]
    ),
    new SongCluster("Oldies Upbeat", [
            new Song("Smooth Criminal", 257, 1),
            new Song("You Give Love a Bad Name", 222, 1),
            new Song("We Built This City", 296, 1),
            new Song("Separate Ways", 326, 1)
        ], 1, 2, 2, 7, 6, 6, 2,
        ["Oldies Screaming"]
    ),
    new SongCluster("Offbeat Screaming", [
            new Song("Praying", 230, 1),
            new Song("Before you go", 215, 1),
            new Song("Be all right", 196, 1),
            new Song("Ghost (Ella Henderson)", 213, 1)
        ], 2, 2, 2, 5, 4, 6, 4,
        []
    ),
    new SongCluster("Gay Dance Oldies", [ // TODO: EXPAND
            new Song("Gimme! Gimme! Gimme! (A Man After Midnight)", 292, 1),
            new Song("Dancing Queen", 230, 1)
        ], 1, 2, 1, 5, 6, 8, 2,
        []
    ),
    new SongCluster("Happy Country Screaming", [ // TODO: EXPAND
            new Song("Sweet Home Alibama", 283, 1)
        ], 1, 1, 1, 9, 6, 6, 2,
        []
    ),
    new SongCluster("Angry Country Screaming", [
            new Song("I Hope", 210, 1),
            new Song("Before He Cheats", 199, 1),
            new Song("Blown Away", 240, 1),
            new Song("Mama's Broken Heart", 177, 1)
        ], 1, 2,2, 6, 6, 7, 4,
        []
    ),
    new SongCluster("Slow Country", [
            new Song("Friends In Low Places", 231, 1),
            new Song("Something in the Orange", 228, 1)
        ], 1, 2, 1, 6, 3, 3, 4,
        []
    ),
    new SongCluster("Mid Speed Country", [
            new Song("9 to 5", 162, 1),
            new Song("Somethin' Bad", 169, 1)
        ], 1, 2, 1, 7, 5, 6, 4,
        []
    ),
    new SongCluster("Mid Speed Modern Country", [
            new Song("Body like a Back Road", 165, 1),
            new Song("Soul", 167, 1)
        ], 1, 2, 1, 6, 4, 4, 5,
        []
    ),
    new SongCluster("Slow Rock Transition", [
            new Song("I'll Be", 266, 1),
            new Song("Free Fallin", 256, 1)
        ], 1, 1, 1, 7, 4, 4, 5,
        []
    ),
    new SongCluster("Mid Speed 2010s", [
            new Song("Just the Way You Are", 220, 1),
            new Song("Summer", 222, 1),
            new Song("Grenade", 222, 1),
            new Song("Me And My Broken Heart", 193, 1),
            new Song("Dynamite (Taio Cruz)", 203, 1),
            new Song("Someone To You", 219, 1)
        ], 1, 3, 2, 7, 5, 6, 3,
        []
    ),
    new SongCluster("2010s Hip Hop", [
            new Song("Welcome to my House (Flo Rida)", 192, 1),
            new Song("Low", 239, 1),
            new Song("Turn Down for What", 213, 1),
            new Song("Yeah", 250, 1)
        ], 1, 2, 2, 4, 7, 3, 4,
        []
    ),
    new SongCluster("2010s Club", [
            new Song("On the Floor", 284, 1),
            new Song("Pon de Replay", 246, 1),
            new Song("Don't Stop the Music", 267, 1),
            new Song("Scream & Shout", 283, 1)
        ], 1, 2, 2, 5, 7, 7, 5,
        []
    ),
    new SongCluster("Slow Modern", [
            new Song("Photograph (Ed Sheeran)", 258, 1),
            new Song("Thinking Out Loud", 281, 1),
            new Song("Perfect", 263, 1),
            new Song("Speechless", 213, 1),
            new Song("Viva la Vida (Coldplay)", 242, 1),
            new Song("Tequila", 196, 1)
        ], 1, 3, 1, 8, 2, 6, 2,
        []
    ),
    new SongCluster("Teenage Girl", [
            new Song("Toxic", 198, 1),
            new Song("Is It Over Now?", 229, 1),
            new Song("E.T.", 206, 1)
        ], 1, 3, 1, 6, 7, 9, 4,
        []
    ),
    new SongCluster("Gay Alt", [
            new Song("Stacy's Mom", 19, 1)
        ], 1, 1, 1, 3, 5, 10, 5,
        []
    ),
    new SongCluster("Punk Rock", [ // TODO: EXPAND
            new Song("Gives You Hell", 213, 1)
        ], 1, 1, 1, 3, 6, 3, 6,
        []
    ),
    new SongCluster("Gay Girl Music", [
            new Song("Fergilicious", 298, 1),
            new Song("Glamorous", 246, 1),
            new Song("Call me Maybe", 193, 1),
            new Song("Royals", 190, 1),
            new Song("Lips are Movin", 182, 1)
        ], 1, 2, 1, 7, 4, 10, 5,
        []
    ),
    new SongCluster("Gay Party", [
            new Song("Party in the U.S.A.", 202, 1),
            new Song("Firework", 227, 1),
            new Song("I want it that way", 213, 1),
            new Song("Mamma Mia", 213, 1),
            new Song("Only Girl in the World", 235, 1)
        ], 1, 3, 2, 8, 7, 9, 3,
        []
    ),
    new SongCluster("2k Slow", [
            new Song("Drops of Jupiter", 259, 1),
            new Song("Hey, Soul Sister", 216, 1),
            new Song("She Will be Loved", 257, 1),
            new Song("Payphone", 131, 1),
            new Song("Riptide", 204, 1),
            new Song("Hey There Delilah", 232, 1),
            new Song("Pompeii", 214, 1),
            new Song("Stereo Hearts", 210, 1)
        ], 1, 4, 2, 7, 4, 6, 4,
        []
    ),
    new SongCluster("2k Soft Party", [
            new Song("Fireflies", 228, 1),
            new Song("Good Time (Owl City)", 205, 1),
            new Song("The Nights", 176, 1),
            new Song("Wake Me Up", 247, 1),
            new Song("This Love", 206, 1),
            new Song("Best Day Of My Life", 194, 1),
            new Song("Blame", 212, 1),
            new Song("Counting Starts", 257, 1),
            new Song("Love Me Again", 239, 1),
            new Song("Young, Wild & Free", 217, 1)
        ], 1, 4, 3, 7, 7, 6, 3,
        []
    ),
    new SongCluster("2k Dance", [
            new Song("Livin' la Vida Loca", 243, 1),
            new Song("Footloose", 226, 1)
        ], 1, 1, 1, 9, 6, 8, 2,
        []
    ),
    // new SongCluster("Good Vibe Oldies", [
    //         new Song("Sweet Caroline", 203, 1),
    //         new Song("Build me up Buttercup", 173, 1),
    //         new Song("Y.M.C.A.", 286, 1),
    //         new Song("Come on Eileen", 287, 1),
    //         new Song("Uptown Girl", 197, 1),
    //         new Song("Drift Away", 254, 1),
    //         new Song("September", 215, 1),
    //         new Song("American Pie", 516, 1)
    //     ], , , , , , , ,
    //     []
    // ),
    // new SongCluster("Good Vibe Explicit Oldies", [
    //         new Song("Forget you", 222, 1)
    //     ], , , , , , , ,
    //     []
    // ),
    // new SongCluster("Taylor", [ // TODO: EXPAND
    //         new Song("Wildest Dreams", 220, 1),
    //         new Song("Karma (Taylor Swift)", 204, 1)
    //     ], , , , , , , ,
    //     []
    // ),
    // new SongCluster("Eminem", [
    //         new Song("River", 221, 1),
    //         new Song("Psyco (Eminem)", 285, 1)
    //     ], , , , , , , ,
    //     []
    // ),
    // new SongCluster("Post Malone", [
    //         new Song("Circles", 215, 1),
    //         new Song("Psycho", 221, 1)
    //     ], , , , , , , ,
    //     []
    // ),
    // new SongCluster("One Direction", [
    //         new Song("History", 287, 1),
    //         new Song("They Don't Know About Us", 200, 1),
    //         new Song("One Thing", 197, 1)
    //     ], , , , , , , ,
    //     []
    // ),
    // new SongCluster("Latin Screaming", [
    //         new Song("Vivir Mi Vida", 252, 1),
    //         new Song("Pepas", 287, 1)
    //     ], , , , , , , ,
    //     []
    // ),
    // new SongCluster("Workout Rap", [
    //         new Song("Lose Yourself", 326, 1),
    //         new Song("Godzilla", 210, 1),
    //         new Song("Till I Collapse", 297, 1)
    //     ], , , , , , , ,
    //     []
    // ),
    // new SongCluster("", [
    //         new Song("", , )
    //     ], , , , , , , ,
    //     []
    // ),
    // new SongCluster("", [
    //         new Song("", , )
    //     ], , , , , , , ,
    //     []
    // ),


])