import React, { useState, useEffect } from "react";
import fireDb from "../../../FirebaseConfig/Realtime";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const ViewerUser = ({ users, show, handleSuccess }) => {
  const [user, setUser] = useState({});

  const [id] = useState(users.id);

  useEffect(() => {
    fireDb
      .child(`users/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);

  //   console.log("user", user);

  return (
    <>
      <Modal show={show} onHide={handleSuccess} animation={false}>
        <ModalBody>
          {/* <div className="card"> */}
          <ModalHeader className="card-header" closeButton>
            <p>User Contact Detail</p>
          </ModalHeader>
          <div className="container">
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Name: </strong>
            <span>{user.name}</span>
            <br />
            <br />
            <strong>CPF: </strong>
            <span>{user.cpf}</span>
            <br />
            <br />
            <strong>Email: </strong>
            <span>{user.email}</span>
            <br />
            <br />
            <strong>Senha: </strong>
            <span>{user.password}</span>
            <br />
            <br />
            <strong>Confirmar senha: </strong>
            <span>{user.confirm_password}</span>
            <br />
            <br />
            <br />
            <div className="row">
              <input
                type="submit"
                onClick={() => {
                  handleSuccess();
                }}
                value="Go Back"
              />
            </div>
          </div>
          {/* </div> */}
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewerUser;
