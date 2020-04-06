import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListContacts.module.css';
// import styled from 'styled-components';

const ListContacts = ({ contacts, onDelete }) => {
  return (
    <div className={styles.wrapperListContact}>
      <ul className={styles.listContact}>
        {contacts.map(contact => (
          <li key={contact.id} className={styles.contactItem}>
            <p>{contact.name}</p>
            <p>{contact.number}</p>
            <button
              type="button"
              className={styles.btnDelete}
              onClick={() => onDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ListContacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListContacts;
