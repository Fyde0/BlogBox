interface IPostsCountByMonth {
    _id: {
        year: number
        month: number
    },
    count: number
}

export function isIPostsCountByMonth(obj: IPostsCountByMonth): obj is IPostsCountByMonth {
    return obj._id.year && obj._id.month && obj.count ? true : false
}

export function isIPostsCountByMonthArray(obj: IPostsCountByMonth[]): obj is IPostsCountByMonth[] {
    return obj.every(post => isIPostsCountByMonth(post))
}

export default IPostsCountByMonth