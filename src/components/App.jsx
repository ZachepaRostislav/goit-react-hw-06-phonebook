
import Form from './Form';
import Contacts from './Contacts';
import FindContact from './FindContact';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';


export default function App() {
  const contacts = useSelector(getContacts)

  return (
    <>
      <Form />
      <FindContact />
      {contacts.length > 0 && (
        <Contacts />
      )}
    </>
  );
}
