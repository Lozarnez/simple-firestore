import React, { useState } from 'react';
import styled from 'styled-components';
import {doc, deleteDoc, updateDoc} from 'firebase/firestore';
import db from '../firebase/firebaseConfig';

const Contact = ({ id, name, email }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [emailValue, setEmailValue] = useState(email);

  const actualizarContacto = async(event) => {
    event.preventDefault();

    try {
      await updateDoc(doc(db, 'users', id), {
        name: nameValue,
        email: emailValue
      });
    } catch (error) {
      console.log('Hubo un error al actualizar el contacto');
      console.log(error);
    }

    setIsEditing(false);
  }

  const eliminarContacto = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.log("Hubo un error al borrar el contacto");
      console.log(error);
    }
  };

  return (
    <ContenedorContacto>
      {isEditing ? (
        <form onSubmit={actualizarContacto}>
          <Input
            type="text"
            name="name"
            placeholder="Nombre"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <Input
            type="text"
            name="email"
            placeholder="Correo"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <Boton type="submit">Actualizar</Boton>
        </form>
      ) : <div>
          <Nombre>{name}</Nombre>
          <Correo>{email}</Correo>
          <Boton onClick={() => setIsEditing(!isEditing)}>Editar</Boton>
          <Boton onClick={() => eliminarContacto(id)}>Borrar</Boton>
      </div>}
    </ContenedorContacto>
  );
}

const ContenedorContacto = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Nombre = styled.p`
  font-weight: bold;
`;

const Correo = styled.p`
  font-style: italic;
  color: #6b6b6b;
  margin: 5px 0;
`;

const Boton = styled.button`
  padding: 5px 20px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  margin: 0px 2px;
  margin-bottom: 10px;
  transition: 0.3s ease all;
  outline: none;
  background: #c4c4c4;
  color: #fff;
  font-size: 12px;

  &:hover {
    background: #3d76e9;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  width: 100%;
  margin-bottom: 10px;
  transition: 0.2s ease all;
  outline: none;
  text-align: center;

  &:focus {
    border: 2px solid #3d76e9;
  }
`;

export default Contact;