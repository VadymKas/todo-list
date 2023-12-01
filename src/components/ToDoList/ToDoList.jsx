import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ToDoItem from '../ToDoItem';
import { tasksSelector, addTask } from '../../redux/slices/listSlice';

import styles from './ToDoList.module.css';

const ToDoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelector);

  const tasksLimit = 10;
  const totalPages = Math.ceil(tasks.length / tasksLimit);
  const startIndex = currentPage * tasksLimit;
  const endIndex = startIndex + tasksLimit;
  const dataPerPage = tasks.slice(startIndex, endIndex);

  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  const addTaskHandler = () => {
    if (inputValue) {
      dispatch(addTask(inputValue));
      setInputValue('');
    }
  };

  return (
    <>
      <div className={styles.list}>
        <div className={styles.list__form}>
          <input
            value={inputValue}
            onChange={inputValueHandler}
            placeholder='Please, write your task!'
          />
          <button onClick={addTaskHandler}>Add</button>
        </div>
        <div className={styles.list__items}>
          {dataPerPage?.map((task) => (
            <ToDoItem
              key={task.id}
              id={task.id}
              {...task}
            />
          ))}
        </div>
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button onClick={() => setCurrentPage(page - 1)}>{page}</button>
        ))}
      </div>
    </>
  );
};

export default ToDoList;
