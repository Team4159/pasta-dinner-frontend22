import React, { Component } from 'react';
import './App.css';
import { Box } from '@mui/system';
import ItemCard from './Components/ItemCard';
import Header from './Components/Header';
import Instructions from './Components/Instructions';
import EnterBidDialog from './Components/EnterBidDialog';

type AppProps = {}
type AppState = {
  dialogIsOpen:boolean;
}
const styles = {
  
}
class App extends Component<AppProps, AppState> {
  constructor(props:AppProps){
    super(props)
    this.state = {
      dialogIsOpen: false
    }
  }
  handleDialogOpen = ():void => this.setState({dialogIsOpen:true})
  handleDialogClose = ():void => this.setState({dialogIsOpen:false})
  render():JSX.Element{
    return (
      <Box sx={styles}>
        <Header/>
        <Instructions/>
        <ItemCard handleDialogOpen={this.handleDialogOpen}/>
        <EnterBidDialog isOpen={this.state.dialogIsOpen} handleDialogClose={this.handleDialogClose} />
      </Box>
    );
  }
}

export default App;
