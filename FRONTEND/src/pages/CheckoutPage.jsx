import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { authFetch } from "../utils/auth.js";

function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const { cartItems, total } = useCart();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const calculatedTotal = cartItems.reduce(
        (sum, item) =>
            sum + Number(item.product_price || 0) * Number(item.quantity || 0),
        0
    );

    const orderTotal =
        total !== undefined && total !== null && Number.isFinite(Number(total))
            ? Number(total)
            : calculatedTotal;

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(Number(price) || 0);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (cartItems.length === 0) {
            setMessage("Your cart is empty. Please add products first.");
            setMessageType("error");
            return;
        }

        if (!/^[0-9]{10}$/.test(form.phone.trim())) {
            setMessage("Please enter a valid 10-digit phone number.");
            setMessageType("error");
            return;
        }

        setLoading(true);
        setMessage("");
        setMessageType("");

        try {
            const response = await authFetch(`${BASEURL}/api/orders/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to place your order. Please try again."
                );
            }

            setMessage(
                `Order placed successfully! Order ID: ${data.order_id}`
            );
            setMessageType("success");

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            console.error("Checkout error:", err);
            setMessage(
                err.message || "Something went wrong. Please try again."
            );
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0 && messageType !== "success") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 pt-24 pb-12">
                <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <svg
                            className="h-10 w-10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6"
                            />
                            <circle cx="10" cy="20" r="1" />
                            <circle cx="18" cy="20" r="1" />
                        </svg>
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-gray-900">
                        Your cart is empty
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Add some products to your cart before proceeding to
                        checkout.
                    </p>

                    <Link
                        to="/"
                        className="mt-7 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Explore Products
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 px-4 pt-24 pb-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
                    >
                        <span aria-hidden="true">←</span>
                        Continue shopping
                    </Link>

                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Checkout
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Complete your details to place your order.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                    {/* Checkout Form */}
                    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
                        <div className="mb-7 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="8" r="4" />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 21a8 8 0 0 1 16 0"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Delivery Information
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Where should we deliver your order?
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    maxLength={100}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="address"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Delivery Address
                                </label>

                                <textarea
                                    id="address"
                                    name="address"
                                    placeholder="House number, street, city, state and PIN code"
                                    value={form.address}
                                    onChange={handleChange}
                                    autoComplete="street-address"
                                    rows={4}
                                    maxLength={500}
                                    required
                                    className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Phone Number
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    placeholder="10-digit mobile number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    autoComplete="tel-national"
                                    inputMode="numeric"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    minLength={10}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="payment_method"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Payment Method
                                </label>

                                <select
                                    id="payment_method"
                                    name="payment_method"
                                    value={form.payment_method}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                >
                                    <option value="COD">
                                        Cash on Delivery
                                    </option>
                                    <option value="CreditCard">
                                        Credit / Debit Card
                                    </option>
                                    <option value="Paypal">
                                        PayPal
                                    </option>
                                </select>

                                {form.payment_method !== "COD" && (
                                    <p className="mt-2 text-sm text-amber-700">
                                        Online payment is not integrated yet.
                                        Select Cash on Delivery to place an
                                        order using the current backend.
                                    </p>
                                )}
                            </div>

                            {message && (
                                <div
                                    role="alert"
                                    className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                                        messageType === "success"
                                            ? "border-green-200 bg-green-50 text-green-700"
                                            : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                                >
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    loading ||
                                    cartItems.length === 0 ||
                                    form.payment_method !== "COD"
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                        Processing Order...
                                    </>
                                ) : (
                                    <>
                                        Place Order
                                        <span aria-hidden="true">→</span>
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs leading-5 text-gray-500">
                                Your order will be submitted to NexaMart for
                                processing.
                            </p>
                        </form>
                    </section>

                    {/* Order Summary */}
                    <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-24">
                        <h2 className="text-xl font-bold text-gray-900">
                            Order Summary
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {cartItems.length}{" "}
                            {cartItems.length === 1 ? "item" : "items"} in your
                            cart
                        </p>

                        <div className="mt-6 max-h-80 space-y-4 overflow-y-auto">
                            {cartItems.map((item) => {
                                const imageUrl = item.product_image
                                    ? item.product_image.startsWith("http")
                                        ? item.product_image
                                        : `${BASEURL}${item.product_image}`
                                    : null;

                                return (
                                    <div
                                        key={item.id}
                                        className="flex gap-3"
                                    >
                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={item.product_name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-gray-400">
                                                    No image
                                                </div>
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                {item.product_name}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Qty: {item.quantity}
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-blue-600">
                                                {formatPrice(
                                                    Number(item.product_price) *
                                                        Number(item.quantity)
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="my-6 border-t border-dashed border-gray-200" />

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">
                                    {formatPrice(orderTotal)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="font-medium text-green-600">
                                    Free
                                </span>
                            </div>
                        </div>

                        <div className="my-6 border-t border-gray-200" />

                        <div className="flex items-center justify-between gap-3">
                            <span className="text-base font-bold text-gray-900">
                                Total
                            </span>

                            <span className="text-2xl font-extrabold text-blue-600">
                                {formatPrice(orderTotal)}
                            </span>
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 p-4">
                            <span className="text-blue-600" aria-hidden="true">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3 4.5 6v5.5c0 4.5 3.2 7.5 7.5 9.5 4.3-2 7.5-5 7.5-9.5V6L12 3Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m9 12 2 2 4-4"
                                    />
                                </svg>
                            </span>

                            <p className="text-xs leading-5 text-blue-800">
                                Review your delivery details and order total
                                before placing your order.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default CheckoutPage;
