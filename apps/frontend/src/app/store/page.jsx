import Maincontent from "../component/page/maincontent";

export async function generateMetadata() {
  return {
    title: "فروشگاه | فروشگاه امین",
    description: "مشاهده همه محصولات فروشگاه امین با بهترین قیمت",
  };
}

export default function Store() {
  return (
    <div>
      <Maincontent />
    </div>
  );
}