import React from 'react'
import { Typography, Box, makeStyles, Grid,
      TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import ContactList from '../Contacts/ContactList';
import axios from "axios";
import { useState } from 'react';

const useStyles = makeStyles({
    headingColor:{
        backgroundColor: deepPurple[400],
        color: 'white'
    },
    addStuColor:{
        backgroundColor: green[400],
        color: 'white',
    },
    
})

const Home = () => {
    const classes = useStyles();
    const [contact, setContact] = useState({
        contname: "",
        contact: "",
        email: ""
    });
    const [status, setStatus] = useState();

    function onAddContact(e){
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
        console.log(contact);
    }

    async function onFormSubmit(e){
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3333/students`, contact);
            setStatus(true);
          }
          catch (error) {
            console.log("Error occured");
          }
    }

    if(status){
        return <Home/>
    }
    return (
        <>
        <Box textAlign="center" className={classes.headingColor} p={1} mb={1}>
                <Typography variant='h2'>
                    React Crud
                </Typography>
        </Box>
        <Grid container justifyContent='center' spacing={3}>
            <Grid item md={6} xs={12}>
               <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
                  <Typography variant='h4'>Add Contact</Typography>
                  </Box>
                   <form noValidate>
                      <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField autoComplete='contname' name='contname'
                             variant='outlined' required fullWidth
                              id='contname' label='Name'
                               onChange= {e => onAddContact(e)} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField autoComplete='contact' name='contact'
                             variant='outlined' required fullWidth
                              id='contact' label='Contact' onChange= {e => onAddContact(e)} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField autoComplete='email' name='email'
                             variant='outlined' required fullWidth
                              id='email' label='Email address' onChange= {e => onAddContact(e)} />
                        </Grid>
                      </Grid>
                      <Box m={3}>
                         <Button type='submit' variant='contained' color='primary'
                         fullWidth onClick={e =>onFormSubmit(e)}>Add to Contacts</Button>
                      </Box>
                   </form>
                </Grid>

                <Grid item md={6} xs={12}>
                    <ContactList/>
                </Grid>
            </Grid>
        </>
    )
}

export default Home
