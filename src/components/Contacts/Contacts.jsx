import React from 'react';
import {
  ContactSection,
  ContactTitle,
  ContactList,
  ContactListItem,
  ContactBtn,
} from './Contacts.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';
export default function Contacts() {

  const dispatch = useDispatch()
  const contacts = useSelector(getContacts)
  const filter = useSelector(getFilter)

  const getFindContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContact = getFindContact();

  return (
    <>
      <ContactSection>
        <ContactTitle>Contacts</ContactTitle>
        <ContactList>
          {visibleContact.map(({ id, name, number }) => {
            return (
              <ContactListItem key={id}>
                {name} : <span>{number}</span>
                <ContactBtn onClick={() => dispatch(deleteContact(id))}>
                  Delete
                </ContactBtn>
              </ContactListItem>
            );
          })}
        </ContactList>
      </ContactSection>
    </>
  );
}


