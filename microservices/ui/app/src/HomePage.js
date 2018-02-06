import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainPage from './mainpage';
import Headerbar from './Header';

class HomePage extends Component {
    render() {
      return (
        <MuiThemeProvider>
        <div style={{width:'100%',overflow:'hidden'}}>
          <Headerbar/>
          <div>
          <MainPage/>
          </div>
        </div>
        </MuiThemeProvider>
      );
    }
  }
  export default HomePage;