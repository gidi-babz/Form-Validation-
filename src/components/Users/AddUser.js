import React, { useState, Fragment } from 'react';
import styles from './AddUser.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputAgeValue, setInputAgeValue] = useState('');
  const [error, setError] = useState();

  const addUserHander = e => {
    e.preventDefault();

    if (
      inputNameValue.trim().length === 0 ||
      inputAgeValue.trim().length === 0
    ) {
      setError({
        title: 'Error! enter details',
        message: 'Please enter a valid name and age!',
      });
      return;
    }

    if (+inputAgeValue < 0) {
      setError({
        title: 'Error! enter valid age',
        message: 'Please enter a valid age! (> 0)',
      });
      return;
    }

    props.onAddUser(inputNameValue, inputAgeValue);
    setInputAgeValue('');
    setInputNameValue('');
  };

  const usernameChangeHandler = e => {
    setInputNameValue(e.target.value);
  };

  const ageChangeHandler = e => {
    setInputAgeValue(e.target.value);
  };

  const closeModalHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onCloseModal={closeModalHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHander}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={usernameChangeHandler}
            value={inputNameValue}
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={inputAgeValue}
            ref={ageInputRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
