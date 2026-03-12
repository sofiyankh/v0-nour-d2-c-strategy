interface PriceFormatterProps {
  price: number
  originalPrice?: number
  showDiscount?: boolean
}

export default function PriceFormatter({
  price,
  originalPrice,
  showDiscount = false,
}: PriceFormatterProps) {
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg md:text-xl font-bold text-primary">
        {price.toFixed(2)} د.ت
      </span>
      {originalPrice && (
        <>
          <span className="text-sm md:text-base text-muted-foreground line-through">
            {originalPrice.toFixed(2)} د.ت
          </span>
          {showDiscount && (
            <span className="text-xs md:text-sm font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
        </>
      )}
    </div>
  )
}
