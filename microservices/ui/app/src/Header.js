import React,{Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Search from 'material-ui-icons/Search';
import ShoppingCart from 'material-ui-icons/ShoppingCart';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import LoginPage from './login';
import { Route , withRouter} from 'react-router-dom';
import './App.css';
const toolbarstyle={
    height:'115px',
    backgroundColor: '#111'
    }
const imgstyle = {
        height: '70px',
        width: '120px',
        border: 'none',
        color: '#fff',
        marginLeft:'20px',
        paddingTop:'0px',
        display:'inline-block',
        verticalAlign: 'top',
        marginBottom:'0px'
    }
    const label={
        color:'White',
        textTransform:'none',
        fontSize:'16px',
        fontWeight:'400',
        lineHeight:'0px'
    }
    const style1={
        color:'White',
        cursor:'pointer',
        fontSize:'13px' 
    }
    const Textfieldstyle = {
        borderRadius: '8px',
        marginTop: '15px',
        color:'White',
        display:'inline-block',
        fontSize:'12px',
        marginLeft: '50px',
        width: '60%',
        marginBottom: '10px',
        height: '36px',
        backgroundColor:'White'
      }
      const searchstyle={
      marginRight: '0px',
      strokeWidth:'0.5px',
      fill:'Black',
      display:'inline-block',
      verticalAlign:'middle',
      marginBottom: '22px',
      marginLeft:'390px',
      marginTop:'2px'
      }
      const dropdown={
        color:'White',
        textTransform:'none',
        fontSize:'16px',
        fontWeight:'400',
        verticalAlign:'middle'
      }
class Headerbar extends React.Component {   
    constructor(props) {
        super(props);
        this.handleClick= this.handleClick.bind(this);
        this.state = {value: 1};
      }
      handleChange = (event, index, value) => this.setState({value});
      handleClick(e){
        e.preventDefault();
        this.props.history.push('/login');
      }
    render() {
      return (
        <div>
    <Paper style={toolbarstyle} zDepth={1} >
     <img src="amazon_logo.png" style={imgstyle}/>
     <TextField style={Textfieldstyle} underlineShow={false} hasIcon={true} >  
     <Search style={searchstyle}/>
    </TextField>   
   <FlatButton label='Hello!! Sign in' onClick={this.handleClick} labelStyle={label} style={{backgroundColor:'#f0c14b',display:'inline',paddingLeft:'15px',marginTop: '15px',float:'right',marginRight:'5px'}} />
     <div style={{display:'flex'}}>
         <FlatButton style={{paddingBottom:'10px'}}>
         <DropDownMenu value={this.state.value} onChange={this.handleChange} labelStyle={dropdown} anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}>
          <MenuItem value={1} primaryText="Shop by Category"/>
          <MenuItem value={2} primaryText="Books"/>
          <MenuItem value={3} primaryText="Mobiles"/>
          <MenuItem value={4} primaryText="Electronics"/>
        </DropDownMenu>
        </FlatButton>
        <div style={{marginLeft:'auto'}}>
      <FlatButton style={{paddingBottom:'10px'}}>
      <DropDownMenu value={this.state.value} onChange={this.handleChange} labelStyle={dropdown} anchorOrigin={{ vertical: 'bottom',horizontal: 'left'}}>
      <MenuItem value={1} primaryText="Your orders"/>
      <MenuItem value={2} primaryText="Your Account"/>
      <MenuItem value={2} primaryText="Your Wishlist"/>
    </DropDownMenu> 
    </FlatButton >
    </div>
         <FlatButton icon={<ShoppingCart style={{fill:'White'}}/>}  label='Cart' labelStyle={label} style={{marginTop:'10px',paddingLeft:'5px'}}> </FlatButton>
    </div>
    </Paper>
    </div>
       );
    }
  }

  export default withRouter(Headerbar); 