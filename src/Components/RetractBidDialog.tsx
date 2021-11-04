import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { ChangeEvent, useState } from "react"

type RetractBidProps = {
    isOpen:boolean;
    handleDialogClose: (cardID:number | undefined) => void
    currentCard?:number
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
    const handleNameChange = (e:ChangeEvent<HTMLInputElement>):void => setName(e.currentTarget.value)
    const handleBidAmountChange = (e:ChangeEvent<HTMLInputElement>):void => setBidAmount(e.currentTarget.value)
    const clearInputs = ():void => {
        setName("")
        setBidAmount("")
        
    }
    const close = ():void => {
        clearInputs()
        props.handleDialogClose(props.currentCard)
    }
    const handleSubmitRetract = async ():Promise<void> => {
        if(!bidAmount ||
           bidAmount.split(" ").length > 1 ||
           !name.split("")) return console.log("Invalid field(s)") //Set error TextField instead later
        clearInputs()
        //useffect ajax
        try {
            const body:RetractBidInfo = {

            }
            const res = await fetch("", {method:'POST', mode:'cors', body: JSON.stringify(body)})
            const data = await res.json()
            console.log(data)
        } catch(err){
            console.log(err)
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
                <TextField value={name} label={"Name"} onChange={handleNameChange} sx={styles.textField}/>
                <TextField value={bidAmount} label={"Bid Amount"} onChange={handleBidAmountChange} sx={styles.textField}/>
                <DialogActions>
                    <Button onClick={handleSubmitRetract}>Submit Bid</Button> {/*Expose all descriptions button in app.tsx*/}
                    <Button onClick={close}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

}
export default RetractBid