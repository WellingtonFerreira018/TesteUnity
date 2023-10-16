export default interface Imatch {
    space: number;
    game: number;
    groups: {
        name: string;
        players: [string]
    }
    trivia: boolean;
    random: boolean;
}