import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { clearToken, getAccessToken } from "../utils/auth";

function Navbar() {
    const { cartItems = [] } = useCart();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const isLoggedIn = Boolean(getAccessToken());

    const cartCount = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    const closeMenu = () => setMenuOpen(false);

    const handleLogout = () => {
        clearToken();
        closeMenu();
        navigate("/login");
    };

    const navLinkClass = ({ isActive }) =>
        `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
            isActive
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-blue-700"
        }`;

    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl">
                <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Brand */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        aria-label="NexaMart home"
                        className="group flex shrink-0 items-center gap-3"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/20 transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
                                <circle cx="10" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                            </svg>
                        </div>

                        <div>
                            <span className="block text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                                Nexa<span className="text-blue-600">Mart</span>
                            </span>
                            <span className="hidden text-[11px] font-medium tracking-wide text-slate-500 sm:block">
                                SHOP SMART. LIVE BETTER.
                            </span>
                        </div>
                    </Link>

                    {/* Desktop navigation */}
                    <div className="hidden items-center gap-2 md:flex">
                        <NavLink to="/" end className={navLinkClass}>
                            Home
                        </NavLink>

                        <NavLink to="/cart" className={navLinkClass}>
                            Cart
                        </NavLink>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* Cart icon */}
                        <Link
                            to="/cart"
                            aria-label={`Shopping cart, ${cartCount} items`}
                            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
                                <circle cx="10" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                            </svg>

                            {cartCount > 0 && (
                                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-blue-600 px-1 text-[10px] font-extrabold text-white">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Authentication actions */}
                        {isLoggedIn ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="hidden items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 sm:inline-flex"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <path d="M16 17l5-5-5-5" />
                                    <path d="M21 12H9" />
                                </svg>
                                Logout
                            </button>
                        ) : (
                            <div className="hidden items-center gap-2 sm:flex">
                                <Link
                                    to="/login"
                                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
                        >
                            {menuOpen ? (
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <path d="M4 7h16M4 12h16M4 17h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile navigation */}
                {menuOpen && (
                    <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">
                        <div className="mx-auto flex max-w-7xl flex-col gap-2">

                            <NavLink
                                to="/"
                                end
                                onClick={closeMenu}
                                className={navLinkClass}
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/cart"
                                onClick={closeMenu}
                                className={navLinkClass}
                            >
                                Shopping Cart
                                {cartCount > 0 && (
                                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                                        {cartCount} items
                                    </span>
                                )}
                            </NavLink>

                            <div className="my-2 border-t border-slate-100" />

                            {isLoggedIn ? (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full rounded-xl bg-slate-900 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-slate-700"
                                >
                                    Logout
                                </button>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        to="/login"
                                        onClick={closeMenu}
                                        className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        onClick={closeMenu}
                                        className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Navbar;