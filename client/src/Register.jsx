import React, { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        cnfPassword: ''
    });
    const [match, setMatch] = useState('');

    const passwordStrength = function (password) {
        let i = 0;
        if (password.length > 7) {
            i++;
        }
        if (password.length >= 10) {
            i++;
        }

        if (/[A-Z]/.test(password)) {
            i++;
        }

        if (/[0-9]/.test(password)) {
            i++;
        }

        if (/[A-Za-z0-8]/.test(password)) {
            i++;
        }

        return i;
    }

    const strengthChecker = function (password) {
        let strength = passwordStrength(password);
        let passStren;
        if (strength <= 2) {
            passStren = "Weak Password";
        } else if (strength >= 2 && strength <= 4) {
            passStren = "Moderate Password";
        } else {
            passStren = "Strong Password";
        }
        return passStren;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.cnfPassword) {
            console.error('Passwords do not match');
            setMatch("Passwords do not match");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData) // Pass formData as the body
            });
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
        // Clear form data after submission
        setFormData({
            username: '',
            email: '',
            password: '',
            cnfPassword: ''
        });
        setMatch('');
    };

    return (
        <div className='border-2 bg-blue-500 rounded-lg w-96 h-110 px-4 py-4 mx-auto flex flex-col justify-center items-center mt-2'>
            <h2 className='text-center text-white'>Register</h2>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='mt-2'>
                    <label htmlFor="username" className='text-white'>Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <div className='mt-2'>
                    <label htmlFor="email" className='text-white'>Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                <div className='mt-2'>
                    <label htmlFor="password" className='text-white'>Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                    <h4>{strengthChecker(formData.password)}</h4>
                </div>
                <div className='mt-2'>
                    <label htmlFor="cnfPassword" className='text-white'>Confirm password:</label>
                    <input type="password" id="cnfPassword" name="cnfPassword" value={formData.cnfPassword} onChange={handleChange} className='border-2 rounded-md px-2 py-1 w-full mt-1' />
                </div>
                {match && <p className="text-zinc-900">{match}</p>}
                <br />
                <button className='bg-green-500 rounded-md px-2 py-1 text-white' type="submit">Submit</button>
                <h4></h4>
            </form>
        </div>
    );
}

export default Register;
