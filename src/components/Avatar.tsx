import { Image } from "react-bootstrap"
import config from "../config/config"

function Avatar({ avatar }: { avatar?: string }) {

    let avatarToShow = "default"
    if (avatar) {
        avatarToShow = avatar
    }

    return (
        <Image
            height={128} width={128} rounded
            style={{objectFit: "cover", objectPosition: "center"}}
            src={config.api.url + "/avatars/" + avatarToShow}
        />
    )
}

export default Avatar