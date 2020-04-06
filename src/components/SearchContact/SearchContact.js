import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import ListContacts from '../ListContacts/ListContacts';
import styles from './SearchContact.module.css';

const generateId = () => shortid.generate();

const SearchContact = ({ value, onChange, filteredContacts, onDelete }) => {
  return (
    <>
      <label className={styles.searchInput} htmlFor={generateId()}>
        Find contacts by name
        <input
          type="text"
          placeholder="Enter name contact"
          name="filter"
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
      </label>
      <h1>Result Search</h1>
      {filteredContacts.length > 0 && (
        <ListContacts contacts={filteredContacts} onDelete={onDelete} />
      )}
    </>
  );
};

SearchContact.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({})),
  onDelete: PropTypes.func.isRequired,
};

SearchContact.defaultProps = {
  filteredContacts: [],
};
export default SearchContact;
