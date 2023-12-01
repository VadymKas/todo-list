import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import ToDoItem from '../ToDoItem';
import { tasksSelector, addTask } from '../../redux/slices/listSlice';

import styles from './ToDoList.module.scss';

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
            className={styles.list__input}
            value={inputValue}
            onChange={inputValueHandler}
            placeholder='Please, write your task!'
          />
          <button
            className={styles.list__button}
            onClick={addTaskHandler}>
            Add
          </button>
        </div>
        <div className={styles.list__items}>
          {dataPerPage.length > 0 ? (
            dataPerPage?.reverse().map((task) => (
              <ToDoItem
                key={task.id}
                id={task.id}
                {...task}
              />
            ))
          ) : (
            <div className={styles.list__empty}>Taks list is empty</div>
          )}
        </div>
      </div>
      <ReactPaginate
        className={styles.pagination}
        pageLinkClassName={styles.pagination__item}
        previousLinkClassName={styles.pagination__item_prev}
        nextLinkClassName={styles.pagination__item_next}
        activeClassName={styles.pagination__item_active}
        nextLabel='>'
        previousLabel='<'
        breakLabel='...'
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={(e) => setCurrentPage(e.selected)}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default ToDoList;
