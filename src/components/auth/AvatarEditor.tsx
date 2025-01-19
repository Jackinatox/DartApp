import { CloudUpload } from '@mui/icons-material';
import { Button } from '@mui/joy';
import React from 'react';
import pb from '../../services/pocketbase';

const AvatarEditor: React.FC = () => {
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {

            const file = files[0];
            if (pb.authStore.record) {
                await updateUserProfilePic(pb.authStore.record.id, file);
                pb.collection('users').authRefresh();
                 
                
            }
        }
    }

    const updateUserProfilePic = async (userId: string, file: File) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            await pb.collection('users').update(userId, formData);
            pb.collection('users').authRefresh();
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
            <Button
                onClick={() => { document.getElementById('pbImageInput')?.click() }}
                startDecorator={<CloudUpload />}
                sx={{ marginLeft: '20px' }}
            >
                Upload
            </Button>
        </>
    );
};

export default AvatarEditor;
