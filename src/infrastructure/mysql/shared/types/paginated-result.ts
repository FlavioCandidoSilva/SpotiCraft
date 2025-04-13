export type PaginatedResult<T> = {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}