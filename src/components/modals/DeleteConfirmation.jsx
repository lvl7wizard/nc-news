import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"

const DeleteConfirmation = ({showModal, setShowModal, deleteFunction, deleteMessage}) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          className="border-bottom border-secondary bg-danger"
        >
          <Modal.Title className="text-dark">Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-light bg-dark">
          {deleteMessage}
        </Modal.Body>
        <Modal.Footer className="border-top bg-dark">
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
            className="text-light"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {setShowModal(false), deleteFunction()}}
            className="text-light"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DeleteConfirmation;