import Hero from "./component/sessionHero/sessionHero";
export  async function generateMetadata({ }){
    return{
        title: "Home/your online cart",
        description:  "this is a amagzing page for browzer online shop " , 

        openGraph:{
           title: "Home/your online cart",
        description:  "this is a amagzing page for browzer online shop " ,   

        }
    }
}
export default function Home() {
  return (
    <div>
    <Hero></Hero>
    </div>
  );
}
