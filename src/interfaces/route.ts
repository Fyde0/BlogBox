import { LazyRouteFunction } from "react-router-dom"

interface IRoute {
    path: string
    lazy?: LazyRouteFunction<any>
    auth: boolean
    errorElement?: JSX.Element
    children?: IRoute[]
}

export default IRoute