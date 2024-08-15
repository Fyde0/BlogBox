import { emptyUserInfo, isIUserInfo, IUserInfo, placeholderUserInfo } from "./user"

interface IPost {
    _id?: string
    postId?: string
    title: string
    author: IUserInfo
    content: string
    picture?: string
    tags: string[]
    createdAt?: Date
    updatedAt?: Date
}

export const emptyPost: IPost = {
    title: "",
    author: emptyUserInfo,
    content: "",
    tags: []
}

export const placeholderPost: IPost = {
    title: "Post title",
    author: placeholderUserInfo,
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et nunc nec urna scelerisque dapibus. Aliquam erat volutpat. Proin vestibulum, sem nec pretium vestibulum, libero nunc dapibus nibh, fermentum placerat nisl lorem ac sapien. Aliquam vel elit a magna posuere viverra. Vestibulum consequat, est id vulputate molestie, leo tellus sodales nunc, posuere commodo tortor nunc eu dolor. Quisque fringilla ut elit sed facilisis. Sed et lobortis enim, eu hendrerit mi. Donec dignissim, velit eu iaculis sollicitudin, turpis ligula tempus sem, at venenatis ex dolor feugiat enim. Curabitur id viverra eros, id dapibus metus. Praesent gravida lobortis risus, et tristique velit placerat in. Ut pulvinar volutpat libero ut mollis. Donec sed lectus magna. In laoreet ligula sem, a molestie est condimentum vel. Pellentesque eu erat sit amet nunc facilisis consequat a et metus. Curabitur aliquet arcu scelerisque justo molestie feugiat.</p>",
    picture: "default",
    tags: ["tag1", "tag2", "tag3"],
    createdAt: new Date,
    updatedAt: new Date
}

export function isIPost(obj: IPost): obj is IPost {
    // we only need the username
    return obj.title && isIUserInfo(obj.author) && obj.content ? true : false
}

export function isIPostArray(obj: IPost[]): obj is IPost[] {
    return obj.every(post => isIPost(post))
}

export default IPost