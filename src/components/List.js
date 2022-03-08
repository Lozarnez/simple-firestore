import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {collection, onSnapshot} from 'firebase/firestore';
import db from '../firebase/firebaseConfig';
import Contact from './Contact';

const List = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, 'users'), (snapshot) => {
        const arr = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        });
        setContacts(arr);
      },
      (err) => {
        console.log(err);
      });
  }, []);

  return (
    contacts.length > 0 &&
      <Contenedor>
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            email={contact.email}
          />
        ))}
      </Contenedor>
  )
}

const Contenedor = styled.div`
  margin-top: 40px;
`;

export default List;