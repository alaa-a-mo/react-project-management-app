export default function Button({ children, ...props }) {
  return (
    <button
      className="flex w-full md:max-w-xs items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-150 hover:bg-indigo-500 hover:shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
      {...props}
    >
      <span className="text-lg leading-none">+</span>
      <span>{children}</span>
    </button>
  );
}
