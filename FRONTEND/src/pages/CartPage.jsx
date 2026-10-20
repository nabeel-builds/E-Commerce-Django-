import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
    const {
        cartItems,
        total,
        removeFromCart,
        updateQuantity,
    } = useCart();

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const formatPrice = (price) => {
        const amount = Number(price);
        return `$${(Number.isFinite(amount) ? amount : 0).toFixed(2)}`;
    };

    const itemCount = cartItems.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
    );

    const calculatedTotal = cartItems.reduce(
        (sum, item) =>
            sum +
            Number(item.product_price || 0) *
                Number(item.quantity || 0),
        0
    );

    const orderTotal =
        total !== undefined && total !== null
            ? Number(total)
            : calculatedTotal;

    return (
        <main className="min-h-screen bg-gray-100 px-4 pb-14 pt-28 sm:px-6">
            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <header className="mb-8">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                        NexaMart / Shopping Bag
                    </p>

                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Your Shopping Cart
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Review your selections before completing your order.
                    </p>
                </header>

                {cartItems.length === 0 ? (
                    /* Empty Cart */
                    <section className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm sm:py-20">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <svg
                                className="h-10 w-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle cx="10" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900">
                            Your cart is empty
                        </h2>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                            You haven't added any products yet. Explore our
                            collection and find something you'll love.
                        </p>

                        <Link
                            to="/"
                            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                            Explore Products <span>→</span>
                        </Link>
                    </section>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-3">

                        {/* Cart Products */}
                        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-7">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Cart Items
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Your selected products
                                    </p>
                                </div>

                                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
                                    {itemCount} {itemCount === 1 ? "item" : "items"}
                                </span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {cartItems.map((item) => {
                                    const imageUrl = item.product_image
                                        ? item.product_image.startsWith("http")
                                            ? item.product_image
                                            : `${BASEURL}${item.product_image}`
                                        : null;

                                    const unitPrice = Number(item.product_price);
                                    const quantity = Number(item.quantity) || 1;

                                    return (
                                        <article
                                            key={item.id}
                                            className="flex flex-col gap-4 p-5 transition hover:bg-gray-50/70 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
                                        >
                                            {/* Product Image */}
                                            <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-100 sm:h-28 sm:w-28">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.product_name}
                                                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-gray-400">
                                                        <svg
                                                            className="h-9 w-9"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M6 7h12l1 14H5L6 7z M9 7a3 3 0 016 0"
                                                                strokeWidth="1.5"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="min-w-0 flex-1">
                                                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                                                    NexaMart Product
                                                </p>

                                                <h3 className="break-words text-lg font-bold text-gray-900">
                                                    {item.product_name}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Unit price:{" "}
                                                    {formatPrice(unitPrice)}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M3 6h18M8 6V4h8v2m-11 0 1 14h12l1-14M10 11v5m4-5v5"
                                                            strokeWidth="1.7"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>

                                            {/* Quantity and Item Total */}
                                            <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                                                <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                quantity - 1
                                                            )
                                                        }
                                                        disabled={quantity <= 1}
                                                        className="h-9 w-9 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                                        aria-label={`Decrease ${item.product_name} quantity`}
                                                    >
                                                        −
                                                    </button>

                                                    <span className="min-w-9 text-center text-sm font-bold text-gray-900">
                                                        {quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                quantity + 1
                                                            )
                                                        }
                                                        className="h-9 w-9 text-gray-600 transition hover:bg-gray-100"
                                                        aria-label={`Increase ${item.product_name} quantity`}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <p className="text-lg font-extrabold text-gray-900">
                                                    {formatPrice(
                                                        (Number.isFinite(unitPrice)
                                                            ? unitPrice
                                                            : 0) * quantity
                                                    )}
                                                </p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Order Summary */}
                        <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
                            <h2 className="text-xl font-bold text-gray-900">
                                Order Summary
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Review your order total.
                            </p>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-gray-500">
                                        Subtotal ({itemCount} items)
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        {formatPrice(
                                            Number.isFinite(orderTotal)
                                                ? orderTotal
                                                : calculatedTotal
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Shipping
                                    </span>
                                    <span className="font-semibold text-green-600">
                                        Free
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 pt-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="font-bold text-gray-900">
                                            Total
                                        </span>
                                        <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                                            {formatPrice(
                                                Number.isFinite(orderTotal)
                                                    ? orderTotal
                                                    : calculatedTotal
                                            )}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Shipping included in this estimate.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    alert("Checkout will be available soon!")
                                }
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-100"
                            >
                                Proceed to Checkout
                                <span>→</span>
                            </button>

                            <Link
                                to="/"
                                className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                            >
                                Continue Shopping
                            </Link>

                            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                                <svg
                                    className="h-4 w-4 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 11V7a4 4 0 00-8 0v4m-1 0h18v10H3V11z"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Secure shopping experience
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}

export default CartPage;