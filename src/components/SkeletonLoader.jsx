export default function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-lg mx-auto w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
        >
          <div className="skeleton h-40 w-full" />
          <div className="p-3 space-y-2">
            <div className="skeleton h-5 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
            <div className="skeleton h-3 w-1/3 rounded" />
          </div>
        </div>
      ))}
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-500">
        Generating your meals...
      </p>
    </div>
  )
}
