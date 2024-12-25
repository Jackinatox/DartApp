import React, { useState } from "react";
import pb from '../../services/pocketbase';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [Confpassword, setConfPassword] = useState('');

    const isButtonEnabled = password === Confpassword && password.length > 0;

    const buttonStyle: React.CSSProperties = {
        maxWidth: '60%', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column',
        gap: '10px', 
    };

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
            <Input
                variant="outlined"
                type="password"
                placeholder="Confim Password"
                value={Confpassword}
                onChange={(e) => setConfPassword(e.target.value)}
                slotProps={{ input: { 'aria-label': 'Password' } }}
            />
            <Button 
                variant="outlined"
                 onClick={handleRegister}
                 disabled={!isButtonEnabled}
                 > Register </Button>
        </div>
    );
}

export default Register;