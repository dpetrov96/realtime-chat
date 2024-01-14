import React, { forwardRef } from 'react';

type InputProps = {
    label: string;
    error?: string;
};
  
// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...restProps }, ref) => (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label
          className="block text-sm font-medium leading-4 text-gray-900"
        >
          {label}
        </label>

        {Boolean(error) && (
          <small
            className="text-secondary-strawberry font-bold"
          >
            {error}
          </small>
        )}
      </div>

      <div className="mt-2">
        <input
          ref={ref}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...restProps}
        />
      </div>
    </div>
    )
  );
  
  export default Input;