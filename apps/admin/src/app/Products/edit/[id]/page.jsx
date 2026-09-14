import EditClient from "./editclient";

export default async function({params}) {

const {id} = await params ; 

let data = null

try{
    const responive = await fetch(`http://localhost:3001/api/products/${id}`)
    if(!responive.ok){
        throw new Error(`HTTP : ${responive.status}`)
    }
    data = await responive.json()
}catch(err){
console.log(err);
return <p>محصولی یافت نشد </p>
}

return(
    <div>
        <EditClient product={data}/>
    </div>
)
}