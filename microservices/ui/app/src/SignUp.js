import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import './App.css';

const style = {
    height: '560px',
    width: '350px',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft:'500px',
    marginRight:'0px',
    spacing:'20px',
    display:'flex',
    borderColor:'black'
  };

  const textbox = {
    backgroundColor: 'white',
    display: 'flex',
    borderRadius: '2px',
    border:'0.5px solid #949494',
    borderShadow:'none',
    marginLeft: '25px',
    paddingTop: '0px',
    height: '35px',
    width: '290px',
    marginBottom:'15px'
  }
  const buttonstyle={
    color: '#f0c14b',
    backgroundColor: '#f0c14b',
    borderRadius: '2px',
    border:'0.5px solid #a88734',
    borderShadow:'none',
    marginLeft: '0px',
    paddingTop: '5px',
    height: '35px',
    width: '290px',
    display:'inline-block',
    verticalAlign:'middle'
  }

  const imgstyle = {
    height: '100px',
    width: '200px',
    border: '2px solid #fff',
    color: '#fff',
    backgroundSize:'400px 670px',
    marginLeft:'575px',
    display:'inline-block',
    verticalAlign: 'top',
    paddingBottom:'0px'
}
   

export default class SignUpPage extends React.Component { 

  constructor(props) {
    super(props);
    this.handleClick= this.handleClick.bind(this);
    this.state = {
      user: {},
    };
    this.handleChange = this.handleChange.bind(this);
}
handleClick(e){
  e.preventDefault();
  this.props.history.push('/login');
}

handleChange(event) {
  const { user } = this.state;
  user[event.target.name] = event.target.value;
  this.setState({ user });
}

handleSubmit(event) {
  event.preventDefault();
  const {name,mobile,email,password} = this.state;

  axios.post('https://api.ashy57.hasura-app.io/v1/signup',{name,mobile,email,password})
  .then(res => {
    console.log(res);
    console.log(res.data);
  });

}
  render() {
    const { user } = this.state;
    return (
    <div >
      <img src="amazon_logo.jpg" style={imgstyle}/>
      <Paper style={style} zDepth={2}rounded='true'>
      <div style={{align:'left'}}>
      <p style={{fontWeight: '400',fontSize:'28px',color: '#111',lineHeight: '1.2',paddingLeft:'25px',marginBottom:'0px',fontFamily:'helvetica'}}>Create Acount</p>
      <p style={{fontSize:'13px',color: '#111',fontWeight:'bold',fontFamily:'helvetica',paddingLeft:'25px',paddingTop:'0px',marginBottom:'0px'}}>Your Name*</p>
      <br/>
      <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
      <div style={textbox}>
      <TextValidator onChange={this.handleChange}
                    name="name"
                    validators={['required', 'isString']}
                    errorMessages={['this field is required', 'Name is not valid']}
                    value={user.name}  underlineShow={false}/>
        </div>
        <p style={{fontSize:'13px',color: '#111',fontWeight:'bold',fontFamily:'helvetica',paddingLeft:'25px',paddingTop:'10px',marginBottom:'0px'}}>Mobile number*</p>
        <br/>
      <div style={textbox}>
      <TextValidator onChange={this.handleChange}
                    name="mobile"
                    validators={['required', 'isNumber', 'isPositive', 'minStringLength:10','maxStringLength:10']}
                    errorMessages={['this field is required', 'Invalid Number', 'Invalid Number', 'Enter a 10 digit number', 'Enter a 10 digit number']}
                    value={user.mobile} underlineShow={false}/>
        </div>
        <p style={{fontSize:'13px',color: '#111',fontWeight:'bold',fontFamily:'helvetica',paddingLeft:'25px',paddingTop:'10px',marginBottom:'0px'}}>Email address*</p>
        <br/>
      <div style={textbox}>
        <TextValidator onChange={this.handleChange}
                    name="email"
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                    value={user.email}  underlineShow={false}/>
        </div>
        <p style={{fontSize:'13px',color: '#111',fontWeight:'bold',fontFamily:'helvetica',paddingLeft:'25px',paddingTop:'10px',marginBottom:'0px'}}>Password*</p>
        <br/>
      <div style={textbox}>
      <TextValidator onChange={this.handleChange}
                    name="password"
                    validators={['required','minStringLength:6']}
                    errorMessages={['this field is required','Minimum Password length must be 6 ']}
                    value={user.password} underlineShow={false} type="password"/>
        </div>
        <div style={{display:'inline',paddingTop:'10px'}}>
        <RaisedButton label="Create" labelStyle={{lineHeight: '25px',fontFamily: 'helvetica',fontSize: '13px',textTransform:'none',fontWeight:'bold',verticalAlign:'middle'}} buttonStyle={buttonstyle}disableTouchRipple='false'type='submit'
        style={{color: 'transparent',backgroundColor: '#f0c14b',borderRadius: '2px',borderShadow:'none',height: '35px',width: '290px',verticalAlign:'middle',display:'inline-block',marginLeft:'25px',marginTop:'10px'}}
        />
        </div>
        </ValidatorForm>
        <br /><br/>
        <p style={{fontSize:'13px',color: '#111',fontWeight:'bold',fontFamily:'helvetica',paddingLeft:'25px',paddingTop:'0px',marginBottom:'0px'}}>Already have an account?<span class="help" style={{paddingLeft:'10px'}} onClick={this.handleClick}>Sign in</span></p>
      </div>
      </Paper>
      </div>
  );
}
}