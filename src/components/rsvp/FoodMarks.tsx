import React from 'react';
import { DietType } from '../../utils/rsvpTypes';

interface FoodMarkProps {
  diet: DietType;
  className?: string;
  showLabel?: boolean;
}

/**
 * Official Indian Food Marks:
 * - Veg: green square with green filled circle
 * - Non-veg: red square with red filled triangle / circle
 * - Jain: gold square with lotus / jain indicator
 * - Vegan: emerald square with leaf
 * - Eggetarian: amber square with egg symbol
 */
export const FoodMark: React.FC<FoodMarkProps> = ({ diet, className = 'w-4 h-4', showLabel = false }) => {
  let icon: React.ReactNode = null;
  let label = 'Veg';

  switch (diet) {
    case 'veg':
      label = 'Veg';
      icon = (
        <span
          className={`inline-flex items-center justify-center border-2 border-emerald-600 rounded-[3px] bg-white p-[2px] shrink-0 ${className}`}
          title="Vegetarian"
          aria-label="Vegetarian mark"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
        </span>
      );
      break;

    case 'non-veg':
      label = 'Non-veg';
      icon = (
        <span
          className={`inline-flex items-center justify-center border-2 border-rose-700 rounded-[3px] bg-white p-[2px] shrink-0 ${className}`}
          title="Non-Vegetarian"
          aria-label="Non-vegetarian mark"
        >
          <span
            className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-rose-700 shrink-0"
            style={{ transform: 'translateY(-1px)' }}
          />
        </span>
      );
      break;

    case 'jain':
      label = 'Jain (No Root Veg)';
      icon = (
        <span
          className={`inline-flex items-center justify-center border-2 border-amber-600 rounded-[3px] bg-white p-[2px] shrink-0 ${className}`}
          title="Jain Friendly"
          aria-label="Jain mark"
        >
          <span className="text-[10px] font-bold text-amber-700 leading-none">J</span>
        </span>
      );
      break;

    case 'vegan':
      label = 'Vegan';
      icon = (
        <span
          className={`inline-flex items-center justify-center border-2 border-green-700 rounded-[3px] bg-white p-[2px] shrink-0 ${className}`}
          title="Vegan (Plant-based)"
          aria-label="Vegan mark"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5 text-green-700">
            <path
              d="M3 13 C3 7 7 3 13 3 C13 9 9 13 3 13 Z M3 13 C6 10 9 7 13 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
      break;

    case 'eggetarian':
      label = 'Eggetarian';
      icon = (
        <span
          className={`inline-flex items-center justify-center border-2 border-amber-700 rounded-[3px] bg-white p-[2px] shrink-0 ${className}`}
          title="Eggetarian"
          aria-label="Eggetarian mark"
        >
          <span className="w-1.5 h-2.5 rounded-full bg-amber-600 shrink-0" />
        </span>
      );
      break;
  }

  if (showLabel) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium">
        {icon}
        <span>{label}</span>
      </span>
    );
  }

  return icon;
};

export interface VegNonVegMarkProps {
  type?: DietType;
  diet?: DietType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export const VegNonVegMark: React.FC<VegNonVegMarkProps> = ({
  type,
  diet,
  size = 'md',
  className = '',
  showLabel = false,
}) => {
  const chosenDiet = type || diet || 'veg';
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  return (
    <FoodMark
      diet={chosenDiet}
      className={`${sizeClass} ${className}`}
      showLabel={showLabel}
    />
  );
};
