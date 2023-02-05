import { forwardRef } from "react";

export interface ToggleProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

type Ref = HTMLInputElement;

const Toggle = forwardRef<Ref, ToggleProps>(({ label, ...rest }, ref) => (
  <label className="relative inline-flex items-center mb-5 cursor-pointer">
    <input
      type="checkbox"
      value=""
      className="sr-only peer"
      {...rest}
      ref={ref}
    />
    <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-red-700"></div>
    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
      {label}
    </span>
  </label>
));

export default Toggle;
