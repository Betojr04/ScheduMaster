import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import "../../styles/Register.css";

export const Register = () => {
    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [email, setEmail] = useState(''); // Added state for email
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.registerUser({ name, employeeId, email, password }, () => {
            window.location.href = '/login'; // Redirection after successful registration
        });
    };

    return (
        <main className="register-container">
            <section className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter your name" 
                               value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="employeeId">Employee ID</label>
                        <input type="text" id="employeeId" placeholder="Enter employee ID"
                               value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                    </div>
                    <div className="form-field"> {/* New email field */}
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" 
                               value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" 
                               value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                </form>
            </section>
        </main>
    );
};
