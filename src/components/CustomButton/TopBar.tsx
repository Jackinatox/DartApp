import React, { useState, useEffect } from 'react';
import { Link } from "react-router";
import pb from '../../services/pocketbase';
import Avatar from '@mui/joy/Avatar';


const TopBar: React.FC = () => {
    const [userValid] = useState(pb.authStore.isValid);
    const [user] = useState(pb.authStore.record);

//    const getIconUrl = async () => {
//        if (user) { // Ensure user and file field exist
//            //const record = await pb.collection('user').getOne(user.id);
//            const filename = user.avatar[0];
//            console.log("name: " + user.avatar)
//            console.log("email: " + user.email)
//            console.log("filename: " + filename)
//            return pb.files.getURL(user, filename);
//
//        }
//        return ''; // Return a placeholder or empty string if user is null
//    };

    const getEmail = () => {
        if (user) {
            return user.email;
        }
    } 

    const barStyle: React.CSSProperties = {
        maxWidth: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    };


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