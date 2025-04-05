export interface SearchRepositoriesParams {
  query: string;
  page?: number;
  perPage?: number;
}

export interface GetRepoContentsParams {
  owner: string;
  repo: string;
  path?: string;
}

export interface CreateOrUpdateFileParams {
  owner: string;
  repo: string;
  path: string;
  message: string;
  content: string;
  branch: string;
  sha?: string;
}