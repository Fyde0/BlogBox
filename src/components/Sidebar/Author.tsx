import { Card } from "react-bootstrap";
import { IUserInfo } from "../../interfaces/user";
import Avatar from "../Avatar";

function Author({ userInfo }: { userInfo: IUserInfo }) {
    return (
        <div>
            <h5>Author</h5>
            <Card>
                <Card.Body>
                    <div>
                        <Avatar
                            avatar={userInfo.avatar}
                            size={96}
                            className="float-start me-2"
                        />
                        <h5>{userInfo.name || userInfo.username}</h5>
                        {userInfo.about}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Author