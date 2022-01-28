import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const dummyData = {
  id: 'aMqwe',
  headline: 'A Great Article from the Midwest',
  author: 'John Smith',
  createdOn: '2022-01-01T18:02:38-04:00',
  summary: 'This is an important article about the Midwest',
  body: 'Lorem Ipsum Text',
};

const dummyDataNoAuthor = {
  id: 'aMqwe',
  headline: 'A Great Article from the Midwest',
  author: '',
  createdOn: '2022-01-01T18:02:38-04:00',
  summary: 'This is an important article about the Midwest',
  body: 'Lorem Ipsum Text',
};

test('renders component without errors', () => {
  render(<Article article={dummyData} />);
});

test('renders headline, author from the article when passed in through props', () => {
  render(<Article article={dummyData} />);
  const headline = screen.queryByText(/A Great Article from the Midwest/i);
  const author = screen.queryByText(/John Smith/i);
  const summary = screen.queryByText(
    /This is an important article about the Midwest/i
  );
  const body = screen.queryByText(/Lorem Ipsum Text/i);

  expect(headline).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(body).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', () => {
  render(<Article article={dummyDataNoAuthor} />);
  const noAuthor = screen.queryByText(/Associated Press/i);
  expect(noAuthor).toBeInTheDocument();
});

test('executes handleDelete when the delete button is pressed', () => {
  const mockHandleDelete = jest.fn();
  render(<Article article={dummyData} handleDelete={mockHandleDelete} />);
  const button = screen.getByTestId('deleteButton');
  userEvent.click(button);

  expect(mockHandleDelete).toBeCalled();
});

//Task List:
//1. Complete all above tests. Create test article data when needed.
