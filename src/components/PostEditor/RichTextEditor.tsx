import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from "dompurify"
// css for editor size
import "../../assets/css/editor.css"
import IPost from "../../interfaces/post"
import Toolbar from "./Toolbar"

function RichTextEditor({ post, setPost }: { post: IPost, setPost: React.Dispatch<React.SetStateAction<IPost>> }) {

    // TODO add underline, links, colors?

    // Editor setup
    const extensions = [
        StarterKit.configure({
            bulletList: { keepMarks: true, },
            orderedList: { keepMarks: true, },
        }),
    ]
    const editor = useEditor({
        extensions,
        content: post.content,
        autofocus: true,
        // bootstrap class to text area
        editorProps: { attributes: { class: "prosemirror-editor" } },
        // like onChange for text area
        onUpdate: ({ editor }) => {
            setPost((prevPost: IPost) => {
                return {
                    ...prevPost,
                    content: DOMPurify.sanitize(editor.getHTML())
                }
            })
        }
    })

    // Typescript security blanket
    if (!editor) {
        return <></>
    }

    return (
        <div className="form-control input-container p-0">
            <Toolbar editor={editor} className="border-bottom" />
            <EditorContent editor={editor} />
            {/* TODO Make these ↓ */}
            {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
            {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
        </div>
    )
}

export default RichTextEditor