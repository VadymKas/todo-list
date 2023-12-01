import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  editTask,
  removeTask,
  toggleTaskStatus,
  taskTextSelector,
} from '../../redux/slices/listSlice';

import styles from './ToDoItem.module.css';

const ToDoItem = ({ id, description, completed }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const getTaskText = useSelector(taskTextSelector(id));

  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  const removeTaskHandler = () => {
    dispatch(removeTask(id));
  };

  const toggleTaskStatusHandler = () => {
    dispatch(toggleTaskStatus(id));
  };

  const setTaskTextHandler = (e) => {
    dispatch(editTask({ id: id, description: inputValue }));
    setIsEditing(false);
  };

  const editTaskHandler = () => {
    setInputValue(getTaskText);
    setIsEditing(true);
  };

  const cancelTaskHandler = () => {
    setIsEditing(false);
  };

  const editVersion = (
    <>
      <input
        onChange={inputValueHandler}
        className={styles.item__input}
        type='text'
        value={inputValue}
        placeholder='Please, edit task text'
      />
      <button
        onClick={setTaskTextHandler}
        className={`${styles.item__button} ${styles.item__button_ok}`}>
        Ok
      </button>
      <button
        onClick={cancelTaskHandler}
        className={`${styles.item__button} ${styles.item__button_cancel}`}>
        Cancel
      </button>
    </>
  );

  const viewVersion = (
    <>
      <h3
        className={`${styles.item__description} ${
          completed ? styles.item__description_crossed : ''
        }`}>
        {description}
      </h3>
      <button
        onClick={toggleTaskStatusHandler}
        className={`${styles.item__button} ${styles.item__button_status} ${
          completed ? '' : styles.item__button_crossed
        }`}>
        {completed ? 'Done' : 'In Process'}
      </button>
      <button
        onClick={editTaskHandler}
        className={`${styles.item__button} ${styles.item__button_edit}`}>
        Edit
      </button>
      <button
        onClick={removeTaskHandler}
        className={`${styles.item__button} ${styles.item__button_remove}`}>
        Remove
      </button>
    </>
  );

  return (
    <div className={styles.item}>{isEditing ? editVersion : viewVersion}</div>
  );
};

export default ToDoItem;
