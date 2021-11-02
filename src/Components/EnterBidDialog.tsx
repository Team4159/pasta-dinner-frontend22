import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { ChangeEvent,useEffect, useState } from "react"


type EnterBidDialogProps = {
    isOpen:boolean;
    handleDialogClose: () => void
}
type EnterBidDialogState = {
    emailText?:string;
    phoneNumberText?:string;
    bidAmount: string;
    name:string
}
const styles = {
    textField: {
        marginRight: ".75em",
        //marginLeft: ".75em",
        marginTop:".5em",
        marginBottom:".5em"
    },
    title: {
        align:"center"
    }
}
const EnterBidDialog = (props:EnterBidDialogProps):JSX.Element => {
    type Item = {
        name:string;
        description:string;
        price:number;
    }
    const [emailText, setEmailText] = useState<string>("")
    const [phoneNumberText, setPhoneNumberText] = useState<string>("")
    const [bidAmount, setBidAmount] = useState<string>("")
    const [name, setName] = useState<string>("")
    const handleEmailChange = (e:ChangeEvent<HTMLInputElement>):void => setEmailText(e.currentTarget.value)
    const handlePhoneNumberChange = (e:ChangeEvent<HTMLInputElement>):void => setPhoneNumberText(e.currentTarget.value)
    const handleNameChange = (e:ChangeEvent<HTMLInputElement>):void => setName(e.currentTarget.value)
    const handleBidAmountChange = (e:ChangeEvent<HTMLInputElement>):void => setBidAmount(e.currentTarget.value)
    const clearInputs = ():void => {
        setEmailText("");
        setPhoneNumberText("")
        setName("")
        setBidAmount("")
        //submit bid notif
    }
    const close = ():void => {
        clearInputs()
        props.handleDialogClose()
    }
    const handleSubmitBid = ():void => {
        if(!emailText.split(" ") || 
           !phoneNumberText.split(" ") || 
           !bidAmount ||
           !name.split("")) return console.log("Invalid field(s)") //check later
        clearInputs()
       //AJAX calls
    }
    const validateBidAmount = ():boolean => { //validate all 4 fields
        return true
    }
    useEffect(() => {
        //initial ajax
    }, [])

    return (
        <Dialog open={props.isOpen}>
            <DialogContent>
                <DialogTitle>
                    <Typography variant={"h5"} align="left">Bidding?</Typography>
                </DialogTitle>
                <DialogContentText align="left"> {/*give margin bottom*/}
                    Enter Contact Info
                </DialogContentText>
                <TextField value={name} label={"Name"} onChange={handleNameChange} sx={styles.textField}/>
                <TextField value={emailText} label={"Email"} onChange={handleEmailChange} sx={styles.textField}/> {/*do validation later*/}
                <TextField value={phoneNumberText} label={"Phone Number"} onChange={handlePhoneNumberChange} margin={"normal"} sx={styles.textField}/>
                <TextField value={bidAmount} label={"Bid Amount"} onChange={handleBidAmountChange} sx={styles.textField}/>
                <DialogActions>
                    <Button onClick={handleSubmitBid}>Submit Bid</Button> {/*Expose all descriptions button in app.tsx*/}
                    <Button onClick={close}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}
export default EnterBidDialog