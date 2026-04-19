import { Star } from "lucide-react";

export function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= Math.round(rating) ? "star-filled fill-amber-400" : "star-empty"}
          fill={s <= Math.round(rating) ? "#f59e0b" : "transparent"}
          stroke={s <= Math.round(rating) ? "#f59e0b" : "#334155"}
        />
      ))}
      <span className="ml-1 text-slate-400 text-xs font-medium">{rating}</span>
    </div>
  );
}
