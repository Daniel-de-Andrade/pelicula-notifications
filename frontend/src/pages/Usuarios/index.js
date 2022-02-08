//Firestore
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../FirebaseConfig/Firestore";
//Realtime
import fireDb from "../../FirebaseConfig/Realtime";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdDelete, MdEdit, MdAdd, MdVisibility } from "react-icons/md";
import CreateUser from "../../components/modals/CreateUser";
import DeleteUser from "../../components/modals/DeleteUser";
import UpdateUser from "../../components/modals/UpdateUser";
import "../../App.css";
import ViewerUser from "../../components/modals/ViewerUser";

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showViewerUser, setShowViewerUser] = useState(false);

  //Firestore
  // const usersCollectionRef = collection(db, "users");

  // const getUsers = async () => {
  //   try {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  //Realtime
  const getUsers = () => {
    fireDb.child("users").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setUsers({ ...snapshot.val() });
      } else {
        setUsers({});
        console.log("users", users);
      }
    });
    return () => {
      setUsers({});
    };
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleCloseCreateUser = () => setShowCreateUser(false);
  const handleShowCreateUser = () => setShowCreateUser(true);

  const handleCloseUpdateUser = () => setShowUpdateUser(false);
  const handleShowUpdateUser = () => setShowUpdateUser(true);

  const handleCloseDeleteUser = () => setShowDeleteUser(false);
  const handleShowDeleteUser = () => setShowDeleteUser(true);

  const handleCloseViewerUser = () => setShowViewerUser(false);
  const handleShowViewerUser = () => setShowViewerUser(true);

  const openModalCreateUser = () => {
    handleShowCreateUser();
  };

  const openModalUpdateUser = (
    id,
    name,
    cpf,
    email,
    password,
    confirm_password
  ) => {
    handleShowUpdateUser();
    setSelectedUser({ id, name, cpf, email, password, confirm_password });
  };

  const openModalDeleteUser = (
    id,
    name,
    cpf,
    email,
    password,
    confirm_password
  ) => {
    handleShowDeleteUser();
    setSelectedUser({ id, name, cpf, email, password, confirm_password });
  };

  const openModalViewerUser = (
    id,
    name,
    cpf,
    email,
    password,
    confirm_password
  ) => {
    handleShowViewerUser();
    setSelectedUser({ id, name, cpf, email, password, confirm_password });
  };

  const handleSuccessCreateUser = () => {
    handleCloseCreateUser();
    getUsers();
  };

  const handleSuccessUpdateUser = () => {
    handleCloseUpdateUser();
    getUsers();
  };

  const handleSuccessDeleteUser = () => {
    handleCloseDeleteUser();
    getUsers();
  };

  const handleSuccessViewerUser = () => {
    handleCloseViewerUser();
    getUsers();
  };

  return (
    <div>
      {showDeleteUser ? (
        <DeleteUser
          users={selectedUser}
          handleSuccess={handleSuccessDeleteUser}
          show={handleShowDeleteUser}
        />
      ) : null}
      {showUpdateUser ? (
        <UpdateUser
          users={selectedUser}
          handleSuccess={handleSuccessUpdateUser}
          show={handleShowUpdateUser}
        />
      ) : null}
      {showCreateUser ? (
        <CreateUser
          handleSuccess={handleSuccessCreateUser}
          show={handleShowCreateUser}
        />
      ) : null}
      {showViewerUser ? (
        <ViewerUser
          users={selectedUser}
          handleSuccess={handleSuccessViewerUser}
          show={handleShowViewerUser}
        />
      ) : null}

      <h1>Usuários</h1>
      <Button
        onClick={() => {
          openModalCreateUser();
        }}
        variant="primary"
      >
        <MdAdd />
      </Button>

      <table id="customers">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Senha</th>
            <th>Confirmar Senha</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Firestore */}
          {/* {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.cpf}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.confirm_password}</td>
              <td className="button-group">
                <Button
                  onClick={() =>
                    openModalUpdateUser(
                      user.id,
                      user.name,
                      user.cpf,
                      user.email,
                      user.password,
                      user.confirm_password
                    )
                  }
                  variant="warning"
                >
                  <MdEdit size={24} />
                </Button>
                <Button
                  onClick={() =>
                    openModalDeleteUser(
                      user.id,
                      user.name,
                      user.cpf,
                      user.email,
                      user.password,
                      user.confirm_password
                    )
                  }
                  variant="danger"
                >
                  <MdDelete size={24} />
                </Button>
              </td>
            </tr>
          ))} */}

          {/* Realtime */}
          {Object.keys(users).map((id) => (
            <tr key={id}>
              <td>{users[id].name}</td>
              <td>{users[id].cpf}</td>
              <td>{users[id].email}</td>
              <td>{users[id].password}</td>
              <td>{users[id].confirm_password}</td>
              <td className="button-group">
                <Button
                  onClick={() =>
                    openModalUpdateUser(
                      id,
                      users[id].name,
                      users[id].cpf,
                      users[id].email,
                      users[id].password,
                      users[id].confirm_password
                    )
                  }
                  variant="warning"
                >
                  <MdEdit size={24} />
                </Button>
                <Button
                  onClick={() =>
                    openModalDeleteUser(
                      id,
                      users[id].name,
                      users[id].cpf,
                      users[id].email,
                      users[id].password,
                      users[id].confirm_password
                    )
                  }
                  variant="danger"
                >
                  <MdDelete size={24} />
                </Button>
                <Button
                  onClick={() =>
                    openModalViewerUser(
                      id,
                      users[id].name,
                      users[id].cpf,
                      users[id].email,
                      users[id].password,
                      users[id].confirm_password
                    )
                  }
                >
                  <MdVisibility />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
