import React, { useEffect, useState } from 'react';
import { Avatar, Grid } from '@mui/joy';
import Card from '@mui/joy/Card';
import pb from '../../services/pocketbase';

const [pic, setPic] = useState('');

useEffect(() => {
  //pb.authStore.record?.id
  //pb.files.getURL()
}, []);


function Profile() {
  return (
    <Card >
      <Grid container columnSpacing={1.5} rowSpacing={1.5} columns={{ xs: 1, md: 4 }}>
        <Grid size={{ xs: 4 }}> <Avatar src={pic} size="lg" sx={{
          "--Avatar-size": "80px"
        }} />
        </Grid>

        <Grid size={{ xs: 4, md: 2 }}> <Card> FirstName </Card> </Grid>
        <Grid size={{ xs: 4, md: 2 }}> <Card> LastName </Card> </Grid>
        <Grid size={{ xs: 4 }}> <Card> Email </Card> </Grid>

      </Grid>
    </Card>
  );
}

export default Profile;
