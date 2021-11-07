import { CSSProperties } from "react"
import { FunctionComponent, ReactNode, useEffect, useState } from "react"
import ItemCard from "./ItemCard"

declare global {
    interface Window{
        gapi:any
    }
}
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

    //Socket for updating the top bid for all users.
    const [socket, setSocket] = useState<WebSocket | undefined>()
    useEffect(() => {
        return
    },[socket])

    const useDocsAPI = async () => {
        useEffect(() => {
            window.gapi.load('client:auth2', async () => {
                window.gapi.client.init({
                    apiKey:process.env.REACT_APP_CLIENT_ID,
                    clientId:process.env.REACT_APP_CLIENT_ID,
                    scope:process.env.REACT_APP_GAPI_SCOPES
                })
                .then(() => window.gapi.client.load('docs'))
                .then(async () => {
                    const res = await window.gapi.client.docs.documents.get({
                        documentId:process.env.REACT_APP_DOC_ID
                    })
                    console.log(res)
                })
            })
        },[])
    }
    useDocsAPI()
    useEffect(() => {
        const getItems = async () => {
            try{
                const res = await fetch(`${process.env.REACT_APP_API_URL}/users/getprices`, {
                    method: 'GET', 
                    mode:'cors',
                    headers:{
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                const data = await res.json()
                console.log(data)
                setItems(data) 
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