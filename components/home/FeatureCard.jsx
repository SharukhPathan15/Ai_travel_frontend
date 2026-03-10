export default function FeatureCard({ icon: Icon, label, title, body }) {
  return (
    <div className="group card card-hover p-7 rounded-xl border border-[var(--border-subtle)] hover:shadow-lg transition-all">
      {Icon && <Icon className="w-11 h-11 mb-3 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors" />}
      <span className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{label}</span>
      <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-2 font-serif leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
        {title}
      </h3>
      <p className="text-sm leading-[1.7] text-[var(--text-secondary)] font-light font-outfit">{body}</p>
    </div>
  );
}
