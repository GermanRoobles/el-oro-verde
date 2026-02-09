export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    rating: 1 | 2 | 3 | 4 | 5;
    title: string;
    comment: string;
    date: string;
    verified: boolean;
    helpful: number;
    images?: string[];
}

export interface ProductRating {
    productId: string;
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

export interface ReviewFormData {
    rating: number;
    title: string;
    comment: string;
}
