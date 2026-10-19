import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductList(){

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    useEffect(() => {
        async function fetchProduct(){
            try{
                const response = await fetch(`${BASEURL}/api/products/`)
                if(!response.ok){
                    throw new Error("Failed to fetch Products")
                }
                const data = await response.json()
                setProducts(data)
                setLoading(false)
            }catch(err){
                console.log(err)
                setLoading(false)
            }
        }
        fetchProduct()
    },[])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error:</div>
    }

    return(
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-center py-6 bg-white shadow-md"></h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ):(
                    <p className="col-span-full text-center text-gray-500">No Products Available</p>
                )}
            </div>
        </div>
    )
}
export default ProductList