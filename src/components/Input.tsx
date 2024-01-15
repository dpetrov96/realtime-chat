import clsx from 'clsx';
import React, { forwardRef } from 'react';

type InputProps = {
  label: string;
  type?: "text" | "password" | "number";
  error?: string;
};

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...restProps }, ref) => {
  const hasError = Boolean(error);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label
          className="block text-sm font-medium leading-4 text-gray-900"
        >
          {label}
        </label>
  
        {hasError && (
          <small
            className="text-rose-700 font-semibold text-right text-xs"
          >
            {error}
          </small>
        )}
      </div>
  
      <div className="mt-2">
        <input
          ref={ref}
          className={clsx(
            "block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            hasError && "!ring-rose-700 focus:ring-rose-700"
          )}
          {...restProps}
        />
      </div>
    </div>
  )
}
);

export default Input;