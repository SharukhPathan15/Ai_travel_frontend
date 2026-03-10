"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Eye, EyeOff, AlertCircle } from "lucide-react";
import ImageSlider from "@/components/auth/ImageSlider";

function Spinner({ label }) {
  return (
    <span className="flex items-center justify-center gap-2.5">
      <span className="w-5 h-5 border-2 border-[#f2ede4]/40 border-t-[#f2ede4] rounded-full animate-spin" />
      {label}
    </span>
  );
}

export default function AuthForm({ mode }) {
  const isLogin = mode === "login";
  const { login, register, user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  }, [user, loading, router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      if (!passwordRegex.test(form.password)) {
        setError("Password must contain uppercase, lowercase, number and special character");
        return;
      }
    }

    setSubmitting(true);

    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
      router.push("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          (isLogin ? "Invalid credentials" : "Registration failed. Try again."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8f2e6] overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="
          fixed top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5
          bg-[#ffffff] text-[#4a4438]
          border border-[#d6cfc3] rounded-full
          text-sm font-medium hover:text-[#1c1813]
          hover:border-[#a89f92] hover:shadow-[0_4px_12px_rgba(28,24,19,0.08),0_2px_4px_rgba(28,24,19,0.05)]
          transition-all duration-200 active:scale-[0.98]
        "
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Image slider side */}
        <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative">
          <ImageSlider />
        </div>

        {/* Form side */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-[#f8f2e6]/95 backdrop-blur-sm">
          <div className="w-full max-w-md lg:max-w-lg space-y-10">
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-light text-[#1c1813] tracking-tight leading-tight">
                {isLogin ? "Welcome back" : "Start your journey"}
              </h1>
              <p className="mt-4 text-[15px] lg:text-base text-[#4a4438] font-light max-w-md mx-auto leading-relaxed">
                {isLogin
                  ? "Sign in to continue your adventures"
                  : "Create your free account. No credit card required."}
              </p>
            </div>

            {/* Form card */}
            <div className="bg-[#ffffff] border border-[#d6cfc3] rounded-2xl shadow-[0_12px_40px_rgba(28,24,19,0.12),0_4px_12px_rgba(28,24,19,0.06)] p-8 lg:p-10">
              {/* Error */}
              {error && (
                <div className="mb-6 p-4 bg-[#f5d8d8] border border-[#b52a2a]/30 rounded-xl text-sm text-[#b52a2a] flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7">
                {!isLogin && (
                  <div>
                    <label className="block mb-2.5 text-sm text-[#4a4438] font-medium">
                      Full name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="
                        w-full h-14 px-5 rounded-xl border border-[#d6cfc3]
                        bg-[#faf7f2] text-[#1c1813]
                        placeholder:text-[#7a7066]
                        focus:border-[#f97316] focus:ring-2 focus:ring-[rgba(249,115,22,0.15)]
                        outline-none transition-all
                      "
                      placeholder="Alex Johnson"
                      autoComplete="name"
                    />
                  </div>
                )}

                <div>
                  <label className="block mb-2.5 text-sm text-[#4a4438] font-medium">
                    Email address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="
                      w-full h-14 px-5 rounded-xl border border-[#d6cfc3]
                      bg-[#faf7f2] text-[#1c1813]
                      placeholder:text-[#7a7066]
                      focus:border-[#f97316] focus:ring-2 focus:ring-[rgba(249,115,22,0.15)]
                      outline-none transition-all
                    "
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block mb-2.5 text-sm text-[#4a4438] font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={isLogin ? undefined : 8}
                      value={form.password}
                      onChange={handleChange}
                      className="
                        w-full h-14 px-5 pr-14 rounded-xl border border-[#d6cfc3]
                        bg-[#faf7f2] text-[#1c1813]
                        placeholder:text-[#7a7066]
                        focus:border-[#f97316] focus:ring-2 focus:ring-[rgba(249,115,22,0.15)]
                        outline-none transition-all
                      "
                      placeholder={isLogin ? "••••••••" : "Minimum 8 characters"}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a7066] hover:text-[#4a4438] transition"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block mb-2.5 text-sm text-[#4a4438] font-medium">
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="
                          w-full h-14 px-5 pr-14 rounded-xl border border-[#d6cfc3]
                          bg-[#faf7f2] text-[#1c1813]
                          placeholder:text-[#7a7066]
                          focus:border-[#f97316] focus:ring-2 focus:ring-[rgba(249,115,22,0.15)]
                          outline-none transition-all
                        "
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a7066] hover:text-[#4a4438] transition"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    w-full h-14 rounded-xl bg-[#f97316] text-[#f2ede4]
                    font-medium text-base shadow-[0_12px_40px_rgba(28,24,19,0.12),0_4px_12px_rgba(28,24,19,0.06)]
                    hover:shadow-[0_12px_40px_rgba(28,24,19,0.12),0_4px_12px_rgba(28,24,19,0.06)]
                    hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all duration-200 flex items-center justify-center gap-2.5
                  "
                >
                  {submitting ? (
                    <Spinner label={isLogin ? "Signing in..." : "Creating account..."} />
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            </div>

            {/* Switch link */}
            <p className="text-center text-sm text-[#7a7066]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link
                href={isLogin ? "/register" : "/login"}
                className="text-[#f97316] font-medium hover:underline transition"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}