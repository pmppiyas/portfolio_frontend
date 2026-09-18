import { StaticImageData } from 'next/image';

export interface IBlog {
  id: number;
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  cover?: string;
  tags: string[];
  isFeatured: boolean;
  views: number;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface ICreateBlogPayload {
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  cover?: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface IUpdateBlogPayload extends Partial<ICreateBlogPayload> {
  id: number;
}

export interface IUser {
  name: string;
  email: string;
  photo?: string;
  password?: string;
}

export interface ILoginResponse {
  success: boolean;
  message?: string;
  data: IUser;
}

export interface IReview {
  name: string;
  title: string;
  heading: string;
  description: string;
  image: StaticImageData;
}

export interface IPost {
  id: number;
  title: string;
  description: string;
  content?: string | null;
  thumbnail?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  backendGithubUrl?: string | null;
  tags: string[];
  category?: string | null;
  serial: number;
  isFeatured: boolean;
  isPublished: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  usersEmail?: string | null;
}

export interface ICreatePostPayload {
  title: string;
  description: string;
  content?: string;
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  backendGithubUrl?: string;
  tags: string[];
  category?: string;
  serial?: number;
  isFeatured?: boolean;
  isPublished?: boolean;
}

export interface IUpdatePostPayload extends Partial<ICreatePostPayload> {
  id: number;
}

// Model Project aliases
export type IProject = IPost;
export type ICreateProjectPayload = ICreatePostPayload;
export type IUpdateProjectPayload = IUpdatePostPayload;

export * from './assistant';



