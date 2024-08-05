interface IPostsCountByMonth {
    _id: {
        year: number
        month: number
    },
    count: number
}

export function isIPostsCountByMonth(obj: IPostsCountByMonth): obj is IPostsCountByMonth {
    return (
        typeof obj._id.year === "number" &&
            typeof obj._id.month === "number" &&
            typeof obj.count === "number" ?
            true : false
    )
}

export function isIPostsCountByMonthArray(obj: IPostsCountByMonth[]): obj is IPostsCountByMonth[] {
    return obj.every(post => isIPostsCountByMonth(post))
}

export default IPostsCountByMonth