export class PaginationQuery<T> {
    constructor(
        public totalItems: number,
        public totalPages: number,
        public currentPage: number,
        public itemsPerPage: number,
        public data: T[]
    ){}
}