import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const newLogin = {
    username: username,
    password: password,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/login', newLogin)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        history.push('/view');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   TODO
  const errorMessage = {};

  return (
    <ComponentContainer>
      <ModalContainer>
        <h1>Welcome to Blogger Pro</h1>
        <div className='form-container'>
          <form id='submit' onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              value={username}
              onChange={handleChange}
              id='username'
              name='username'
            ></input>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              value={password}
              onChange={handleChange}
              id='password'
              name='password'
            ></input>
            <p id='error'>Error Message</p>
            <div>
              <button>SUBMIT</button>
            </div>
          </form>
        </div>
      </ModalContainer>
    </ComponentContainer>
  );
};

export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```**
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.

const ComponentContainer = styled.div`
  height: 70%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ModalContainer = styled.div`
  width: 500px;
  background: white;
  padding: 2rem;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  font-size: 1.5rem;
`;

const FormGroup = styled.form`
  padding: 1rem;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 1rem 0;
  width: 100%;
`;

const Button = styled.button`
  padding: 1rem;
  width: 100%;
`;
