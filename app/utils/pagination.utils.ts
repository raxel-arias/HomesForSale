const DEFAULT_LIMIT: number = 5;

export const GeneratePagination = (page: number, limit?: number) => {
    //limit param default value
    if (!limit) limit = DEFAULT_LIMIT;

    const offset = (page * limit) - limit;

    return {
        offset,
        limit
    }
}

export const CalculatePaginationCount = (limit: number | null, totalRecords: number) => {
    if (!limit) limit = DEFAULT_LIMIT;

    return Math.ceil(totalRecords / limit);
}