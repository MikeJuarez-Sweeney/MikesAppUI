import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const usestyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const initialFormData = Object.freeze({
  firstName: "",
  lastName: "",
  phoneNumber: "",
});

export const MainPage = () => {
  const classes = usestyles();

  const [formData, updateFormData] = useState([initialFormData]);
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // ... submit to API or something
  }


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" class={classes.grow}>
            Names 'n Numbers
          </Typography>
        </Toolbar>
      </AppBar>
      <form className={classes.root} type="submit">
        <Grid container spacing={10}>
          <Grid item xs={"auto"}>
            <Input
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              onChange={handleChange}
            />
            <Input
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              onChange={handleChange}
            />
            <Input
              name="phoneNumber"
              type="text"
              placeholder="Enter Phone Number"
              onChange={handleChange}
            />
            <br />
            <br />
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
          
        </Grid>
      </form>
    </>
  );
};

export default MainPage;
