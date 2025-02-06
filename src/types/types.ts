export type User = {
    email: string;
    password: string;
    name: string;
    username: string;
    id: string;
}

export type Startup = {
    id: number;
    title: string;
    slug: string;
    description: string;
    author: string;
    views: number
    category: string;
    pitch: string;
    image: string;
}