import { CSSProperties } from "react"
import { FunctionComponent, ReactNode, useEffect, useState } from "react"
import ItemCard from "./ItemCard"

type ItemsContainerProps = { //fix expansion issues
    items?: {}[] 
    cards?: ReactNode[]

    //From itemcard
    handleDialogOpen: (cardID?:number) => void;
    handleRetractDialogOpen: (cardID?:number) => void;
    updateSignal:boolean
}
const styles = {
    row:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "center",
        overflow:"hidden",
        marginRight:"auto",
        flexWrap:"wrap"
    } as CSSProperties
}

const ItemsContainer = (props: ItemsContainerProps):JSX.Element => {
    const [items, setItems] = useState<any[]>([])
    useEffect(() => {
        const getItems = async () => {
            try{
                const res = await fetch("https://pastadinner.lren.cf/users/getprices", {
                    method: 'GET', 
                    mode:'cors',
                    headers:{
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                const data = await res.json()
                console.log(data)
                setItems(data) //Make sure its last, its asynchronous
            } catch(err) {
                console.log("Could not get items " + err)
            } 
        }
        getItems()
    }, [props.updateSignal])
    return (
        <div style={styles.row}>

            {items.map(item =>
                //console.log(`${item.id} \n ${item.name} \n ${item.startingPrice} \n ${item.description} ${item.highestBid} \n\n`)
                <ItemCard 
                    key={item.id}
                    id={item.id}
                    handleDialogOpen={props.handleDialogOpen} 
                    handleRetractDialogOpen={props.handleRetractDialogOpen} 
                    itemName={item.name} 
                    topBid={item.highestBid} 
                    startingPrice={item.startingPrice} 
                    description={item.description}
                />
            
            )}
            <ItemCard  
            handleDialogOpen={props.handleDialogOpen} 
            handleRetractDialogOpen={props.handleRetractDialogOpen} 
            />
             <ItemCard  
            handleDialogOpen={props.handleDialogOpen} 
            handleRetractDialogOpen={props.handleRetractDialogOpen} 
            />
             <ItemCard  
            handleDialogOpen={props.handleDialogOpen} 
            handleRetractDialogOpen={props.handleRetractDialogOpen} 
            />
             <ItemCard  
            handleDialogOpen={props.handleDialogOpen} 
            handleRetractDialogOpen={props.handleRetractDialogOpen} 
            />
             <ItemCard  
            handleDialogOpen={props.handleDialogOpen} 
            handleRetractDialogOpen={props.handleRetractDialogOpen} 
            />
        </div>
    )
}
export default ItemsContainer