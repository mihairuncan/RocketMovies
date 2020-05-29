export class Movie {
    id: number;
    title: string;
    year: number;
    plotSummary: string;
    grossTakingsAmount: number;
    isAvailableOnDVD: boolean;
    genre: string;
    rating: number;
    pictureURL: string;
    comments?: string[];
}
