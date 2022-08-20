import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main>
      {data ? (
        <div className='success-message'>
          <p>
            Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        </div>
      ) : (
        <div className="login-signup-form-style">
          <h2 className='login-signup-heading'>
            Return to your stories
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email"
                name="email" className="form-control form-input-style" id="email" placeholder="Your email" value={formState.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control form-input-style" id="password" placeholder='********' value={formState.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn login-signup-btn-style">Submit</button>
          </form>
        </div>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </main >
  );
};

export default Login;
