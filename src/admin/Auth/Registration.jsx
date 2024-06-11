import React, { useState } from 'react';
import { registerUser } from '../services/AuthApi'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';

const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const result = await registerUser(registration);
            setSuccessMessage("Registration successful. Please check your email for confirmation.");
            setErrorMessage("");
            setRegistration({ firstName: "", lastName: "", email: "", password: "" });
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(`Registration error: ${error.message}`);
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 3000);
    };

    return (
        <section>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                        name='firstName'
                        id='firstName'
                        value={registration.firstName}
                        onChange={handleInputChange}
                        required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        name='lastName'
                        id='lastName'
                        value={registration.lastName}
                        onChange={handleInputChange}
                        required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        name='email'
                        id='email'
                        value={registration.email}
                        onChange={handleInputChange}
                        required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        name='password'
                        id='password'
                        value={registration.password}
                        onChange={handleInputChange}
                        required />
                </div>
                <button type='submit'>Register</button>
                <span>Already have an account? </span><Link to="/login">Login</Link>
            </form>
        </section>
    );
};

export default Registration;
