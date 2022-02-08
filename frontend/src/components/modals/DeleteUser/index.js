//Firestore Database
// import { doc, deleteDoc } from "firebase/firestore";
// import { db } from "../../../FirebaseConfig/Firestore";
//Realtime Database
import fireDb from "../../../FirebaseConfig/Realtime";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

function DeleteUser({ users, show, handleSuccess }) {
  const id = users.id;
  console.log(users);

  //Firestore Database
  //   const onDelete = async (id) => {
  //     const userDoc = doc(db, "users", id);
  //     await deleteDoc(userDoc);
  //     handleSuccess();
  //   };

  //Realtime Database
  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact?")
    ) {
      fireDb.child(`users/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact deleted successfully");
        }
      });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleSuccess} animation={false}>
        <ModalHeader closeButton>
          <ModalTitle>{`${users.name}`}</ModalTitle>
        </ModalHeader>
        <ModalBody>{`Deseja deletar o usuário ${users.name}?`}</ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleSuccess}>
            Não
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onDelete(id);
            }}
          >
            Sim
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DeleteUser;
