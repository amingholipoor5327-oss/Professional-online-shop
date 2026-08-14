import Middle from "@/app/component/page/middlecontent"

export default async function Categorypage({params}){
    
    const {category} = await params
    const decodecategory = decodeURIComponent(category)

    const response = await fetch("https://fakestoreapi.com/products")

    if(!response.ok){
        throw new Error("خطا در دریافت اطلاعات محصولات")
    }
    const products = await response.json()

    const categoryproduct = products.filter(
        (product)=> product.category === decodecategory
    )
    return(
        <div>
            <h1>
                محصولات
            </h1>

            {categoryproduct.length>0 ? 
            <Middle product={categoryproduct}/>
            : 
            <h1>محصولی پیدا نشد </h1>    
        }
        </div>
    )
}