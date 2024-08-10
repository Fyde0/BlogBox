import { Button, ToggleButton } from "react-bootstrap"
import { Editor } from "@tiptap/react"

function Toolbar({ editor, className }: { editor: Editor, className?: string }) {

    // TODO Add/fix styles
    // TODO Add underline, colors
    // TODO Try bootstrap icons?

    const buttonClasses = "btn-sm toolbar-button"
    const buttonGroupClasses = "btn-group"

    return (
        <div
            className={"d-flex justify-content-center flex-wrap gap-2 p-2 editor-toolbar " + className}
            aria-label="Toolbar"
        >
            {/* Don't use <ButtonGroup />, it breaks the editor's JS */}
            <div className={buttonGroupClasses}>
                <ToggleButton
                    id="bold"
                    value="bold"
                    title="Bold"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    checked={editor.isActive('bold')}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-bold"></i>
                </ToggleButton>
                <ToggleButton
                    id="italic"
                    value="italic"
                    title="Italic"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    checked={editor.isActive('italic')}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-italic"></i>
                </ToggleButton>
                <ToggleButton
                    id="strike"
                    value="strike"
                    title="Strike"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    checked={editor.isActive('strike')}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-strikethrough"></i>
                </ToggleButton>
            </div>
            <div className={buttonGroupClasses}>
                <ToggleButton
                    id="paragraph"
                    value="paragraph"
                    type="checkbox"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    checked={editor.isActive('paragraph')}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-paragraph"></i>
                </ToggleButton>
                <ToggleButton
                    id="h1"
                    value="h1"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    checked={editor.isActive('heading', { level: 1 })}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-h"></i> <i className="fa-solid fa-1"></i>
                </ToggleButton>
                <ToggleButton
                    id="h2"
                    value="h2"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    checked={editor.isActive('heading', { level: 2 })}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-h"></i> <i className="fa-solid fa-2"></i>
                </ToggleButton>
                <ToggleButton
                    id="h3"
                    value="h3"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    checked={editor.isActive('heading', { level: 3 })}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-h"></i> <i className="fa-solid fa-3"></i>
                </ToggleButton>
                <ToggleButton
                    id="h4"
                    value="h4"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    checked={editor.isActive('heading', { level: 4 })}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-h"></i> <i className="fa-solid fa-4"></i>
                </ToggleButton>
                <ToggleButton
                    id="h5"
                    value="h5"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    checked={editor.isActive('heading', { level: 5 })}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-h"></i> <i className="fa-solid fa-5"></i>
                </ToggleButton>
                <ToggleButton
                    id="h6"
                    value="h6"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    checked={editor.isActive('heading', { level: 6 })}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-h"></i> <i className="fa-solid fa-6"></i>
                </ToggleButton>
            </div>
            <div className={buttonGroupClasses}>
                <ToggleButton
                    id="bulletList"
                    value="bulletList"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    checked={editor.isActive('bulletList')}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-list-ul"></i>
                </ToggleButton>
                <ToggleButton
                    id="orderedList"
                    value="orderedList"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    checked={editor.isActive('orderedList')}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-list-ol"></i>
                </ToggleButton>
            </div>
            <div className={buttonGroupClasses}>
                <ToggleButton
                    id="code"
                    value="code"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    checked={editor.isActive('code')}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-code"></i>
                </ToggleButton>
                <ToggleButton
                    id="codeBlock"
                    value="codeBlock"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    checked={editor.isActive('codeBlock')}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-file-code"></i>
                </ToggleButton>
            </div>
            <div className={buttonGroupClasses}>
                <ToggleButton
                    id="blockquote"
                    value="blockquote"
                    type="checkbox"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    checked={editor.isActive('blockquote')}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-quote-right"></i>
                </ToggleButton>
            </div>
            <div className={buttonGroupClasses}>
                <Button
                    id="hr"
                    value="hr"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-grip-lines"></i>
                </Button>
                <Button
                    id="break"
                    value="break"
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-arrow-turn-down"></i>
                </Button>
            </div>
            <div className={buttonGroupClasses}>
                <Button
                    id="undo"
                    value="undo"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-rotate-left"></i>
                </Button>
                <Button
                    id="redo"
                    value="redo"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className={buttonClasses}
                >
                    <i className="fa-solid fa-rotate-right"></i>
                </Button>
            </div>
        </div>
    )
}

export default Toolbar