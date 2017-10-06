import { createSelector } from 'reselect';

export default function books(state = {}, action = {}) {
  switch (action.type) {
    // case type:
    //   return {
    //     ...state,
    //   };

    default:
      return state;
  }
};


// SELECTORS

export const booksSelector = state => state.books;

export const allBooksSelector = createSelector(booksSelector,
  booksHash => Object.values(booksHash)
);
