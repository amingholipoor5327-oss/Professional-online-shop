import CartClient from "../cartClient";

 export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return {
    title: `${product.title} | فروشگاه امین`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: `${product.title} | فروشگاه امین`,
      description: product.description?.slice(0, 160),
      images: [product.image],
    },
  };
}

 export default async function Page({ params }) {
  const { id } = await params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return <CartClient product={product} />;
}