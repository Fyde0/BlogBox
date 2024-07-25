import { Container, Form } from "react-bootstrap"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from "dompurify"
// 
import "../../assets/css/editor.css"
import IPost from "../../interfaces/post"
import Toolbar from "./Toolbar"

function RTEditor({ setPost }: { setPost: React.Dispatch<React.SetStateAction<IPost>> }) {

    // Editor setup
    const extensions = [
        StarterKit.configure({
            bulletList: { keepMarks: true, },
            orderedList: { keepMarks: true, },
        }),
    ]
    const initContent = ""
    const editor = useEditor({
        extensions,
        content: initContent,
        autofocus: true,
        // bootstrap class to text area
        editorProps: { attributes: { class: "form-control" } },
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
        return null
    }

    return (
        <Container className="d-flex flex-column justify-content-center gap-4">

            {/* Title */}
            <Container>
                <Form.Label className="w-100">
                    <h3>Title</h3>
                    <Form.Control
                        onChange={(e) => {
                            const titleValue = e.currentTarget.value
                            setPost((prevPost: IPost) => ({
                                ...prevPost,
                                title: titleValue
                            }))
                        }}
                    />
                </Form.Label>
            </Container>

            {/* Editor */}
            <Container>
                <Toolbar editor={editor} className="mb-2" />
                <EditorContent editor={editor} />
                {/* TODO Make these ↓ */}
                {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
                {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
            </Container>

        </Container>
    )
}

export default RTEditor