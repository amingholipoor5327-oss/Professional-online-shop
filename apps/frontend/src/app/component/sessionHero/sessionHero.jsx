import Link from "next/link";
import styles from "../css/Hero.module.css";
import Image from "next/image";
export default function Hero(){
    return(
        <div className={styles.container}>
            <div className={styles.image}>
                <Image 
                src="/images/images.png"
                 alt="Amin-compani"
                 width={200}
                 height={200}
                 className={styles.img}
                 /> 
            </div>
            <div className={styles.hero}>
                <h1>اکادمی امین قلی پور</h1>
                <h3>بهترین محصولات را با قیمتی باور نکردنی تهیه کنید.همین حالا کالاهای موجود رو برسی کرده و تجربه ای جدید را به دست بیاوردید</h3>
                <Link href={"/store"}><button>نمایش محصولات</button></Link>
            </div>
        </div>
    )
}