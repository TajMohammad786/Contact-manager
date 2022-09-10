import React from 'react'
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete"
import { Link } from 'react-router-dom';
import {
    Typography, Box, TableContainer, Table, Paper, IconButton,
    Tooltip, makeStyles
} from "@material-ui/core";
import { orange } from '@material-ui/core/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
    tableHeadCell: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        padding: '15px'
    },
    contListColor: {
        backgroundColor: orange[400],
        color: 'white',

    }
})
const ContactList = () => {
    const classes = useStyles();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function getAllContacts() {
            try {
                const contacts = await axios.get("http://localhost:3333/students/");
                // console.log(contacts.data);
                setContacts(contacts.data);
            }
            catch (error) {
                console.log("Error occured");
            }
        }
        getAllContacts();
    }, [])

const handleDelete = async id =>{
    await axios.delete(`http://localhost:3333/students/${id}`);
    var newcontact = contacts.filter((item) =>{
        return item.id != id;
    })
    setContacts(newcontact);
}
    return (
        <>
            <Box textAlign='center' p={2} className={classes.contListColor}>
                <Typography variant='h4'>Contact List</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <thead >
                        <tr style={{ backgroundColor: "#616161" }}>
                            <td align='center' className=
                                {classes.tableHeadCell}>No</td>
                            <td align='center' className=
                                {classes.tableHeadCell}>Name</td>
                            <td align='center' className=
                                {classes.tableHeadCell}>Contact</td>
                            <td align='center' className=
                                {classes.tableHeadCell}>Email</td>
                            <td align='center' className=
                                {classes.tableHeadCell}>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map((contacts, i) => {
                                return (
                                    <tr key={i}>
                                        <td align='center'>{i + 1}</td>
                                        <td align='center'>{contacts.contname}</td>
                                        <td align='center'>{contacts.contact}</td>
                                        <td align='center'>{contacts.email}</td>
                                        <td align='center'>
                                            <Tooltip title='View'>
                                            <IconButton><Link to={`/view/${contacts.id}`}>
                                                <VisibilityIcon color='primary' /></Link></IconButton>
                                           </Tooltip>
                                           <Tooltip title='Edit'>
                                               <IconButton><Link to={`/edit/${contacts.id}`}>
                                                  <EditIcon color='primary' /></Link></IconButton>
                                          </Tooltip>
                                        <Tooltip title='Delete'>   
                                              <IconButton onClick={()=>handleDelete(contacts.id)}>
                                                <DeleteIcon color='secondary' /></IconButton>
                                         </Tooltip>
                                     </td>
                                </tr>
                             )
                         })
                        }

                     <tr align='center'></tr>
                        <tr align='center'></tr>
                 </tbody>
              </Table>
        </TableContainer>
     </>
)
}
export default ContactList
