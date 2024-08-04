import { useState } from "react"
import Tag from "../Tag"

function TagsInput({ tags, setTags }: { tags: string[], setTags: Function }) {
    const [input, setInput] = useState<string>("")

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "," && input !== "") {
            event.preventDefault()
            setTags([...tags, input])
            setInput("")
        }
        if (event.key === "Backspace" && input === "") {
            event.preventDefault()
            setTags(tags.slice(0, -1))
        }
    }

    return (
        <div
            className="form-control tags-input-div d-inline-flex flex-wrap pt-0"
            style={{ cursor: "text" }}
        >
            {tags.map((tag, i) => {
                if (tag.trim() !== "") {
                    return (
                        <Tag
                            key={i}
                            onRemove={() => setTags(tags.filter((_tag, j) => i !== j))}
                        >
                            {tag}
                        </Tag>
                    )
                }
            })}
            <input
                className="border-0 bg-transparent p-0"
                style={{ outline: "0", marginTop: "6px", width: (input.length * 1.2 + 1) + "ch" }}
                value={input}
                onChange={(e) => {
                    setInput(e.currentTarget.value)
                }}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default TagsInput