import { ReactNode } from "react";
import { Badge } from "react-bootstrap";
import RouterLink from "./RouterLink";

interface ITagProps {
    children: ReactNode
    link?: string
    className?: string
    onRemove?: Function
}

function Tag(props: ITagProps) {
    // need this for TypeScript
    const onRemove = props.onRemove

    const cursorType = props.link ? "pointer" : "default"
    const background = props.link ? "transparent" : "primary"

    const tag =
        <Badge
            className={props.className}
            bg={background}
            style={{ cursor: cursorType }}
        >
            <span>#{props.children}</span>
            {
                onRemove &&
                <i
                    className="remove-tag-icon fa-solid fa-xmark"
                    style={{ cursor: "pointer" }}
                    onClick={() => onRemove()}
                />
            }
        </Badge>

    if (props.link) {
        return (
            <RouterLink
                type="button"
                to={props.link}
                className="p-0"
            >
                {tag}
            </RouterLink>
        )
    }

    return (
        <>
            {tag}
        </>
    )
}

export default Tag