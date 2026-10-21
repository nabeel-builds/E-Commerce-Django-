import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getAccessToken } from "../utils/auth";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL?.replace(/\/+$/, "");

    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [adding, setAdding] = useState(false);
    const [cartMessage, setCartMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [imageFailed, setImageFailed] = useState(false);

    // Fetch product details
    useEffect(() => {
        const controller = new AbortController();

        async function fetchProduct() {
            setLoading(true);
            setError("");
            setProduct(null);
            setImageFailed(false);
            setCartMessage("");

            try {
                if (!BASEURL) {
                    throw new Error("API URL is not configured.");
                }

                const response = await fetch(
                    `${BASEURL}/api/products/${id}/`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("This product could not be found.");
                    }

                    throw new Error("Unable to load product details.");
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

    // Image URL
    const imageUrl = product?.image
        ? product.image.startsWith("http")
            ? product.image
            : `${BASEURL}/${product.image.replace(/^\/+/, "")}`
        : null;

    // Price formatting in Indian Rupees
    const price = Number(product?.price);

    const formattedPrice = Number.isFinite(price)
        ? new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
          }).format(price)
        : "Price unavailable";

    // Add to cart
    const handleAddToCart = async () => {
        if (!getAccessToken()) {
            navigate("/login");
            return;
        }

        if (!product?.id || adding) return;

        setAdding(true);
        setCartMessage("");
        setMessageType("");

        try {
            await addToCart(product.id);

            setCartMessage("Product added to your cart!");
            setMessageType("success");
        } catch (err) {
            console.error("Add to cart error:", err);
            setCartMessage(
                err.message || "Unable to add this product to your cart."
            );
            setMessageType("error");
        } finally {
            setAdding(false);
        }
    };

    // Loading skeleton
    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 pb-12 pt-28 sm:px-6">
                <div className="mx-auto max-w-6xl animate-pulse">
                    <div className="mb-7 h-4 w-44 rounded bg-slate-200" />

                    <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white md:grid-cols-2">
                        <div className="min-h-80 bg-slate-200 sm:min-h-[480px]" />

                        <div className="space-y-5 p-6 sm:p-10">
                            <div className="h-4 w-32 rounded bg-slate-200" />
                            <div className="h-9 w-3/4 rounded bg-slate-200" />
                            <div className="h-7 w-36 rounded bg-slate-200" />
                            <div className="h-px bg-slate-200" />
                            <div className="h-4 w-full rounded bg-slate-200" />
                            <div className="h-4 w-5/6 rounded bg-slate-200" />
                            <div className="h-12 w-full rounded-xl bg-slate-200" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-28">
                <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                        <svg
                            className="h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4m0 4h.01" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-extrabold text-slate-900">
                        {error === "This product could not be found."
                            ? "Product not found"
                            : "Unable to load product"}
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        {error || "This product may no longer be available."}
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6">
            <div className="mx-auto max-w-7xl">

                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate-500"
                >
                    <Link to="/" className="transition hover:text-blue-600">
                        Home
                    </Link>

                    <span>/</span>

                    <span className="max-w-[220px] truncate font-semibold text-slate-900">
                        {product.name}
                    </span>
                </nav>

                {/* Product card */}
                <section className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-2">

                    {/* Product image */}
                    <div className="relative flex min-h-80 items-center justify-center bg-slate-50 p-6 sm:p-10 md:min-h-[560px]">
                        <span className="absolute left-5 top-5 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                            NexaMart Collection
                        </span>

                        {imageUrl && !imageFailed ? (
                            <img
                                src={imageUrl}
                                alt={product.name}
                                onError={() => setImageFailed(true)}
                                className="max-h-[480px] w-full object-contain transition duration-500 hover:scale-[1.03]"
                            />
                        ) : (
                            <div className="flex h-72 w-full flex-col items-center justify-center gap-3 rounded-2xl bg-slate-100 text-slate-400">
                                <svg
                                    className="h-16 w-16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="m21 15-5-5L5 21" />
                                </svg>

                                <span className="text-sm font-medium">
                                    Image unavailable
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Product information */}
                    <div className="flex flex-col p-6 sm:p-9 lg:p-12">
                        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">
                            Discover NexaMart
                        </p>

                        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                                {formattedPrice}
                            </span>

                            <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                                Available for purchase
                            </span>
                        </div>

                        <div className="my-7 border-t border-slate-100" />

                        {/* Description */}
                        <div>
                            <h2 className="mb-3 text-lg font-bold text-slate-900">
                                Product Description
                            </h2>

                            <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                                {product.description ||
                                    "No description is available for this product."}
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="mt-7 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m5 12 4 4L19 6" />
                                    </svg>
                                </span>
                                A simple and convenient shopping experience
                            </div>

                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="10" width="18" height="11" rx="2" />
                                        <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                                    </svg>
                                </span>
                                Secure account-based shopping
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={adding || !Number.isFinite(price)}
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {adding ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                        Adding to cart...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
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
                                    aria-live="polite"
                                    className={`mt-4 rounded-xl border px-4 py-3 text-sm font-medium ${
                                        messageType === "success"
                                            ? "border-green-200 bg-green-50 text-green-700"
                                            : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                                >
                                    <p>{cartMessage}</p>

                                    {messageType === "success" && (
                                        <Link
                                            to="/cart"
                                            className="mt-2 inline-block font-bold underline underline-offset-2"
                                        >
                                            View Cart →
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>

                        <Link
                            to="/"
                            className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                        >
                            <span aria-hidden="true">←</span>
                            Continue Shopping
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default ProductDetails;
