import { fetchAllPosts } from '@/hooks/api/posts';
import { PaginatePostType, StatusType } from '@/types/article';
import { create } from 'zustand';

interface PaginationState {
  paginateData: PaginatePostType | undefined;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  fetchPaginateData: (page: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  updatePostStatus: (id: number, status: StatusType) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  paginateData: undefined,
  currentPage: 1,
  isLoading: false,
  error: null,
  fetchPaginateData: async (page) => {
    try {
      set({ isLoading: true });
      const response = await fetchAllPosts(page);
      set({ paginateData: response, isLoading: false });
    } catch (error) {
      set({ error: '記事情報の取得に失敗しました', isLoading: false });
    }
  },
  setCurrentPage: (page) => set({ currentPage: page }),
  updatePostStatus: (id: number, status: StatusType) => {
    set((state) => {
      if (!state.paginateData) return state;

      const updatedData = state.paginateData.data.map((post) => (post.id === id ? { ...post, status } : post));

      return {
        paginateData: {
          ...state.paginateData,
          data: updatedData,
        },
      };
    });
  },
}));
