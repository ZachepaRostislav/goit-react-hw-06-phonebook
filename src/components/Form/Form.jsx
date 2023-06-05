import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { FillForm, FormLabel, FormInput, FormBtn } from './Form.styled';

export default function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch()
  const contacts = useSelector(getContacts)

  const onHandleInputChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const onSubmit = data => {
    const existingContact = contacts.find(
      user => user.name.toLowerCase() === data.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${existingContact.name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      ...data,
    };

    dispatch(addContact(contact))
  };

  const onHadleSubmitForm = e => {
    e.preventDefault();

    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <FillForm action="#" onSubmit={onHadleSubmitForm}>
        <FormLabel >
          Name
          <FormInput
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onHandleInputChange}
          />
        </FormLabel>
        <FormLabel >
          Number
          <FormInput
            type="tel"
            name="number"
            value={number}
            pattern="\\+?\\d{1,4}[-.\\s]?\\(?\d{1,3}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onHandleInputChange}
          />
        </FormLabel>
        <FormBtn type="submit">Add contact</FormBtn>
      </FillForm>
    </>
  );
}
