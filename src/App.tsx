import React, { Component, createRef, ReactNode, RefObject } from 'react';
import './App.css';
import { Box } from '@mui/system';
import ItemCard from './Components/ItemCard';
import Header from './Components/Header';
import Instructions from './Components/Instructions';
import EnterBidDialog from './Components/EnterBidDialog';
import InstructionCard from './Components/InstructionCard';
import RetractBidDialog from './Components/RetractBidDialog';
//import addItem from './Misc/addItem.ts'
import ItemsContainer from './Components/ItemsContainer';


type AppProps = {}
type AppState = {
  dialogIsOpen:boolean;
  retractDialogIsOpen:boolean;
  itemCards?: ReactNode[]
  currentSelectedCard?:number
  updateSignaller:boolean
  currentTopBid?:number
}
class App extends Component<Readonly<AppProps>, Readonly<AppState>> {
  constructor(props:AppProps){
    super(props)
    this.state = {
      dialogIsOpen: false,
      retractDialogIsOpen: false,
      itemCards: undefined,
      currentSelectedCard: undefined,
      updateSignaller: false,
      currentTopBid: undefined
    }
  }
  setUpdateSignaller = ():void => this.setState({updateSignaller:!this.state.updateSignaller})
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

  setCurrentTopBid = (bid?:number):void => {
    if(!bid){
      this.setState({currentTopBid:undefined})
      return
    }
    this.setState({currentTopBid: bid})
  }
  componentDidMount():void{
    
  }
  render():JSX.Element{
    return (
      <Box>
        <Header/>
        <Instructions>
           <InstructionCard id={1}/>
           <InstructionCard id={2}/>
           <InstructionCard id={3}/>
        </Instructions>
        <ItemsContainer 
          setCurrentTopBid={this.setCurrentTopBid}
          currentTopBid={this.state.currentTopBid}
          currentCard={this.state.currentSelectedCard}
          updateSignal={this.state.updateSignaller}
          handleDialogOpen={this.handleDialogOpen} 
          handleRetractDialogOpen={this.handleRetractDialogOpen}
          setUpdateSignaller={this.setUpdateSignaller}
        />
        <EnterBidDialog currentTopBid={this.state.currentTopBid} isOpen={this.state.dialogIsOpen} handleDialogClose={this.handleDialogClose} currentCard={this.state.currentSelectedCard} setUpdateSignaller={this.setUpdateSignaller}/>
        <RetractBidDialog isOpen={this.state.retractDialogIsOpen} currentCard={this.state.currentSelectedCard} handleDialogClose={this.handleRetractDialogClose} setUpdateSignaller={this.setUpdateSignaller}/>
      </Box>
    );
  }
}

export default App;
