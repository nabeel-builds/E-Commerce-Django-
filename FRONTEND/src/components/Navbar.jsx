import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
    const { cartItems } = useCart();

    const cartCount = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Brand */}
                <Link
                    to="/"
                    className="group flex items-center gap-3"
                    aria-label="NexaMart home"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 transition-transform group-hover:scale-105">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6"
                            />
                            <circle cx="10" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                        </svg>
                    </div>

                    <div>
                        <span className="block text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                            Nexa<span className="text-blue-600">Mart</span>
                        </span>
                        <span className="hidden text-xs text-gray-500 sm:block">
                            Shopping made simple
                        </span>
                    </div>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-3 sm:gap-6">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `hidden rounded-lg px-3 py-2 text-sm font-semibold transition sm:inline-flex ${
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                                isActive
                                    ? "border-blue-200 bg-blue-50 text-blue-600"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                            }`
                        }
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6"
                            />
                            <circle cx="10" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                        </svg>

                        <span>Cart</span>

                        {cartCount > 0 && (
                            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
