interface getAllPostsQueryProps {
    page?: number
    startDate?: number | string
    endDate?: number | string
    sort?: "asc" | "desc" | "ascending" | "descending"
}

export default getAllPostsQueryProps