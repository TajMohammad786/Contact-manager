import {
  Typography, Box, TableContainer, Table, Paper, Button, makeStyles
} from "@material-ui/core";
import { orange } from '@material-ui/core/colors'
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

const useStyles = makeStyles({
  contListColor: {
    backgroundColor: orange[400],
    color: 'white'
  },
  tableHeadCell: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    padding: '15px'
  },
  tableData: {
    padding: '15px'
  }

})
const View = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  const history = useHistory();
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
  }, [id])

 

  function handleClick() {
    history.push("/")
  }
  return (
    <>
      <Box textAlign='center' p={2} className={classes.contListColor}>
        <Typography variant='h4'>Contact Details</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <thead >
            <tr style={{ backgroundColor: "#616161" }} >
              <td align='center' className=
                {classes.tableHeadCell} >No</td>
              <td align='center' className=
                {classes.tableHeadCell}>Name</td>
              <td align='center' className=
                {classes.tableHeadCell}>Contact</td>
              <td align='center' className=
                {classes.tableHeadCell}>Email</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align='center' className={classes.tableData}>{contact.id}</td>
              <td align='center'>{contact.contname}</td>
              <td align='center'>{contact.contact}</td>
              <td align='center'>{contact.email}</td>

            </tr>
            <tr align='center'></tr>
            <tr align='center'></tr>
          </tbody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign='center'>
        <Button variant='contained' color='primary' onClick={handleClick}>Back to Home</Button>
      </Box>
    </>
  )
}

export default View
