interface Item{
    name:string
    price:number
    description:string
}
const addItem = async (name:string, price:number,desc:string):Promise<void> => {
    const item:Item = {
        name: name,
        price: price,
        description:desc
   }
   const res = await fetch(`${process.env.REACT_APP_API_URL}/users/additem}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode:'cors',
        body: JSON.stringify(item)
   })
   .then(res => console.log(res.json()))
   .then(data => console.log(data))

}
export default addItem