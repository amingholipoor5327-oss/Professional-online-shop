import Middlestore from "./middlestore";

export async function generateMetadata() {
  return {
    title: "فروشگاه | فروشگاه امین",
    description: "مشاهده همه محصولات فروشگاه امین با بهترین قیمت",
  };
}

export default async function Store() {
  let products = [] ; 
  try{
     let response = await fetch("http://localhost:3000/api/products");
     if(!response.ok){
       throw Error("محصولات از سرور دریافت نشد ")
      }
      products = await response.json();
 }
     catch(error){
      console.log(error.message)
    }  
  return (
    <div>
      <Middlestore product={products}/>
    </div>
  );
}