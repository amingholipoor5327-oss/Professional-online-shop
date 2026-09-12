import Middle from "./middlecontent";

export async function generateMetadata() {
  return {
    title: "محصولات پرفروش | فروشگاه امین",
    description: "بهترین و پرفروش‌ترین محصولات با کیفیت عالی و قیمت مناسب",
    openGraph: {
      title: "محصولات پرفروش | فروشگاه امین",
      description: "بهترین و پرفروش‌ترین محصولات با کیفیت عالی و قیمت مناسب",
    },
  };
}

export default async function Maincontent() {
   let mainproducts = []; 
  try{
     let response = await fetch("http://localhost:3000/api/products");
    let products = await response.json();

    let firstporoduct = products.slice(0,3)
    let secoundproduct = products.slice(10 , 15) 
     mainproducts = [...firstporoduct , ...secoundproduct]}

     catch(error){
      console.log(`error : ${error.message}`)
    }
    return (
      <div>
     <h1
  style={{
    color: "black",
    textAlign: "center",
    margin: "30px 0",
    fontSize: "2rem",
    fontWeight: "bold",
  }}
>
  محصولات پرفروش
</h1>
        <Middle product={mainproducts} />
      </div>
    );
  }  
 