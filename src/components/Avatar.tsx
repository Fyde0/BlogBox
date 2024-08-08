import { Image } from "react-bootstrap"
import config from "../config/config"

function Avatar({ avatar, size, className }: { avatar?: string, size?: number, className?: string }) {

    let avatarToShow = "default"
    if (avatar) {
        avatarToShow = avatar
    }

    let imgSize = 128
    if (size) {
        imgSize = size
    }

    return (
        <Image
            height={imgSize} width={imgSize} rounded
            style={{ objectFit: "cover", objectPosition: "center" }}
            src={config.api.url + "/avatars/" + avatarToShow}
            className={className}
        />
    )
}

export default Avatar