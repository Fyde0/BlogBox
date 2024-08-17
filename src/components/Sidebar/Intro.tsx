import { Card } from "react-bootstrap"
import { useBlogSettings } from "../../api/blogSettings"

function Intro({ overrideTitle, overrideContent }: { overrideTitle?: string, overrideContent?: string }) {
    const blogSettings = useBlogSettings()

    const title = overrideTitle || blogSettings.data?.homeLayout.introCardTitle
    const content = overrideContent || blogSettings.data?.homeLayout.introCardContent

    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {content}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Intro