import { Typography, Box, makeStyles, Grid, TextField, Button} from
 '@material-ui/core';
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: 'white'
  },
  addStuColor: {
    backgroundColor: green[400],
    color: 'white'
  },
})


const Edit = () => {
  const classes = useStyles();
  const {id} = useParams();
  const history = useHistory();
  const [contact, setContact] = useState({
    contname: "",
    contact: "",
    email: ""
  });

  useEffect(() => {
    async function getContact() {
      try {
        const contact = await axios.get(`http://localhost:3333/students/${id}`);
        // console.log(contacts.data);
        setContact(contact.data);
      }
      catch (error) {
        console.log("Error occured");
      }
    }
    getContact();
  }, [id]);

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
        await axios.put(`http://localhost:3333/students/${id}`, contact);
       history.push("/");
      }
      catch (error) {
        console.log("Error occured");
      }
}
function handleClick() {
  history.push("/")
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
               <Box textAlign="center" p={2} className=
               {classes.addStuColor} mb={2}>
                  <Typography variant='h4'>Edit Contact</Typography>
                  </Box>
                   <form>
                      <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} >
                            <TextField autoComplete='id' name='id'
                             variant='outlined' required fullWidth
                              id='id' label='ID' autoFocus value={id} disabled />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete='contname' name='contname'
                             variant='outlined' required fullWidth
                              id='contname' label='Name'
                               value={contact.contname} onChange={e => onAddContact(e)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete='contact' name='contact'
                             variant='outlined' required fullWidth
                              id='contact' label='Contact'
                               value={contact.contact} onChange={e => onAddContact(e)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete='email' name='email'
                             variant='outlined' required fullWidth
                              id='email' label='Email address'
                               value={contact.email} onChange={e => onAddContact(e)}/>
                        </Grid>
                      </Grid>
                      <Box m={3}>
                         <Button type='submit' variant='contained' color='primary'
                         fullWidth onClick={e => onFormSubmit(e)}>Update</Button>
                      </Box>
                   </form>
                   <Box m={3} textAlign='center'>
                    <Button variant='contained' color='primary' onClick={handleClick}>Back to Home</Button>
                   </Box>
                </Grid>
            </Grid>
        </>
  )
}

export default Edit
