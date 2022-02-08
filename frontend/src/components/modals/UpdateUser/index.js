import React, { useState, useEffect } from "react";
//Firestore
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../../FirebaseConfig/Firestore";
//Realtime
import fireDb from "../../../FirebaseConfig/Realtime";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  cpf: "",
  email: "",
  password: "",
  confirm_password: "",
};

function UpdateUser({ users, show, handleSuccess }) {
  const [id] = useState(users.id);
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, cpf, email, password, confirm_password } = state;

  // Firestore
  // const [name, setName] = useState(users.name);
  // const [cpf, setCpf] = useState(users.cpf);
  // const [email, setEmail] = useState(users.email);
  // const [password, setPassword] = useState(users.password);
  // const [confirm_password, setConfirm_password] = useState(
  //   users.confirm_password
  // );

  // const onUpdate = async (event) => {
  //   event.preventDefault();
  //   const userDoc = doc(db, "users", id);
  //   const newFields = {
  //     name: name,
  //     cpf: cpf,
  //     email: email,
  //     password: password,
  //     confirm_password: confirm_password,
  //   };
  //   await updateDoc(userDoc, newFields);
  //   handleSuccess();
  // };

  useEffect(() => {
    fireDb.child("users").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    setState({ ...data[id] });
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    if (!name || !email || !cpf || !password || !confirm_password) {
      toast.error("Please provide value in each input field");
    } else {
      fireDb.child(`users/${id}`).set(state, (err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("User Updated Successfully");
        }
      });
      setTimeout(() => handleSuccess(), 500);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleSuccess} animation={false}>
        <ModalHeader closeButton>
          <ModalTitle>{`Atualize os dados do usuário ${users.name}.`}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="my_container">
            <form onSubmit={onUpdate}>
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
                    value={name}
                    // onChange={(event) => {
                    //   setName(event.target.value);}}
                    onChange={handleInputChange}
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
                    value={cpf}
                    // onChange={(event) => {
                    //   setCpf(event.target.value);
                    // }}
                    onChange={handleInputChange}
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
                    value={email}
                    // onChange={(event) => {
                    //   setEmail(event.target.value);
                    // }}
                    onChange={handleInputChange}
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
                    value={password}
                    // onChange={(event) => {
                    //   setPassword(event.target.value);
                    // }}
                    onChange={handleInputChange}
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
                    value={confirm_password}
                    // onChange={(event) => {
                    //   setConfirm_password(event.target.value);
                    // }}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <input type="submit" value="Atualizar Usuário" />
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default UpdateUser;
