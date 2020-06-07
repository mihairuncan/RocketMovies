export interface MovieDetail {
    id: number;
    title: string;
    year: number;
    plotSummary: string;
    grossTakingsAmount: number;
    isAvailableOnDVD: boolean;
    genre: string;
    rating: number;
    pictureURL: string;
    comments?: any[];
    personRoles?: any[];
}
