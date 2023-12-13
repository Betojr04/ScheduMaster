import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import "../../styles/Register.css";

export const Register = () => {
    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [birthday, setBirthday] = useState('');
    const [seniority, setSeniority] = useState(0);

    const { actions } = useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.registerUser({
            name,
            employee_id: employeeId,
            email,
            password,
            hire_date: hireDate,
            birthday,
            seniority,
        }, () => {
            window.location.href = '/login';
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
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email"
                               value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password"
                               value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="hireDate">Hire Date</label>
                        <input type="date" id="hireDate"
                               value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" id="birthday"
                               value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    </div>
                    <div className="form-field">
                        <label htmlFor="seniority">Seniority</label>
                        <input type="number" id="seniority"
                               value={seniority} onChange={(e) => setSeniority(parseInt(e.target.value))} />
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                </form>
            </section>
        </main>
    );
};
