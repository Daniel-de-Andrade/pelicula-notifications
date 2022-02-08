import React, { useState } from "react";
// Firestore
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../../FirebaseConfig/Firestore";
//Realtime
import fireDb from "../../../FirebaseConfig/Realtime";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

function CreateUser({ users, show, handleSuccess }) {
  const [newName, setNewName] = useState("");
  const [newCpf, setNewCpf] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  //Firestore
  // const usersCollectionRef = collection(db, "users");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   await addDoc(usersCollectionRef, {
  //     name: newName,
  //     cpf: newCpf,
  //     email: newEmail,
  //     password: newPassword,
  //     confirm_password: newConfirmPassword,
  //   });
  //   handleSuccess();
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newName ||
      !newCpf ||
      !newEmail ||
      !newPassword ||
      !newConfirmPassword
    ) {
      toast.error("Please provide value in each input field");
    } else {
      fireDb.child("users").push(
        {
          name: newName,
          cpf: newCpf,
          email: newEmail,
          password: newPassword,
          confirm_password: newConfirmPassword,
        },
        (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Added Successfully");
          }
        }
      );
    }
    setTimeout(() => handleSuccess(), 500);
  };

  return (
    <>
      <Modal show={show} onHide={handleSuccess} animation={false}>
        <ModalHeader closeButton>
          <ModalTitle>Criar novo usuário</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="my_container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="name">Nome</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Nome..."
                    onChange={(event) => {
                      setNewName(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label htmlFor="cpf">CPF</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    maxLength="11"
                    required
                    placeholder="CPF..."
                    onChange={(event) => {
                      setNewCpf(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="email">E-mail</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    required
                    placeholder="E-mail..."
                    onChange={(event) => {
                      setNewEmail(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="password">Senha</label>
                </div>
                <div className="col-75">
                  <input
                    type="number"
                    required
                    placeholder="senha..."
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="confirm_password">Confirmar senha</label>
                </div>
                <div className="col-75">
                  <input
                    type="number"
                    required
                    placeholder="Confirmar senha..."
                    onChange={(event) => {
                      setNewConfirmPassword(event.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <input type="submit" value="Criar Usuário" />
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default CreateUser;
