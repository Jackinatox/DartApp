import React, { useState } from "react";
import pb from '../../services/pocketbase';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            setLoading(true);
            const authData = await pb.collection('users').authWithPassword(email, password);

            if (authData?.token){
                console.log('Login Successfull');
                navigate('/');
            } 
            
        } catch (error) {
            console.error('Login Failed:', error);
        }
        setLoading(false);
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
                 loading={loading}
                 > Login </Button>
        </div>
    );
}

export default Login;