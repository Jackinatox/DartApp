import { useEffect, useState } from 'react';
import { Avatar, Button, Grid, Input, Typography } from '@mui/joy';
import Card from '@mui/joy/Card';
import pb from '../../services/pocketbase';
import TopBar from '../CustomButton/TopBar';
import { FieldValues, useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import { InfoOutlined, Padding } from '@mui/icons-material';
import AvatarEditor from './AvatarEditor';


function ProfileHook() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();


  const [pic, setPic] = useState('');


  useEffect(() => {
    const updatePB = async () => {
      const uRecord = pb.authStore.record;

      if (uRecord) {
        setPic(pb.files.getURL(uRecord, uRecord.avatar));
      }
    }

    const setInitialValues = async () => {
      if (pb.authStore.record) {
        setValue('firstName', pb.authStore.record.firstName);
        setValue('lastName', pb.authStore.record.name);
      }
    }

    updatePB();
    setInitialValues();
  }, []);

  const onsubmit = async (data: FieldValues) => {
    console.log(data);

    const uRecord = pb.authStore.record; // Get the current user record

    if (uRecord) {
      try {
        // Update the current user with the data from the react hook form

        console.log("email: ", data.email);
        await pb.collection("users").update(uRecord.id, {
          ...uRecord,
          firstName: data.firstName,
          name: data.lastName,
          //email: data.email,
        });
        console.log('User updated successfully');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };


  return (<form onSubmit={handleSubmit(onsubmit)}>
    <Card>

      <Grid size={{ xs: 3 }}><TopBar /></Grid>
      <Grid container columnSpacing={1.5} rowSpacing={1.5} columns={{ xs: 1, md: 4 }}>
        <Grid size={{ xs: 4 }} sx={{ marginBottom: 4 }}>
          <Avatar src={pic} size="lg" sx={{
            "--Avatar-size": "80px"
          }} />
        </Grid>
        <Grid size={{ xs: 4, md: 2 }}>
          <Input error={errors.firstName && true} {...register('firstName', {
            required: "Vorname ist required",
          })} placeholder='Vorname' />
          {errors.firstName && (
            <Typography sx={{ display: 'flex', alignItems: 'center' }} level='body-lg' color='danger'>
              <InfoOutlined sx={{ marginRight: 0.5 }} /> {errors.firstName.message?.toString()}
            </Typography>
          )}
        </Grid>
        <Grid size={{ xs: 4, md: 2 }}>
          <Input error={errors.lastName && true}
            {...register('lastName', {
              required: "Nachname ist required",
            })} placeholder='Nachname' />
          {errors.lastName && (
            <Typography sx={{ display: 'flex', alignItems: 'center' }} level='body-lg' color='danger'>
              <InfoOutlined sx={{ marginRight: 0.5 }} /> {errors.lastName.message?.toString()}
            </Typography>
          )}
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Input disabled error={errors.email && true}
            {...register('email', {
              required: "Email ist required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Format entspricht keiner Email"
              },
            })} placeholder='Email' />
          {errors.email ? (
            <Typography sx={{ display: 'flex', alignItems: 'center' }} level='body-lg' color='danger'>
              <InfoOutlined sx={{ marginRight: 0.5 }} /> {errors.email.message?.toString()}
            </Typography>
          ) : (
            <Typography sx={{ display: 'flex', alignItems: 'center' }} level='body-lg' color='warning'>
              <InfoOutlined sx={{ marginRight: 0.5 }} /> Updating Email is currently dissabled
            </Typography>
          )}
        </Grid>

        <Grid size={{ xs: 4 }} sx={{ display: 'flex' }}>
          <Button type='submit' loading={isSubmitting} startDecorator={<CheckIcon />}> Save </Button>
        </Grid>
        <Grid size={{ xs: 4 }} sx={{ display: 'flex', alignItems: 'center'}}>
            <AvatarEditor></AvatarEditor>
        </Grid>

      </Grid>
    </Card>
  </form>
  );
}

export default ProfileHook;
