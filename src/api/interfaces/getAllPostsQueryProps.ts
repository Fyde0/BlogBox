interface IGetAllPostsQueryProps {
    page?: number
    startDate?: number | string
    endDate?: number | string
    tags?: string[]
    sort?: "asc" | "desc" | "ascending" | "descending"
}

export default IGetAllPostsQueryProps