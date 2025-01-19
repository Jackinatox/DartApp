import { useEffect, useState } from 'react';
import { Avatar, Grid, Input } from '@mui/joy';
import Card from '@mui/joy/Card';
import pb from '../../services/pocketbase';
import TopBar from '../CustomButton/TopBar';



function Profile() {
  const [pic, setPic] = useState('');
  

  useEffect(() => {
    const uRecord = pb.authStore.record;

    //console.log(uRecord);
    if (uRecord) {
      setPic(pb.files.getURL(uRecord, uRecord.avatar));
    }
  }, []);


  return (<>
    <Card>
      <Grid size={{ xs: 3 }}><TopBar /></Grid>
      <Grid container columnSpacing={1.5} rowSpacing={1.5} columns={{ xs: 1, md: 4 }}>
        <Grid size={{ xs: 4 }} sx={{ marginBottom: 4 }}> <Avatar src={pic} size="lg" sx={{
          "--Avatar-size": "80px"
        }} />
        </Grid>

        <Grid size={{ xs: 4, md: 2 }}>
          <Input placeholder='Vorname'/>
        </Grid>
        <Grid size={{ xs: 4, md: 2 }}>
        <Input placeholder='Nachname' />
        </Grid>

        <Grid size={{ xs: 4 }}>
        <Input placeholder='Email' />
        </Grid>

      </Grid>
    </Card>
  </>
  );
}

export default Profile;
