import { CSSProperties } from "react"
import { FunctionComponent, ReactNode, useEffect, useState } from "react"
import ItemCard from "./ItemCard"

type ItemsContainerProps = {
    items?: {}[] 
    cards?: ReactNode[]

    //From itemcard
    handleDialogOpen: (cardID?:number) => void;
    handleRetractDialogOpen: (cardID?:number) => void;
}
const styles = {
    row:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "start",
        overflow:"hidden",
        marginRight:"auto"
    } as CSSProperties
}

const ItemsContainer = (props: ItemsContainerProps):JSX.Element => {
    const [items, setItems] = useState<any[]>([])
    useEffect(() => {
        const getItems = async () => {
            try{
                var res = await fetch("https://pastadinner.lren.cf/users/getprices", {method: 'GET', mode:'cors'})
                const data = await res.json()
                console.log(data)
                setItems(data)
            } catch(err) {
                console.log("Could not get items " + err)
            } finally {
                console.log("Attempted to get items")
            }
        }
        getItems()
    }, [])
    return (
        <div style={styles.row}>

            {items.map(item =>
                //console.log(`${item.id} \n ${item.name} \n ${item.startingPrice} \n ${item.description} ${item.highestBid} \n\n`)
                <ItemCard 
                    id={item.id}
                    handleDialogOpen={props.handleDialogOpen} 
                    handleRetractDialogOpen={props.handleRetractDialogOpen} 
                    itemName={item.name} 
                    topBid={item.highestBid} 
                    startingPrice={item.startingPrice} 
                    description={item.description}
                />
            )}
        </div>
    )
}
export default ItemsContainer