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
            className="form-control input-container d-inline-flex align-items-center flex-wrap gap-1"
            style={{ cursor: "text" }}
        >
            {tags.map((tag, i) => {
                if (tag.trim() !== "") {
                    return (
                        <span key={i} className="d-flex align-items-center">
                            {/* input is for spacing */}
                            {/* also TODO implement being able to navigate with keyboard */}
                            <input
                                className="border-0 bg-transparent p-0"
                                style={{ outline: "0", width: "0" }}
                            />
                            <Tag
                                className="d-flex align-items-center gap-1"
                                onRemove={() => setTags(tags.filter((_tag, j) => i !== j))}
                            >
                                {tag}
                            </Tag>
                        </span>
                    )
                }
            })}
            <input
                className="border-0 bg-transparent p-0"
                style={{ outline: "0", width: (input.length * 1.2 + 1) + "ch" }}
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