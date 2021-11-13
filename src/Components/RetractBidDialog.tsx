import { Email } from "@mui/icons-material"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { ChangeEvent, CSSProperties, useState } from "react"
import detectMobile from "../Misc/detectMobile"

type RetractBidProps = {
    isOpen:boolean;
    handleDialogClose: (cardID:number | undefined) => void
    currentCard?:number
    setUpdateSignaller: () => void
}
type RetractBidInfo = {
    //id:number
    //price:string
    //name:string
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
    },
    submissionContent: {
        display:"flex",
        flexDirection: detectMobile() ? "column":"row",
        alignItems:"center",
        justifyContent:"space-between"
    } as CSSProperties,
    button: {
        color:'#de1738'
    },
    confirmationText: {
        color: '#A6D609'
    }
}

const RetractBid = (props:RetractBidProps):JSX.Element => {
    const [bidAmount, setBidAmount] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [emailError, setEmailError] = useState<boolean>(false) //finish later
    const [bidError, setBidError] = useState<boolean>(false)

    const [confirmationText, setConfirmationText] = useState("")

    const handleErrors = ():boolean => {
        if(!bidAmount || !(Number.isInteger(parseInt(bidAmount.toString())))){
            setBidError(true)
            return false
        } 
        if(!email || !email.trim().length){
            setEmailError(true)
            return false
        }
        const emailRegex:RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!emailRegex.test(email)){
            setEmailError(true)
            return false
        }
        return true
    }
    const clearErrors = ():void => {
        setBidError(false)
        setEmailError(false)
    }

    const handleEmailChange = (e:ChangeEvent<HTMLInputElement>):void => setEmail(e.currentTarget.value)
    const handleBidAmountChange = (e:ChangeEvent<HTMLInputElement>):void => setBidAmount(e.currentTarget.value)
    const clearInputs = ():void => {
        setEmail("")
        setBidAmount("")
        
    }
    const close = ():void => {
        clearInputs()
        clearErrors()
        props.handleDialogClose(props.currentCard)
    }
    const handleSubmitRetract = async ():Promise<void> => {
        if(!handleErrors()) return
        //useEffect AJAX
        try {
            const body:RetractBidInfo = {
                "id": props.currentCard,
                "email": email,
                "price": bidAmount
            }
            const res = await fetch(
                `https://${process.env.REACT_APP_API_URL}/users/removebid`, 
                {
                    method:'POST',  
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    mode:'cors', 
                    body: JSON.stringify(body)
                }
            )
            console.log(res.text())
            if(res.status === 200){
                //props.setUpdateSignaller()
                clearErrors()
                clearInputs()
                setConfirmationText("Your bid has been retracted.")
                setTimeout(() => setConfirmationText(""),5000)
            } 
            else if(res.status === 404){
                console.log("Bid not found.")
                setConfirmationText("Bid not found.")
                setTimeout(() => setConfirmationText(""),5000)
            }
        } catch(err){
            console.error(err)
        }
    }
    return (
        <Dialog open={props.isOpen}>
            <DialogContent>
                <DialogTitle>
                    <Typography variant={"h5"} align="left">Retract Bid</Typography>
                </DialogTitle>
                <DialogContentText align="left"> {/*give margin bottom*/}
                    Enter Contact Info
                </DialogContentText>
                <TextField 
                    error={emailError}
                    helperText={emailError ? "A valid email is required.":"Johndoe@gmail.com"}
                    value={email} 
                    label={"Email"} 
                    onChange={handleEmailChange} 
                    sx={styles.textField}/>
                <TextField 
                    error={bidError}
                    helperText={bidError? "A whole number bid is required.":"20"}
                    value={bidAmount} 
                    label={"Bid Amount"} 
                    onChange={handleBidAmountChange} 
                    sx={styles.textField}/>
                <Box sx={styles.submissionContent}>
                    <Typography sx={styles.confirmationText}>{confirmationText}</Typography>
                    <DialogActions>
                        <Button sx={styles.button} onClick={handleSubmitRetract}>Submit Bid</Button> {/*Expose all descriptions button in app.tsx*/}
                        <Button sx={styles.button} onClick={close}>Close</Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    )

}
export default RetractBid
