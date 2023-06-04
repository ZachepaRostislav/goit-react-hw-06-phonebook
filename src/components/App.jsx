
import Form from './Form';
import Contacts from './Contacts';
import FindContact from './FindContact';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';


export default function App() {

  const dispatch = useDispatch()
  const contacts = useSelector(getContacts)


  const onHandlerSubmitForm = data => {
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



  return (
    <>
      <Form onSubmit={onHandlerSubmitForm} />
      <FindContact />
      {contacts.length > 0 && (
        <Contacts />
      )}
    </>
  );
}
