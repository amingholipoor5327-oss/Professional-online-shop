import CartClient from "../cartClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);

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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);

  const product = await res.json();

  return <CartClient product={product} />;
}