import { emptyUserInfo, IUserInfo } from "./user";

interface IPost {
    _id?: string
    title: string
    author: IUserInfo
    content: string
}

export const emptyPost = {
    title: "",
    author: emptyUserInfo,
    content: ""
}

export default IPost