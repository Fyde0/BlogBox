import IPost from "../../../interfaces/post"
import LgCard from "../LgCard"
import LgCardHorizNoThumb from "../LgCardHorizNoThumb"
import LgCardNoThumb from "../LgCardNoThumb"
import LgDefault from "../LgDefault"
import SmCardHoriz from "../SmCardHoriz"
import SmCardHorizNoThumb from "../SmCardHorizNoThumb"
import SmDefault from "../SmDefault"

// const-assertion, makes TS see the array values as literals
export const postPreviewLgStyles = ["LgDefault", "LgCard", "LgCardNoThumb", "LgCardHorizNoThumb"] as const
export const postPreviewSmStyles = ["SmDefault", "SmCardHoriz", "SmCardHorizNoThumb"] as const
export const postPreviewAllStyles = [...postPreviewLgStyles, ...postPreviewSmStyles] as const

// so we can make types from arrays, useful for .map
export type postPreviewLgStyle = typeof postPreviewLgStyles[number]
export type postPreviewSmStyle = typeof postPreviewSmStyles[number]
export type postPreviewAllStyle = typeof postPreviewAllStyles[number]


export const postPreviewComponents: Record<postPreviewAllStyle, React.FC<{ post: IPost }>> = {
    LgDefault: LgDefault,
    LgCard: LgCard,
    LgCardNoThumb: LgCardNoThumb,
    LgCardHorizNoThumb: LgCardHorizNoThumb,
    SmDefault: SmDefault,
    SmCardHoriz: SmCardHoriz,
    SmCardHorizNoThumb: SmCardHorizNoThumb
}