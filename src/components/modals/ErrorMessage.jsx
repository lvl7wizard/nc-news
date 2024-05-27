import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"

const ErrorMessage = ({showModal, setShowModal, errorMessage}) => {
  console.log(setShowModal)  
  return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          className="border-bottom border-secondary bg-warning"
        >
          <Modal.Title className="text-dark">Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-light bg-dark">
          {errorMessage}
        </Modal.Body>
        <Modal.Footer className="border-top bg-dark">
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
            className="text-light"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ErrorMessage;