import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import "../../styles/Login.css";

export const Login = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const { actions } = useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.loginUser({ employeeId, password });
        // Handle actions after login like storing JWT token or redirecting
    };

    return (
        <main className="login-container">
            <section className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="employeeId">Employee ID</label>
                        <input type="text" id="employeeId" placeholder="Enter your employee ID"
                               value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" 
                               value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
            </section>
        </main>
    );
};