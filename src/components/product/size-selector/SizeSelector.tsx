import { ValidSize } from "@/interfaces";
import clsx from "clsx";
import React from "react";

interface Props {
  selectedSize?: ValidSize;
  availableSizes: ValidSize[];
  onSizeChanged: (size: ValidSize) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex">
        {availableSizes.map((size) => (
          <button
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
            key={size}
            onClick={() => onSizeChanged(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
