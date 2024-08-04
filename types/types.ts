export type DataType = {
    id: string;
    title: string;
    description: string;
    image: string;
    authorId: string;
    authorName: string;
    createAt: Date;
}

export type DataFormType = {
    title: string;
    description: string;
    image?: string;
}

export type DbContextType = {
    articles: DataType[];
    addArticle: (articleData: Omit<DataType, 'id'>) => Promise<void>;
    updateArticle: (article: DataType) => Promise<void>;
    deleteArticle: (id: string) => Promise<void>
}