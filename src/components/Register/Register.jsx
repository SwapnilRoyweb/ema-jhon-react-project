import React from 'react';
import './Register.css';

const Register = () => {
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up !!!</h2>
            <form>
                <div className='form-control'>
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' id='' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="">Password</label>
                    <input type="password" name='password' id='' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name='confirm' id='' required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
        </div>
    );
};

export default Register;