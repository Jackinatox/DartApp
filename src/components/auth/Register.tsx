import React, { useState } from "react";
import pb from '../../services/pocketbase';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   

    const handleRegister = async () => {
        try {
            await pb.collection('users').create({
                email: email,
                password: password,
                passwordConfirm: password,
            });         
            alert('Registration successful!');
        } catch (error) {
            console.error('Registration failed:', error);
            alert(error);
        }
    };  
    
    return (
        <div>
            <h1>Register</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;