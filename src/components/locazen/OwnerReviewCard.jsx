import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function OwnerReviewCard({ review: r, index: i }) {
  const right = i % 2 === 1;
  const name = r.name.replace(/^V\|/, "");
  return (
    <motion.article
      transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
      className="relative w-[86%] overflow-hidden rounded-3xl border border-[#C4A96B]/25 bg-white/5 p-8 shadow-[0_22px_50px_-18px_rgba(0,0,0,0.55)]"
      style={{ marginLeft: right ? "auto" : "0", marginRight: right ? "0" : "auto" }}
    >
      <Quote className="pointer-events-none absolute -right-2 -top-3 h-24 w-24 text-[#C4A96B]/10" />
      <div className="relative">
        <div className="mb-4 flex gap-1">
          {Array.from({ length: r.rating ?? 5 }).map((_, s) => (
            <Star key={s} className="h-4 w-4 fill-[#C4A96B] text-[#C4A96B]" />
          ))}
        </div>
        <p className="text-[15px] leading-7 text-white/90 font-body">{r.comment}</p>
        <div className="mt-6 flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#C4A96B] flex items-center justify-center shrink-0 rounded-md">
            <span className="text-[#1A2535] text-[9px] font-body tracking-wide">{name.slice(0, 2).toUpperCase()}</span>
          </div>
          <p className="text-sm font-medium tracking-wide text-white font-body">{name}</p>
        </div>
      </div>
    </motion.article>
  );
}
