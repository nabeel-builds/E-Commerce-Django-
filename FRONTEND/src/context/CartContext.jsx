import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    const [cartItems, setCartItems] = useState([])

    const [total, setTotal] = useState(0)

    // Fetch Cart from Backend
    const fetchCart = async () => {
        try{
            const response = await fetch(`${BASEURL}/api/cart`)
            if (!response.ok){
                throw new Error("Failed to fetch")
            }
            const data = await response.json()
            setCartItems(data.item || [])
            setTotal(data.total || 0)
        }catch(error){
            console.error("Error fetching cart:", error)
        }
    }

    useEffect(() => {
      fetchCart()
    }, [])
    

    // Add Product to Cart

    const addToCart = (product) => {
        const existing = cartItems.find((item) => item.id === product.id)
        if (existing) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            )
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }])
        }
    }



    // Remove product from cart
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }


    // Update Quantity
    const updateQuantity = (id, quantity) => {
        if(quantity < 1) return;
        setCartItems(
            cartItems.map((item) => 
            item.id === id ? {...item, quantity} : item)
        )
    }


    return(
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext)