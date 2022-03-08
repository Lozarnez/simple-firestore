import React, {useState} from 'react';
import styled from 'styled-components';
import { collection, addDoc } from 'firebase/firestore';
import db from './../firebase/firebaseConfig';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, 'users'), {
        name,
        email
      });
    } catch (error) {
      console.log('Hubo un error al guardar en FireStore');
      console.log(error);
    }

    setName('');
    setEmail('');
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Nombre"
      />
      <Input
        type="text"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Correo"
      />
      <Buton type="submit">Agregar</Buton>
    </form>
  )
}

const Input = styled.input`
  padding: 10px;
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 3px;
  width: 100%;
  margin-bottom: 10px;
  transition: .2s ease all;
  outline: none;
  text-align: center;

  &:focus {
    border: 2px solid $3D76E9;
  }
`;

const Buton = styled.button`
  padding: 10px 30px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  transition: .3s ease all;
  outline: none;
  background: #C4C4C4;
  color: #FFF;
  font-size: 12px;

  &:hover {
    background: #3D76E9;
  }
`;

export default Form;