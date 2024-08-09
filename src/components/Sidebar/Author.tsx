import { Card } from "react-bootstrap";
import { IUserInfo } from "../../interfaces/user";
import Avatar from "../Avatar";

function Author({ userInfo }: { userInfo: IUserInfo }) {
    return (
        <div>
            <h5>Author</h5>
            <Card>
                <Card.Body className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-around align-items-center">
                        <h5 className="">{userInfo.name || userInfo.username}</h5>
                        <Avatar
                            avatar={userInfo.avatar}
                            size={64}
                        />
                    </div>
                    {userInfo.about}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Author