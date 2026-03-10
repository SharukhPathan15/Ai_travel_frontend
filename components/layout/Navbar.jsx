"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ArrowRight, LogOut, Menu, X, ChevronDown } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const profileRef = useRef(null);
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path) => router.pathname === path;

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-base)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo – slightly larger & bolder */}
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-3 font-semibold text-[var(--text-primary)] tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
              AI
            </div>
            <span className="text-2xl">IntelliTrip</span>
          </Link>

          {/* Desktop – cleaner spacing & consistent button heights */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <ThemeToggle />

                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="ml-3 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--bg-surface)] transition"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center text-sm font-semibold">
                      {user.name?.charAt(0)}
                    </div>

                    <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--border-subtle)]">
                        <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center text-sm font-semibold">
                          {user.name?.charAt(0)}
                        </div>

                        <div className="flex flex-col min-w-0">
                          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-[var(--text-tertiary)] truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            setShowLogoutModal(true);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--crimson)] rounded-lg hover:bg-[var(--crimson-subtle)]/30 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <ThemeToggle />

                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-lg transition-all duration-200"
                >
                  Sign in
                </Link>

                <Link
                  href="/register"
                  className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent-primary)] text-white text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile button – cleaner */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-lg hover:bg-[var(--bg-surface)] active:scale-95 transition"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-[var(--text-primary)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-[300px] bg-[var(--bg-surface)]/95 backdrop-blur-xl border-l border-[var(--border-subtle)] shadow-2xl transform transition-transform duration-300 ease-in-out
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-[var(--border-subtle)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center text-white text-base font-bold">
                    AI
                  </div>
                  <span className="text-lg font-semibold text-[var(--text-primary)]">
                    IntelliTrip
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 py-8 flex flex-col gap-4">
              {user ? (
                <>
                  <div className="px-4 py-3 bg-[var(--bg-elevated)] rounded-xl">
                    <p className="text-sm text-[var(--text-tertiary)]">
                      Signed in as
                    </p>
                    <p className="text-base font-medium text-[var(--text-primary)] mt-0.5">
                      {user.name}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-3 text-[var(--crimson)] rounded-xl hover:bg-[var(--crimson-subtle)]/30 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex justify-center px-6 py-3.5 bg-[var(--bg-elevated)] text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--bg-surface)] transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex justify-center px-6 py-3.5 bg-[var(--accent-primary)] text-white font-medium rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation */}
      <ConfirmModal
        show={showLogoutModal}
        onConfirm={logout}
        onCancel={() => setShowLogoutModal(false)}
        title="Sign out?"
        description="You'll need to sign back in to access your trips and plans."
        confirmLabel="Sign Out"
        cancelLabel="Stay"
        variant="warning"
      />
    </>
  );
}
