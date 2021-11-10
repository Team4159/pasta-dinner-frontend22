import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { ChangeEvent,CSSProperties,useEffect, useState } from "react"
import detectMobile from '../Misc/detectMobile'

type EnterBidDialogProps = {
    isOpen:boolean;
    handleDialogClose: (cardID?:number) => void;
    currentCard?:number;
    setUpdateSignaller: ( )=> void
}
const styles = {
    textField: {
        marginRight: ".75em",
        //marginLeft: ".75em",
        marginTop:".5em",
        marginBottom:".5em",
        maxWidth:"14em",
        width:"14em",
    },
    title: {
        align:"center"
    },
    submissionContent: {
        display:"flex",
        flexDirection: detectMobile() ? "column":"row",
        alignItems:"center",
        justifyContent:"space-between"
    } as CSSProperties,
    button: {
       
    },
    confirmationText: {
        color: '#A6D609'
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


    //Error handling for email, phone, bid, and name
    const [emailError, setEmailError] = useState<boolean>(false) //If I could've done it readably, I would have used ternary
    const [phoneError, setPhoneError] = useState<boolean>(false)
    const [bidError, setBidError] = useState<boolean>(false)
    const [nameError, setNameError] = useState<boolean>(false)

    const [emailHelperText, setEmailHelperText] = useState<string>("Johndoe@gmail.com")
    const [phoneHelperText, setPhoneHelperText] = useState<string>("1234567890")
    const [bidHelperText, setBidHelperText] = useState<string>("20")
    const [nameHelperText, setNameHelperText] = useState<string>("John Doe")

    const [confirmationText, setConfirmationText] = useState<string>("")

    const clearErrors = ():void => {
        setEmailError(false)
        setEmailHelperText("Johndoe@gmail.com")
        setPhoneError(false)
        setPhoneHelperText("1234567890")
        setBidError(false)
        setBidHelperText("20")
        setNameError(false)
        setNameHelperText("John Doe")
    }
    const handleErrors = ():boolean => {
        if(!emailText || !emailText.trim().length){
            setEmailError(true)
            setEmailHelperText("An email is required.")
            return false
        }
        if(!phoneNumberText || !phoneNumberText.split(" ")){
            setPhoneError(true)
            setPhoneHelperText("A phone number is required.")
            return false
        }


        const emailRegex:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const phoneRegex:RegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        if(!phoneRegex.test(phoneNumberText)){
            //Remember to validate against numbers and letters only + styling mobile + fix collpase and expand + docs
            //+ transitions + multiple cases of errors
            setPhoneError(true)
            setPhoneHelperText("Please correctly format your phone number.")
            return false
        }
        if(!emailRegex.test(emailText)){
            setEmailError(true)
            setEmailHelperText("Please correctly format your email.")
            return false
        }


        if(!bidAmount || !(Number.isInteger(parseInt(bidAmount.toString())))){
            setBidError(true)
            setBidHelperText("A whole number bid is required.")
            return false
        } 
        if(!name || name.split(" ").length < 2){
            setNameError(true)
            setNameHelperText("First Last format is required.")
            return false
        }
        //Need to validate >$2
        
        return true
    }
    const clearInputs = ():void => {
        setEmailText("");
        setPhoneNumberText("")
        setName("")
        setBidAmount("")
        //submit bid notif
    }
    const close = ():void => {
        clearInputs()
        clearErrors()
        setConfirmationText("")
        props.handleDialogClose(props.currentCard)
    }
    const handleSubmitBid = async ():Promise<void | Response> => {
        if(!handleErrors()) return
        
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
                `${process.env.REACT_APP_API_URL}/users/addbid`, 
                {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    mode:'cors',
                    body: JSON.stringify(bidInfo)
                }
            )
            console.log(res.text())
            if(res.status === 200) {
                //props.setUpdateSignaller()
                clearInputs()
                clearErrors()
                setConfirmationText("Your bid has been submitted.")
                setTimeout(():void => setConfirmationText(""), 5000)
            } //AND change top bid. Have itemscontainer watch for some value submit/retract bid changes
            else console.log("not 200") //error system
       } catch(err){
           console.error(err)
       }
    }
    useEffect(() => {
        
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
                <TextField 
                    error={nameError} 
                    helperText={nameHelperText} 
                    value={name} label={"Name"} 
                    onChange={handleNameChange} 
                    sx={styles.textField}/>
                <TextField 
                    error={emailError} 
                    helperText={emailHelperText} 
                    value={emailText} label={"Email"} 
                    onChange={handleEmailChange} 
                    sx={styles.textField}/> {/*do validation later;name+email marginBottom*/}
                <TextField 
                    error={phoneError} 
                    helperText={phoneHelperText} 
                    value={phoneNumberText} 
                    label={"Phone Number"} 
                    onChange={handlePhoneNumberChange} 
                    margin={"normal"} 
                    sx={styles.textField}/>
                <TextField 
                    error={bidError} 
                    helperText={bidHelperText} 
                    value={bidAmount} 
                    label={"Bid Amount"} 
                    onChange={handleBidAmountChange} 
                    sx={styles.textField}/>
                <Box sx={styles.submissionContent}>
                    <Typography sx={styles.confirmationText}>{confirmationText}</Typography>
                    <DialogActions>
                        <Button onClick={handleSubmitBid} sx={styles.button}>Submit Bid</Button> {/*Expose all descriptions button in app.tsx*/}
                        <Button onClick={close} sx={styles.button}>Close</Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
export default EnterBidDialog