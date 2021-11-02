import React, { Component, ReactNode } from 'react';
import './App.css';
import { Box } from '@mui/system';
import ItemCard from './Components/ItemCard';
import Header from './Components/Header';
import Instructions from './Components/Instructions';
import EnterBidDialog from './Components/EnterBidDialog';
import InstructionCard from './Components/InstructionCard';
import RetractBidDialog from './Components/RetractBidDialog';
import addItem from './addItem'
import ItemsContainer from './Components/ItemsContainer';

type AppProps = {}
type AppState = {
  dialogIsOpen:boolean;
  retractDialogIsOpen:boolean;
  itemCards?: ReactNode[]
}
const styles = {
  
}
class App extends Component<Readonly<AppProps>, Readonly<AppState>> {
  constructor(props:AppProps){
    super(props)
    this.state = {
      dialogIsOpen: false,
      retractDialogIsOpen: false,
      itemCards: undefined
    }
  }
  handleDialogOpen = ():void => this.setState({dialogIsOpen:true})
  handleDialogClose = ():void => this.setState({dialogIsOpen:false})
  handleRetractDialogOpen = ():void => this.setState({retractDialogIsOpen:true})
  handleRetractDialogClose = ():void => this.setState({retractDialogIsOpen: false})

  componentDidMount():void{

  }
  render():JSX.Element{
    return (
      <Box sx={styles}>
        <Header/>
        <Instructions>
           <InstructionCard id={1} description={" "}/>
           <InstructionCard id={2} description={" "}/>
           <InstructionCard id={3} description={" "}/>
        </Instructions>
        <ItemCard handleDialogOpen={this.handleDialogOpen} handleRetractDialogOpen={this.handleRetractDialogOpen}/>
        <ItemsContainer/>
        <EnterBidDialog isOpen={this.state.dialogIsOpen} handleDialogClose={this.handleDialogClose} />
        <RetractBidDialog isOpen={this.state.retractDialogIsOpen} id={0} handleDialogClose={this.handleRetractDialogClose}/>
      </Box>
    );
  }
}

export default App;
