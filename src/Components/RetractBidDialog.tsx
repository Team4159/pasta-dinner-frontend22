import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { ChangeEvent, useState } from "react"

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
    }
}

const RetractBid = (props:RetractBidProps):JSX.Element => {
    const [bidAmount, setBidAmount] = useState<string>("")
    const [name, setName] = useState<string>("")

    const [nameError, setNameError] = useState<boolean>(false) //finish later
    const [bidError, setBidError] = useState<boolean>(false)

    const [confirmationText, setConfirmationText] = useState("")

    const handleErrors = ():boolean => {
        if(!bidAmount || !(Number.isInteger(parseInt(bidAmount.toString())))){
            setBidError(true)
            return false
        } 
        if(!name || name.split(" ").length < 2){
            setNameError(true)
            return false
        }
        return true
    }
    const clearErrors = ():void => {
        setBidError(false)
        setNameError(false)
    }

    const handleNameChange = (e:ChangeEvent<HTMLInputElement>):void => setName(e.currentTarget.value)
    const handleBidAmountChange = (e:ChangeEvent<HTMLInputElement>):void => setBidAmount(e.currentTarget.value)
    const clearInputs = ():void => {
        setName("")
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
                "name": name,
                "price": bidAmount
            }
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/users/removebid`, 
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
                props.setUpdateSignaller()
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
                    <Typography variant={"h5"} align="left">Bidding?</Typography>
                </DialogTitle>
                <DialogContentText align="left"> {/*give margin bottom*/}
                    Enter Contact Info
                </DialogContentText>
                <TextField 
                    error={nameError}
                    helperText={nameError ? "First Last format is required.":"John Doe"}
                    value={name} 
                    label={"Name"} 
                    onChange={handleNameChange} 
                    sx={styles.textField}/>
                <TextField 
                    error={bidError}
                    helperText={bidError? "A whole number bid is required.":"20"}
                    value={bidAmount} 
                    label={"Bid Amount"} 
                    onChange={handleBidAmountChange} 
                    sx={styles.textField}/>
                <Typography>{confirmationText}</Typography>
                <DialogActions>
                    <Button onClick={handleSubmitRetract}>Submit Bid</Button> {/*Expose all descriptions button in app.tsx*/}
                    <Button onClick={close}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

}
export default RetractBid