import { forwardRef } from "react";
const Input = forwardRef(function Input(
  { textarea, id, label, ...props },
  ref,
) {
  const classes =
    "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition";
  return (
    <div className="flex flex-col gap-1 my-4">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-800 mb-1"
      >
        {label}
      </label>

      {textarea ? (
        <textarea ref={ref} name={id} id={id} className={classes} {...props} />
      ) : (
        <input ref={ref} name={id} id={id} className={classes} {...props} />
      )}
    </div>
  );
});

export default Input;
