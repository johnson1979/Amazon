import React,{Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Search from 'material-ui-icons/Search';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import './App.css';

const style2={
    paddingTop:'0px',
    backgroundColor:'White',
    height:'10px'
    }
 const style3={
        paddingTop:'260px',
        backgroundColor:'White',
        height:'200px'
        }
const imgstyle1 = {
        height: '100%',
        width: '100%',
        border: 'none',
        color: '#fff',
        paddingTop:'0px',
        display:'inline-block',
        verticalAlign: 'top',
        marginBottom:'0px'
    }
    const styles = {
        root: {
            paddingLeft:'20px',
            margin:'0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            float:'Left'
        },
        gridList: {
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto', 
          
        },
        titleStyle: {
          color: '#696969',
          fontWeight:'Bold',
          verticalAlign:'middle'
        },
      };
      const tilesData = [
        {
          img: 'Books.jpg',
          title:'BOOKS'
        },
          {
            img: 'Mobiles.jpg'
          },
          {
            img: 'Electronics.jpg'
          },
          {
          img: 'Home.jpg'
          },
          {
            img: 'Toys.jpg',
            title:'TOYS'
          }
  ]
    export default class MainPage extends React.Component {  
        render() {
          return (
            <div style={{width:'100%',overflow:'hidden'}}>
          <Paper style={style2} zDepth={1} >
        <div>
         <img src="amazon_img1.jpg" style={imgstyle1}/>
         </div>
         </Paper>
         <Paper style={style3} zDepth={2} >
         <p style={{fontSize: '21px',fontWeight: '400',paddingLeft:'20px'}}>Shop from different categories</p>
         <div style={styles.root}>
         <GridList style={styles.gridList} cols={1} padding={20}>
         {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          titleStyle={styles.titleStyle}
          titlePosition="bottom"
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.0) 0%,rgba(0,0,0,0.0) 70%,rgba(0,0,0,0) 100%)">
          <img src={tile.img}
          style={{cursor:'pointer'}} />
        </GridTile>
      ))}
    </GridList>
    </div>
        </Paper>
         </div>
         );
        }
      }