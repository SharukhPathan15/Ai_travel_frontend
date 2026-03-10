import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  show,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}) {
  if (!show) return null;

  const isDanger = variant === "danger";

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onCancel()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isDanger ? "bg-[var(--crimson-subtle)]" : "bg-amber-50"
            }`}>
              <AlertTriangle className={`w-5 h-5 ${isDanger ? "text-[var(--crimson)]" : "text-amber-500"}`} />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
          </div>
          <button onClick={onCancel} className="p-1 hover:opacity-70 transition">
            <X className="w-5 h-5 text-[var(--text-tertiary)]" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-tertiary)] mb-6 leading-relaxed pl-[52px]">
          {description}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm rounded-lg font-medium text-white transition ${
              isDanger
                ? "bg-[var(--crimson)] hover:brightness-110"
                : "bg-amber-500 hover:brightness-110"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
