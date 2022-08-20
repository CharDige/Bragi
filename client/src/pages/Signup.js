import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    channel: '',
    genre: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
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
            Join us and begin your storytelling
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className='mb-3'>
              <label className="form-label">Username</label>
              <input className="form-control form-input-style" placeholder="Your username" name="username" type="text" value={formState.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email"
                name="email" className="form-control form-input-style" id="email" placeholder="Your email" value={formState.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control form-input-style" id="password" placeholder='********' value={formState.password} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Channel</label>
              <input className='form-control form-input-style' placeholder="Your favourite channel for stories i.e. Books, Films, Poetry, Video games..." name="channel" value={formState.channel} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Genre</label>
              <input className='form-control form-input-style' placeholder='Your favourite genre of stories i.e. Fantasy, Romance, Action, Satire, etc.' name="genre" value={formState.genre} onChange={handleChange} />
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
    </main>
  );
};

export default Signup;
