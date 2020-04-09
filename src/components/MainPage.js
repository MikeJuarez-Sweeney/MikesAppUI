import React, { useState, useEffect } from "react";
import axios from "axios";

//Material UI Components
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";

const usestyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  input: {
    height: 35,
    fontSize: 16,
    borderRadius: 5,
  },
}));

export const MainPage = () => {
  const classes = usestyles();
  const [names, setNames] = useState([]);
  const [id, setId] = useState();
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const url = "http://localhost:8080/";
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(person);
    let response = await axios.post(url, {
      firstName: person.firstName,
      lastName: person.lastName,
      phoneNumber: person.phoneNumber,
    });
    console.log(response);
    window.location.reload(true);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(id);
    let url = `http://localhost:8080/`;
    await axios.delete(url, {
      data: id,
    });
    handleClose();
    window.location.reload(true);
  };

  useEffect(() => {
    const getNames = async () => {
      let response = await axios.get(url);
      setNames(response.data);
      //console.log('Names: ' + JSON.stringify(response.data))
    };

    getNames();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" className={classes.grow}>
            Names 'n Numbers
          </Typography>
        </Toolbar>
      </AppBar>
      <form className={classes.root} type="submit" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <input
            className={classes.input}
            id="firstName"
            name="firstName"
            type="text"
            placeholder="&nbsp;&nbsp;Enter First Name"
            onChange={(event) =>
              setPerson({ ...person, firstName: event.target.value })
            }
          />
          <input
            className={classes.input}
            id="lastName"
            name="lastName"
            type="text"
            placeholder="&nbsp;&nbsp;Enter Last Name"
            onChange={(event) =>
              setPerson({ ...person, lastName: event.target.value })
            }
          />
          <input
            className={classes.input}
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="&nbsp;&nbsp;Enter Phone Number"
            onChange={(event) =>
              setPerson({ ...person, phoneNumber: event.target.value })
            }
          />
        </Grid>
        <Button variant="contained" color={"primary"} onClick={handleSubmit}>
          Add Person
        </Button>
        <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
          Delete Person
        </Button>
      </form>
      <br /> <br />
      <Divider variant="middle" />
      <Card>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(names).map(([id, name]) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{name.firstName}</TableCell>
                  <TableCell>{name.lastName}</TableCell>
                  <TableCell>{name.phoneNumber}</TableCell>
                  <TableCell align="left">
                    <Button color={"primary"} variant={"contained"}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the ID of the person you would like to delete:
            </DialogContentText>
            <input
              className={classes.input}
              type="text"
              placeholder="&nbsp;&nbsp;Enter ID Number"
              onChange={(event) => setId(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <h2>First Name: {person.firstName}</h2>
      <h2>Last Name: {person.lastName}</h2>
      <h2>Phone Number: {person.phoneNumber}</h2> */}
    </>
  );
};

export default MainPage;
