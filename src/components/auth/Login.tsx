import React, { useState } from "react";
import pb from '../../services/pocketbase';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const isButtonEnabled = password.length > 3 && isValidEmail(email);

    const buttonStyle: React.CSSProperties = {
        maxWidth: '60%', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column',
        gap: '10px', 
    };

    const handleLogin = async () => {
        try {
            const authData = await pb.collection('users').authWithPassword(email, password);

            alert(authData.token);
        } catch (error) {
            console.error('Registration failed:', error);
            alert(error);
        }
    };  
    
    return (
        <div style={buttonStyle}>
            <Input
                variant="outlined"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{ input: { 'aria-label': 'Email' } }}
            />
            <Input
                variant="outlined"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{ input: { 'aria-label': 'Password' } }}
            />
            <Button 
                variant="outlined"
                 onClick={handleLogin}
                 disabled={!isButtonEnabled}
                 > Login </Button>
        </div>
    );
}

export default Login;