import { CloudUpload } from '@mui/icons-material';
import { Avatar, Button } from '@mui/joy';
import React, { useState } from 'react';
import pb from '../../services/pocketbase';

const AvatarEditor = () => {

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];  //this is the image to be uploaded
            //TODO: Handle the file upload logic here

            if (pb.authStore.record) {
                await updateUserProfilePic(pb.authStore.record.id, file);
            }
        }
    }

    const updateUserProfilePic = async (userId: string, file: File) => {
        try {
            const formData = new FormData();
            formData.append('profilePic', file);

            const updateUser = await pb.collection('users').update(userId, formData);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                id="pbImageInput"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />
            <Button onClick={() => { document.getElementById('pbImageInput')?.click() }} startDecorator={<CloudUpload />}> Upload </Button>
        </>
    );
};

export default AvatarEditor;
