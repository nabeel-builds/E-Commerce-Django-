import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const imageUrl = product.image
        ? product.image.startsWith("http")
            ? product.image
            : `${BASEURL}${product.image}`
        : null;

    const price = Number(product.price);

    return (
        <Link
            to={`/product/${product.id}`}
            className="group block h-full"
        >
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={product.name}
                            loading="lazy"
                            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
                        />
                    ) : (
                        <div className="flex h-56 items-center justify-center text-gray-400 sm:h-64">
                            <svg
                                className="h-14 w-14"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    strokeWidth="1.5"
                                />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path
                                    d="m21 15-5-5L5 21"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    )}

                    {/* Product Label */}
                    <span className="absolute left-3 top-3 rounded-lg border border-white/70 bg-white/95 px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
                        NexaMart Pick
                    </span>

                    {/* Quick View Indicator */}
                    <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="rounded-xl bg-white/95 px-4 py-3 text-center text-sm font-semibold text-gray-900 shadow-md backdrop-blur-sm">
                            View Product
                            <span className="ml-2 text-blue-600">→</span>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                        Featured Product
                    </p>

                    <h2 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-gray-900 transition-colors group-hover:text-blue-600 sm:text-lg">
                        {product.name}
                    </h2>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                        <div>
                            <p className="mb-1 text-xs text-gray-500">
                                Price
                            </p>

                            <p className="text-xl font-extrabold text-gray-900">
                                {Number.isFinite(price)
                                    ? `$${price.toFixed(2)}`
                                    : "Price unavailable"}
                            </p>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M5 12h14m-7-7 7 7-7 7"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default ProductCard;