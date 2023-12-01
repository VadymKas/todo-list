import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ToDoItem from '../ToDoItem';
import { tasksSelector, addTask } from '../../redux/slices/listSlice';

import styles from './ToDoList.module.css';

const ToDoList = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelector);

  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  const addTaskHandler = () => {
    dispatch(addTask(inputValue));
    setInputValue('');
  };

  return (
    <div className={styles.list}>
      <div className={styles.list__form}>
        <input
          value={inputValue}
          onChange={inputValueHandler}
        />
        <button onClick={addTaskHandler}>Add</button>
      </div>
      <div className={styles.list__items}>
        {tasks?.map((task) => (
          <ToDoItem
            key={task.id}
            id={task.id}
            {...task}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
