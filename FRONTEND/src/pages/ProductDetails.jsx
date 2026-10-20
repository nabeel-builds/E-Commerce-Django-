import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCart } from "../context/CartContext"

function ProductDetails() {

    const { id } = useParams()
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [adding, setAdding] = useState(false);
    const [cartMessage, setCartMessage] = useState("");
    const { addToCart } = useCart()


    const handleAddToCart = async () => {
        try {
            setAdding(true);
            setCartMessage("");

            await addToCart(product.id);

            setCartMessage("Product added to cart successfully!");
        } catch (err) {
            setCartMessage(err.message || "Unable to add product to cart.");
        } finally {
            setAdding(false);
        }
    };

    useEffect(() => {
        async function productDetails() {
            try {
                const response = await fetch(`${BASEURL}/api/products/${id}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch Products")
                }
                const data = await response.json()
                setProduct(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        productDetails()
    }, [id, BASEURL])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!product) {
        return <div>No Product found</div>
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    <img src={`${product.image}`}
                        alt={product.name}
                        className="w-full md:w-1/2 h-auto object-cover rounded-lg" />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-2xl font-semibold text-green-600 mb-6">${product.price}</p>
   
                        <button
                            onClick={handleAddToCart}
                            disabled={adding}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg
               hover:bg-blue-700 disabled:opacity-50
               disabled:cursor-not-allowed transition-all"
                        >
                            {adding ? "Adding..." : "Add to Cart"}
                        </button>

                        {cartMessage && (
                            <p className="mt-3 text-sm text-gray-700" role="status">
                                {cartMessage}
                            </p>
                        )}
                    
                        {/* Home Page Navigate */}
                        <div className="mt-4">
                            <a href="/" className="text-blue-600 hover:underline">
                                &larr; Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails