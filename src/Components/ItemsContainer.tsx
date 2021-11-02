import { FunctionComponent, ReactNode, useEffect, useState } from "react"

type ItemsContainerProps = {
    items?: {}[] 
    cards?: ReactNode[]
}

const ItemsContainer = (props: ItemsContainerProps):JSX.Element => {
    const [items, setItems] = useState<any[]>([])
    useEffect(() => {
        const getItems = async () => {
            try{
                const res = await fetch("https://pastadinner.lren.cf/getprices", {method: 'GET', mode:'cors'})
                console.log(res.json())
                
            } catch {
                console.log("Could not get items")
            } finally {
                console.log("Attempted to get items")
            }
        }
        getItems()
    }, [])
    return (
        <div>test</div>
    )
}
export default ItemsContainer