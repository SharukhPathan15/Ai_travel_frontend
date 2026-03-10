export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="h-7 w-[60%] bg-gray-200 rounded mb-2 animate-pulse" />
      <div className="h-4 w-[40%] bg-gray-200 rounded mb-5 animate-pulse" />
      <div className="h-9 bg-gray-200 rounded mb-3 animate-pulse" />
      <div className="h-11 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="h-[38px] bg-gray-200 rounded animate-pulse" />
    </div>
  );
}
