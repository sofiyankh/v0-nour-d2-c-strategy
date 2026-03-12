export default function ProductSkeleton() {
  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-64 bg-muted" />

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col p-4 gap-3">
        {/* Category */}
        <div className="h-3 w-20 bg-muted rounded" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
        </div>

        {/* Rating */}
        <div className="h-4 w-24 bg-muted rounded" />

        {/* Price */}
        <div className="h-5 w-32 bg-muted rounded mt-auto" />

        {/* Button */}
        <div className="h-10 w-full bg-muted rounded" />
      </div>
    </div>
  )
}
