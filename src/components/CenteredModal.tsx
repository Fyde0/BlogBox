import { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

interface CenteredModalProps {
    show: boolean
    onHide: Function
    variant?: string
    title: string
    children: ReactNode
    confirmText: string
    confirmAction: Function
    loading?: boolean
}

function CenteredModal(props: CenteredModalProps) {
    return (
        <Modal
            show={props.show}
            onHide={() => props.onHide()}
            size="sm"
            aria-labelledby="modalTitle"
            aria-describedby="modalBody"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title id="modalTitle">
                    {props.title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body id="modalBody">
                {props.children}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    disabled={props.loading}
                    onClick={() => props.onHide()}
                >
                    Close
                </Button>
                <Button
                    variant={props.variant}
                    disabled={props.loading}
                    onClick={() => { props.confirmAction() }}
                >
                    {
                        props.loading
                            ?
                            <>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span className="visually-hidden" role="status">Loading...</span>
                            </>
                            :
                            <span>{props.confirmText}</span>
                    }

                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default CenteredModal

