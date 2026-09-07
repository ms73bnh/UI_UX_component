'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const RatingPreview: React.FC = () => {
  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const activeStars = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-gray-800 gap-6 min-h-[380px]">
      <div className="flex flex-col items-center text-center gap-1">
        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold mb-1">
          SELECT-10 • Rating & Star Picker
        </span>
        <h3 className="text-white font-bold text-lg">별점 평점 피커</h3>
        <p className="text-gray-400 text-xs">호버 반응 및 클릭 선택이 인터랙션되는 별점 피커</p>
      </div>

      <div className="w-full max-w-sm bg-slate-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-4">
        {/* Star Rating Icons */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((starIndex) => {
            const isFilled = starIndex <= activeStars;
            return (
              <button
                key={starIndex}
                onMouseEnter={() => setHoverRating(starIndex)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => setRating(starIndex)}
                className="p-1 text-3xl transition-transform hover:scale-125 cursor-pointer"
              >
                <Star
                  className={`w-9 h-9 transition-colors ${
                    isFilled ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'text-gray-700'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="text-center mt-1">
          <span className="text-2xl font-mono font-extrabold text-amber-400">{rating}.0 / 5.0</span>
          <p className="text-xs text-gray-400 mt-1">
            {rating === 5 ? '최고예요! 완벽한 평가' : rating >= 4 ? '좋아요! 만족스러운 기능' : '보통이에요'}
          </p>
        </div>
      </div>
    </div>
  );
};
