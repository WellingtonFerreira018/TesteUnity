export default interface Ihistory {
    game: string;
    createdAt: string
    timeDuration: string;
    groups: {
        name: string;
        players: string[];
    }[];
    
    podium: {
        group: number;
        position: number;
    }[];
}