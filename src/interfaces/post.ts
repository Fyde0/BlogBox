import { emptyUserInfo, isIUserInfo, IUserInfo } from "./user";

interface IPost {
    _id?: string
    postId?: string
    title: string
    author: IUserInfo
    content: string
    picture?: string
    createdAt?: Date
    updatedAt?: Date
}

export const emptyPost = {
    title: "",
    author: emptyUserInfo,
    content: ""
}

export function isIPost(obj: IPost): obj is IPost {
    return obj.title && isIUserInfo(obj.author) && obj.content ? true : false
}

export default IPost