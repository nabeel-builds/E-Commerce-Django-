import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [adding, setAdding] = useState(false);
    const [cartMessage, setCartMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const { addToCart } = useCart();

    // Fetch product from Django API
    useEffect(() => {
        const controller = new AbortController();

        async function fetchProduct() {
            setLoading(true);
            setError("");
            setProduct(null);

            try {
                const response = await fetch(
                    `${BASEURL}/api/products/${id}/`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(
                        response.status === 404
                            ? "Product not found."
                            : "Failed to load product details."
                    );
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Product fetch error:", err);
                    setError(err.message || "Something went wrong.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchProduct();

        return () => controller.abort();
    }, [id, BASEURL]);

    // Resolve product image URL
    const imageUrl = product?.image
        ? product.image.startsWith("http")
            ? product.image
            : `${BASEURL}${product.image}`
        : null;

    const price = Number(product?.price);

    // Add product to cart through context API
    const handleAddToCart = async () => {
        try {
            setAdding(true);
            setCartMessage("");
            setMessageType("");

            await addToCart(product.id);

            setCartMessage("Product added to your cart successfully!");
            setMessageType("success");
        } catch (err) {
            setCartMessage(
                err.message || "Unable to add this product to your cart."
            );
            setMessageType("error");
        } finally {
            setAdding(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <main className="min-h-screen bg-gray-100 px-4 pt-28 pb-12">
                <div className="mx-auto max-w-6xl animate-pulse">
                    <div className="mb-8 h-4 w-48 rounded bg-gray-200" />

                    <div className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8 md:grid-cols-2">
                        <div className="h-80 rounded-xl bg-gray-200 sm:h-[440px]" />

                        <div className="space-y-5 py-4">
                            <div className="h-4 w-32 rounded bg-gray-200" />
                            <div className="h-9 w-3/4 rounded bg-gray-200" />
                            <div className="h-4 w-full rounded bg-gray-200" />
                            <div className="h-4 w-5/6 rounded bg-gray-200" />
                            <div className="h-10 w-40 rounded bg-gray-200" />
                            <div className="h-12 w-full rounded-xl bg-gray-200" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 pt-24">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                        <svg
                            className="h-8 w-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 8v4m0 4h.01M10.3 3.9 1.9 18.2A2 2 0 003.6 21h16.8a2 2 0 001.7-2.8L13.7 3.9a2 2 0 00-3.4 0z"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        {error ? "Unable to load product" : "Product not found"}
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        {error || "This product may no longer be available."}
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 px-4 pb-14 pt-28 sm:px-6">
            <div className="mx-auto max-w-7xl">

                {/* Breadcrumb */}
                <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <Link
                        to="/"
                        className="transition hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <span>/</span>

                    <span className="font-medium text-gray-900">
                        {product.name}
                    </span>
                </nav>

                {/* Product Details */}
                <section className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid-cols-2">

                    {/* Image Section */}
                    <div className="relative flex min-h-80 items-center justify-center bg-gray-50 p-5 sm:p-8 md:min-h-[540px]">
                        <span className="absolute left-5 top-5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                            NexaMart Pick
                        </span>

                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="max-h-[480px] w-full rounded-xl object-contain transition duration-500 hover:scale-[1.03]"
                            />
                        ) : (
                            <div className="flex h-72 w-full items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                                <svg
                                    className="h-20 w-20"
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

                    {/* Information Section */}
                    <div className="flex flex-col p-6 sm:p-9 lg:p-12">

                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                            Discover NexaMart
                        </p>

                        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
                            {product.name}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                                {Number.isFinite(price)
                                    ? `$${price.toFixed(2)}`
                                    : "Price unavailable"}
                            </span>

                            <span className="rounded-lg bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                Available for purchase
                            </span>
                        </div>

                        <div className="my-7 border-t border-gray-100" />

                        <div>
                            <h2 className="mb-3 text-lg font-bold text-gray-900">
                                Product Description
                            </h2>

                            <p className="whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                                {product.description || "No description available for this product."}
                            </p>
                        </div>

                        {/* Product Highlights */}
                        <div className="mt-7 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="m5 12 4 4L19 6"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                Simple and convenient shopping
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <svg
                                        className="h-4 w-4"
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
                                </span>
                                Convenient online ordering
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={adding || !Number.isFinite(price)}
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            >
                                {adding ? (
                                    <>
                                        <svg
                                            className="h-5 w-5 animate-spin"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Adding to Cart...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <circle cx="10" cy="21" r="1" />
                                            <circle cx="19" cy="21" r="1" />
                                        </svg>
                                        Add to Cart
                                    </>
                                )}
                            </button>

                            {cartMessage && (
                                <div
                                    role="status"
                                    className={`mt-4 rounded-xl border px-4 py-3 text-sm font-medium ${
                                        messageType === "success"
                                            ? "border-green-200 bg-green-50 text-green-700"
                                            : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                                >
                                    {cartMessage}

                                    {messageType === "success" && (
                                        <Link
                                            to="/cart"
                                            className="ml-2 font-bold underline underline-offset-2"
                                        >
                                            View Cart
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>

                        <Link
                            to="/"
                            className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-gray-500 transition hover:text-blue-600"
                        >
                            <span>←</span>
                            Continue Shopping
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default ProductDetails;