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
import instructions from "./Descriptions/Descriptions.json"

type AppProps = {}
type AppState = {
  dialogIsOpen:boolean;
  retractDialogIsOpen:boolean;
  itemCards?: ReactNode[]
  currentSelectedCard?:number
}
const styles = {
  
}
class App extends Component<Readonly<AppProps>, Readonly<AppState>> {
  constructor(props:AppProps){
    super(props)
    this.state = {
      dialogIsOpen: false,
      retractDialogIsOpen: false,
      itemCards: undefined,
      currentSelectedCard: undefined
    }
  }
  handleDialogOpen = (cardID?:number):void => {
    this.setState({dialogIsOpen:true})
    this.setCurrentSelectedCard(cardID)
  }
  handleDialogClose = (cardID?:number):void => {
    this.setState({dialogIsOpen:false})
    this.setCurrentSelectedCard(cardID)
  }
  handleRetractDialogOpen = (cardID?:number):void => {
    this.setState({retractDialogIsOpen:true})
    this.setCurrentSelectedCard(cardID)
  }
  handleRetractDialogClose = (cardID?:number):void => {
    this.setState({retractDialogIsOpen: false})
    this.setCurrentSelectedCard(cardID)
  }
  setCurrentSelectedCard = (cardID?:number):void => this.setState({currentSelectedCard:cardID}, () => {})

  componentDidMount():void{
    console.log(instructions.Step1)
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
        <ItemsContainer 
          handleDialogOpen={this.handleDialogOpen} 
          handleRetractDialogOpen={this.handleRetractDialogOpen}
        />
        <EnterBidDialog isOpen={this.state.dialogIsOpen} handleDialogClose={this.handleDialogClose} currentCard={this.state.currentSelectedCard}/>
        <RetractBidDialog isOpen={this.state.retractDialogIsOpen} currentCard={this.state.currentSelectedCard} handleDialogClose={this.handleRetractDialogClose}/>
      </Box>
    );
  }
}

export default App;
