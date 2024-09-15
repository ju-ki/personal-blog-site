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

export type PostType = {
  id: number;
  title: string;
  tag?: string[];
  content: string;
  status: StatusType;
  user_id?: number;
  created_at: Date;
};
