import Middlestore from "./middlestore";
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: "فروشگاه | فروشگاه امین",
    description: "مشاهده همه محصولات فروشگاه امین با بهترین قیمت",
  };
}

export default async function Store() {
  let products = [] ; 
  try{
     let response = await fetch("https://professional-online-shop-qij9.vercel.app/api/products");
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