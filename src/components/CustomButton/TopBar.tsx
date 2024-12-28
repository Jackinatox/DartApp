import React, { useState } from 'react';
import { Link } from "react-router";
import pb from '../../services/pocketbase';
import Avatar from '@mui/joy/Avatar';

const TopBar: React.FC = () => {
    const [userValid] = useState(pb.authStore.isValid);
    const [user] = useState(pb.authStore.record);

    const getEmail = () => {
        if (user) {
            return user.email.substring(0, 2).toUpperCase();
        }
    } 

//    const barStyle: React.CSSProperties = {
//        maxWidth: '100%',
//        margin: '0 auto',
//        display: 'flex',
//        flexDirection: 'row',
//        gap: '10px',
//    };


    return (
        <div>
            {userValid ? (
                //<Avatar src={getIconUrl()} />
                <Avatar> {getEmail()} </Avatar>
            ) : (
                <div>
                    <Link to="/register"> Register </Link>
                     | 
                    <Link to="/login"> Login </Link>
                </div>
            )}
        </div>
    );
}

export default TopBar;