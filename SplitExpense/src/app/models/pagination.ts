import { Group } from "./group";

export interface Pagination {
  page: number;
  pageSize: number;
  totalCount: number;
  items: Group[];
}
