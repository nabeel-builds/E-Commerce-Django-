import { useCart } from "../context/CartContext";

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL

    const total = cartItems.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
    );

    const formatPrice = (price) =>
        `$${Number(price).toFixed(2)}`;

    return (
        <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">

                {/* Page Heading */}
                <div className="mb-8">
                    <p className="text-sm font-medium text-blue-600 mb-2">
                        YOUR SHOPPING BAG
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Shopping Cart
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Review your items and complete your order.
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart */
                    <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-16 text-center shadow-sm">
                        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-blue-50 flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.7"
                                    d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6"
                                />
                                <circle cx="10" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500 mt-3 max-w-sm mx-auto">
                            Looks like you haven't added anything to your cart yet.
                        </p>

                        <a
                            href="/"
                            className="inline-flex mt-7 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Continue Shopping
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Cart Items
                                    </h2>

                                    <span className="text-sm text-gray-500">
                                        {cartItems.reduce(
                                            (sum, item) => sum + item.quantity,
                                            0
                                        )} items
                                    </span>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5"
                                        >
                                            {/* Product Icon */}
                                            <div className="w-20 h-20 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center">
                                                <svg
                                                    className="w-9 h-9 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                        d="M6 7h12l1 14H5L6 7z M9 7a3 3 0 016 0"
                                                    />
                                                </svg>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-lg">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center gap-4">
                                                    {item.product_image && (
                                                        <img src={`${BASEURL}${item.product_image}`} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Unit price: {formatPrice(item.price)}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition cursor-pointer"
                                                >
                                                    🗑 Remove Item
                                                </button>
                                            </div>

                                            {/* Quantity Controls & Price */}
                                            <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">
                                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                Math.max(1, item.quantity - 1)
                                                            )
                                                        }
                                                        disabled={item.quantity <= 1}
                                                        className="w-9 h-9 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        −
                                                    </button>

                                                    <span className="w-10 text-center text-sm font-semibold text-gray-900">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        className="w-9 h-9 text-gray-600 hover:bg-gray-100"
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <p className="text-lg font-bold text-gray-900">
                                                    {formatPrice(
                                                        Number(item.price) * item.quantity
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href="/"
                                className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-blue-600 hover:text-blue-800"
                            >
                                <span>←</span>
                                Continue Shopping
                            </a>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Order Summary
                                </h2>

                                <div className="mt-6 space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Subtotal
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {formatPrice(total)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Shipping
                                        </span>
                                        <span className="font-medium text-green-600">
                                            Free
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                        <span className="font-semibold text-gray-900">
                                            Total
                                        </span>
                                        <span className="text-2xl font-bold text-gray-900">
                                            {formatPrice(total)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        alert("Connect your checkout page here!")
                                    }
                                    className="w-full mt-7 rounded-xl bg-blue-600 py-3.5 px-4 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition"
                                >
                                    Proceed to Checkout
                                    <span className="ml-2">→</span>
                                </button>

                                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                                    <svg
                                        className="w-4 h-4 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 11V7a4 4 0 00-8 0v4m-1 0h18v10H3V11z"
                                        />
                                    </svg>
                                    Secure checkout
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;
