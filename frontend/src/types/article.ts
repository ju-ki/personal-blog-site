import { CategoryType } from './category';
import { TagType } from './tag';

export type Article = {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  date?: string;
};

export enum StatusType {
  Private = 'private',
  Public = 'public',
  Draft = 'draft',
}
export const StatusNameType = {
  private: '非公開',
  public: '公開',
  draft: '下書き',
};

export type PostTag = {
  id: number;
  tag: TagType;
  post_id: number;
  tag_id: number;
};

export type PostType = {
  id?: number;
  title: string;
  tag?: string[];
  category_id: number;
  category?: CategoryType;
  content: string;
  status: StatusType;
  user_id?: number;
  created_at: Date;
  post_tag: PostTag[];
};

export type PaginationProps = {
  paginationData: {
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
  };
};

export type PaginationLinkType = {
  url: string | null;
  label: string;
  active: boolean;
};

export type PaginatePostType = {
  data: PostType[];
  current_page: number;
  last_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
  links: PaginationLinkType[];
};
