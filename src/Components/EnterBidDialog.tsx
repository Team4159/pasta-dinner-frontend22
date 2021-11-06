import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { ChangeEvent,useEffect, useState } from "react"


type EnterBidDialogProps = {
    isOpen:boolean;
    handleDialogClose: (cardID?:number) => void;
    currentCard?:number;
    setUpdateSignaller: ()=> void
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
    type BidInfo = {
        id:number
        price:number
        name:string
        phone:string
        email:string
    }
    const [emailText, setEmailText] = useState<string>("")
    const [phoneNumberText, setPhoneNumberText] = useState<string>("")
    const [bidAmount, setBidAmount] = useState<string | number>("")
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
        props.handleDialogClose(props.currentCard)
    }
    const handleSubmitBid = async ():Promise<void | Response> => {
        if(!emailText.split(" ") || 
           !emailText ||
           !phoneNumberText.split(" ") || 
           !bidAmount ||
           !name.split("") || 
           !parseFloat(bidAmount.toString())
          ) return console.log("Invalid field(s)") //check later

        const emailRegex:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const phoneRegex:RegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        if(!phoneRegex.test(phoneNumberText) || !emailRegex.test(emailText)) return console.log("Invalid format")

        //Need to validate >$2
        
       //AJAX calls
       const bidInfo:BidInfo = {
            "id": props.currentCard as number,
            "price": bidAmount as number,
            "name": name,
            "phone": phoneNumberText,
            "email": emailText
       }
       try{
            console.log(bidInfo)
            const res = await fetch(
                "https://pastadinner.lren.cf/users/addbid", 
                {
                    method:'POST',
                    headers: {'Content-Type': 'application/json','Accept': 'application/json'},
                    mode:'cors',
                    body: JSON.stringify(bidInfo)
                }
            )
            console.log(res.text())
            if(res.status === 200) {
                props.setUpdateSignaller()
                clearInputs()
            } //AND change top bid. Have itemscontainer watch for some value submit/retract bid changes
            else console.log("not 200") //error system
       } catch(err){
           console.error(err)
       }
    }
    const validateBidAmount = ():boolean => { //validate all 4 fields
        return true
    }
    const handleErrors = (type:string):void => {

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
                <TextField error={false} helperText={""}value={name} label={"Name"} onChange={handleNameChange} sx={styles.textField}/>
                <TextField value={emailText} label={"Email"} onChange={handleEmailChange} sx={styles.textField}/> {/*do validation later;name+email marginBottom*/}
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