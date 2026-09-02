import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '@/types';

interface PostState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedPost: IPost | null;
  isModalOpen: boolean;
}

const initialState: PostState = {
  searchQuery: '',
  selectedCategory: null,
  selectedPost: null,
  isModalOpen: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<IPost | null>) => {
      state.selectedPost = action.payload;
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    resetPostState: (state) => {
      state.searchQuery = '';
      state.selectedCategory = null;
      state.selectedPost = null;
      state.isModalOpen = false;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedPost,
  setIsModalOpen,
  resetPostState,
} = postSlice.actions;

export default postSlice.reducer;
