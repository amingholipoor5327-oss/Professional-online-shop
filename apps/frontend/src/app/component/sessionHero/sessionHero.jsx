import styles from "../css/Hero.module.css";
export default function Hero(){
    return(
        <div className={styles.container}>
            <div className={styles.image}>
                <img src="/images/images.png" alt="Amin-compani"></img>
            </div>
            <div className={styles.hero}>
                <h1>اکادمی امین قلی پور</h1>
                <h3>بهترین محصولات را با قیمتی باور نکردنی تهیه کنید.همین حالا کالاهای موجود رو برسی کرده و تجربه ای جدید را به دست بیاوردید</h3>
                <button>نمایش محصولات</button>
            </div>
        </div>
    )
}