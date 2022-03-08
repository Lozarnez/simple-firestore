import React from 'react';
import styled from 'styled-components';
import Form from './components/Form';
import List from './components/List';

const App = () => {
  return (
    <Contenedor>
      <Titulo>Contactos</Titulo>
      <Form />
      <List />
    </Contenedor>
  );
}


const Contenedor = styled.div`
margin: 40px;
width: 90%;
max-width: 400px;
background-color: #fff;
padding: 40px;
border-radius: 5px;
text-align: center;
`;

const Titulo = styled.h2`
margin-bottom: 10px;
`;

export default App;