import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styles from './CreateContacts.module.css';

const generateId = () => shortid.generate();

export default class CreateContacts extends Component {
  state = { name: '', number: '' };

  static propTypes = {
    createContacts: PropTypes.func.isRequired,
    toastShow: PropTypes.func.isRequired,
  };

  handleCreateContact = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (name !== '' && number !== '') {
      this.props.createContacts({
        id: generateId(),
        name,
        number,
      });
      this.setState({ name: '', number: '' });
    } else {
      this.props.toastShow('⛔️ Вы не заполнили все поля!', 'error');
    }
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form className={styles.formCreate} onSubmit={this.handleCreateContact}>
          <label htmlFor={generateId()}>
            Name
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={this.handleChangeInput}
              autoComplete="off"
            />
          </label>
          <label htmlFor={generateId()}>
            Phone
            <input
              type="number"
              placeholder="Enter phone"
              name="number"
              value={number}
              onChange={this.handleChangeInput}
              autoComplete="off"
            />
          </label>
          <button type="submit">Create Contacts</button>
        </form>
      </>
    );
  }
}
