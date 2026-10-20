import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    const [cartItems, setCartItems] = useState([])

    const [total, setTotal] = useState(0)

    // Fetch Cart from Backend

const fetchCart = async () => {
    try {
        const response = await fetch(`${BASEURL}/api/cart/`);

        if (!response.ok) {
            throw new Error("Failed to fetch cart");
        }

        const data = await response.json();

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
            const response = await fetch(`${BASEURL}/api/cart/add/`, {
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
            await fetch(`${BASEURL}/api/cart/remove/`, {
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
            await fetch(`${BASEURL}/api/cart/update/`, {
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


    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext)