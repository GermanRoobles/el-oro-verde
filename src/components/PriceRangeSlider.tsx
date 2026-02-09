'use client';

import { useState, useEffect } from 'react';

interface PriceRangeSliderProps {
    min?: number;
    max?: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    step?: number;
}

export default function PriceRangeSlider({
    min = 0,
    max = 200,
    value,
    onChange,
    step = 5,
}: PriceRangeSliderProps) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleMinChange = (newMin: number) => {
        const clampedMin = Math.min(newMin, localValue[1] - step);
        setLocalValue([clampedMin, localValue[1]]);
    };

    const handleMaxChange = (newMax: number) => {
        const clampedMax = Math.max(newMax, localValue[0] + step);
        setLocalValue([localValue[0], clampedMax]);
    };

    const handleMinBlur = () => {
        onChange(localValue);
    };

    const handleMaxBlur = () => {
        onChange(localValue);
    };

    const minPercent = ((localValue[0] - min) / (max - min)) * 100;
    const maxPercent = ((localValue[1] - min) / (max - min)) * 100;

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-[var(--muted)]">Mínimo</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]">€</span>
                        <input
                            type="number"
                            min={min}
                            max={localValue[1]}
                            step={step}
                            value={localValue[0]}
                            onChange={(e) => handleMinChange(Number(e.target.value))}
                            onBlur={handleMinBlur}
                            className="input-pro w-full rounded-lg py-2 pl-7 pr-3 text-sm"
                        />
                    </div>
                </div>
                <div className="mt-5 text-[var(--muted)]">-</div>
                <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-[var(--muted)]">Máximo</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted)]">€</span>
                        <input
                            type="number"
                            min={localValue[0]}
                            max={max}
                            step={step}
                            value={localValue[1]}
                            onChange={(e) => handleMaxChange(Number(e.target.value))}
                            onBlur={handleMaxBlur}
                            className="input-pro w-full rounded-lg py-2 pl-7 pr-3 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Visual slider */}
            <div className="relative h-2">
                {/* Track background */}
                <div className="absolute inset-0 rounded-full bg-[var(--background)]" />

                {/* Active range */}
                <div
                    className="absolute h-full rounded-full bg-[var(--accent)]"
                    style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`,
                    }}
                />

                {/* Min handle */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={localValue[0]}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    onMouseUp={handleMinBlur}
                    onTouchEnd={handleMinBlur}
                    className="range-slider-thumb pointer-events-none absolute inset-0 w-full appearance-none bg-transparent"
                    style={{ zIndex: localValue[0] > max - 20 ? 5 : 3 }}
                />

                {/* Max handle */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={localValue[1]}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    onMouseUp={handleMaxBlur}
                    onTouchEnd={handleMaxBlur}
                    className="range-slider-thumb pointer-events-none absolute inset-0 w-full appearance-none bg-transparent"
                    style={{ zIndex: 4 }}
                />
            </div>

            <style jsx>{`
        .range-slider-thumb::-webkit-slider-thumb {
          appearance: none;
          pointer-events: all;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent);
          border: 3px solid var(--surface);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .range-slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .range-slider-thumb::-webkit-slider-thumb:active {
          transform: scale(1.25);
        }

        .range-slider-thumb::-moz-range-thumb {
          pointer-events: all;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent);
          border: 3px solid var(--surface);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .range-slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.15);
        }

        .range-slider-thumb::-moz-range-thumb:active {
          transform: scale(1.25);
        }
      `}</style>
        </div>
    );
}
