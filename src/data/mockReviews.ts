import type { Review, ProductRating } from '@/types/review';

export const mockReviews: Review[] = [
    {
        id: '1',
        productId: '1',
        userId: 'user1',
        userName: 'María González',
        rating: 5,
        title: 'Excelente calidad',
        comment: 'El producto superó mis expectativas. La calidad es excepcional y llegó en perfectas condiciones. Totalmente recomendado para cualquier cultivador.',
        date: '2024-01-15',
        verified: true,
        helpful: 12,
    },
    {
        id: '2',
        productId: '1',
        userId: 'user2',
        userName: 'Carlos Ruiz',
        rating: 4,
        title: 'Muy bueno',
        comment: 'Buen producto en general. La única pega es que tardó un poco más de lo esperado en llegar, pero la calidad compensa.',
        date: '2024-01-10',
        verified: true,
        helpful: 8,
    },
    {
        id: '3',
        productId: '1',
        userId: 'user3',
        userName: 'Ana Martínez',
        rating: 5,
        title: 'Perfecto para principiantes',
        comment: 'Como principiante, este producto me ha ayudado mucho. Fácil de usar y con resultados visibles desde el primer uso.',
        date: '2024-01-05',
        verified: false,
        helpful: 5,
    },
];

export const mockProductRatings: Record<string, ProductRating> = {
    '1': {
        productId: '1',
        averageRating: 4.7,
        totalReviews: 3,
        ratingDistribution: {
            5: 2,
            4: 1,
            3: 0,
            2: 0,
            1: 0,
        },
    },
};

export const getReviewsByProductId = (productId: string): Review[] => {
    return mockReviews.filter((review) => review.productId === productId);
};

export const getProductRating = (productId: string): ProductRating | null => {
    return mockProductRatings[productId] || null;
};
