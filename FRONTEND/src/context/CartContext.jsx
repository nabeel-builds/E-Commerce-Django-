import { createContext, useContext, useState, useEffect } from "react";
import { authFetch } from "../utils/auth";

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    const [cartItems, setCartItems] = useState([])

    const [total, setTotal] = useState(0)

    // Fetch Cart from Backend


const fetchCart = async () => {
    try {
        const response = await authFetch(`${BASEURL}/api/cart/`);

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error("Cart API status:", response.status);
            console.error("Cart API response:", data);

            throw new Error(
                data.detail ||
                data.error ||
                `Failed to fetch cart: ${response.status}`
            );
        }

        setCartItems(data.items || []);
        setTotal(Number(data.total) || 0);
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
};



    useEffect(() => {
        fetchCart()
    }, [])


    // Add Product to Cart


    const addToCart = async (productId) => {
        try {
            const response = await authFetch(`${BASEURL}/api/cart/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: productId,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    JSON.stringify(data) ||
                    "Failed to add product to cart"
                );
            }

            await fetchCart();

            return true;
        } catch (error) {
            console.error("Add to cart error:", error);
            throw error;
        }
    };




    // Remove product from cart
    const removeFromCart = async (itemId) => {
        try {
            await authFetch(`${BASEURL}/api/cart/remove/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ item_id: itemId })
            })
            fetchCart()
        } catch (error) {
            console.error("Error removing from cart:", error)
        }
    }


    // Update Quantity
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId)
            return
        }
        try {
            await authFetch(`${BASEURL}/api/cart/update/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ item_id: itemId, quantity })
            })
            fetchCart()
        } catch (error) {
            console.error("Cant Update the quantity:", error)
        }
    }


    const clearCart = () => {
        setCartItems([])
        setTotal(0)
    }

    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext)