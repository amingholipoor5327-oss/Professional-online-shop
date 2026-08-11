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
  try {
    let response = await fetch("https://fakestoreapi.com/products/");
    let products = await response.json();

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
        <Middle product={products} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}