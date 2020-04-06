import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Phonebook.module.css';
import CreateContacts from '../CreateContacts/CreateContacts';
import ListContacts from '../ListContacts/ListContacts';
import SearchContact from '../SearchContact/SearchContact';

const filterContacts = (contacts, filter) =>
  contacts.filter(contact =>
    contact.name
      .trim()
      .toLowerCase()
      .includes(filter.trim().toLowerCase()),
  );
export default class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const locatContacts = localStorage.getItem('contacts');
    if (locatContacts) {
      this.setState({
        contacts: JSON.parse(locatContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  toastShow = (text, typeToast) => {
    toast[typeToast](`${text}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleCreateContacts = contact => {
    const { contacts } = this.state;
    const thisNewContact = contacts.some(
      c => c.name.trim().toLowerCase() === contact.name.trim().toLowerCase(),
    );
    if (!thisNewContact) {
      this.setState(s => ({
        contacts: [...s.contacts, contact],
      }));
      this.toastShow('✅ Контакт Добавлен!', 'success');
    } else {
      this.toastShow('❌ Контакт с таким именем уже существует!', 'error');
    }
  };

  handleDeleteContact = id => {
    this.setState(s => ({
      contacts: s.contacts.filter(contact => contact.id !== id),
    }));
    this.toastShow('✅ Контакт успешно удален!', 'success');
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = filterContacts(contacts, filter);
    return (
      <>
        <div className={styles.createContacts}>
          <h1>Create Contact</h1>
          <CreateContacts
            createContacts={this.handleCreateContacts}
            toastShow={this.toastShow}
          />
        </div>
        <div className={styles.box}>
          <div className={styles.searchContact}>
            <h1>Search Contact</h1>
            {contacts.length > 0 && (
              <SearchContact
                value={filter}
                onChange={this.handleChangeInput}
                filteredContacts={filteredContacts}
                onDelete={this.handleDeleteContact}
              />
            )}
          </div>
          <div className={styles.phonebook}>
            <h1>All Contacts</h1>
            {contacts.length > 0 && (
              <ListContacts
                contacts={contacts}
                onDelete={this.handleDeleteContact}
              />
            )}
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
}
