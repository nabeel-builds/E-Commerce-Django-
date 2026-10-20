import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProducts() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${BASEURL}/api/products/`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products.");
                }

                const data = await response.json();

                // Supports both an array and Django REST Framework pagination.
                const productList = Array.isArray(data)
                    ? data
                    : data.results || [];

                setProducts(productList);
                setFilteredProducts(productList);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching products:", err);
                    setError("Unable to load products. Please try again.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchProducts();

        return () => controller.abort();
    }, [BASEURL]);

    const handleSearch = (value) => {
        setSearch(value);

        const query = value.trim().toLowerCase();

        const filtered = products.filter((product) =>
            product.name?.toLowerCase().includes(query)
        );

        setFilteredProducts(filtered);
    };

    return (
        <main className="min-h-screen bg-gray-100 pt-24 pb-16">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-6 py-12 text-white shadow-lg sm:px-10 sm:py-16">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                        Welcome to NexaMart
                    </p>

                    <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
                        Find products you'll love.
                    </h1>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                        Explore our collection and find the right products
                        for your everyday needs.
                    </p>

                    <a
                        href="#products"
                        className="mt-7 inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
                    >
                        Explore Products
                        <span className="ml-2" aria-hidden="true">→</span>
                    </a>
                </div>
            </section>

            {/* Products Section */}
            <section
                id="products"
                className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8"
            >
                <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-blue-600">
                            OUR COLLECTION
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                            Discover Products
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {loading
                                ? "Loading our collection..."
                                : `${filteredProducts.length} products found`}
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:max-w-sm">
                        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-5 w-5"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-4.34-4.34m0 0A7.5 7.5 0 1 0 6.06 6.06a7.5 7.5 0 0 0 10.6 10.6Z"
                                />
                            </svg>
                        </span>

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search products..."
                            aria-label="Search products"
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>
                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
                            >
                                <div className="h-52 rounded-xl bg-gray-200" />
                                <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                                <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
                                <div className="mt-5 h-10 rounded-lg bg-gray-100" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center">
                        <p className="text-lg font-semibold text-gray-900">
                            Something went wrong
                        </p>

                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && (
                    filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                                🔎
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-gray-900">
                                No products found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Try another search term or clear your search.
                            </p>

                            <button
                                onClick={() => handleSearch("")}
                                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Clear Search
                            </button>
                        </div>
                    )
                )}
            </section>
        </main>
    );
}

export default ProductList;