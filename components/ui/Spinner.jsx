export default function Spinner({ className = "" }) {
  return <Loader2 className={`h-5 w-5 animate-spin ${className}`} />;
}