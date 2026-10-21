import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [form, setForm] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        if (form.password1 !== form.password2) {
            setMsg("Passwords do not match.");
            return;
        }

        if (form.password1.length < 8) {
            setMsg("Password must contain at least 8 characters.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${BASEURL}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                const errors = Object.values(data)
                    .flat()
                    .filter((value) => typeof value === "string");

                setMsg(errors.join(" ") || "Registration failed. Please try again.");
                return;
            }

            setMsg("Account created successfully! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (err) {
            console.error("Signup error:", err);
            setMsg("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />

            <div className="relative w-full max-w-md">

                {/* Logo */}
                <Link
                    to="/"
                    className="mb-8 flex items-center justify-center gap-2"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-600/20">
                        N
                    </div>

                    <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                        Nexa<span className="text-blue-600">Mart</span>
                    </span>
                </Link>

                {/* Signup Card */}
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">

                    <div className="mb-7 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="10" cy="7" r="4" />
                                <line x1="19" y1="8" x2="19" y2="14" />
                                <line x1="22" y1="11" x2="16" y2="11" />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            Create account
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Join NexaMart and start shopping today.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Choose a username"
                                autoComplete="username"
                                required
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password1"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>

                            <input
                                id="password1"
                                name="password1"
                                type={showPassword ? "text" : "password"}
                                value={form.password1}
                                onChange={handleChange}
                                placeholder="Create a strong password"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password2"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Confirm password
                                </label>

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    {showPassword ? "Hide passwords" : "Show passwords"}
                                </button>
                            </div>

                            <input
                                id="password2"
                                name="password2"
                                type={showPassword ? "text" : "password"}
                                value={form.password2}
                                onChange={handleChange}
                                placeholder="Enter password again"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                            />
                        </div>

                        {/* Message */}
                        {msg && (
                            <div
                                role="status"
                                aria-live="polite"
                                className={`rounded-xl px-4 py-3 text-sm ${
                                    msg.includes("successfully")
                                        ? "border border-green-200 bg-green-50 text-green-700"
                                        : "border border-red-200 bg-red-50 text-red-700"
                                }`}
                            >
                                {msg}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <span aria-hidden="true">→</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-xs text-slate-400">
                            ALREADY A MEMBER?
                        </span>
                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <Link
                        to="/login"
                        className="block w-full rounded-xl border border-slate-200 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                        Sign in to your account
                    </Link>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} NexaMart. All rights reserved.
                </p>
            </div>
        </div>
    );
}

export default Signup;