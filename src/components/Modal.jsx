import { createPortal } from "react-dom";
import { useRef, forwardRef, useImperativeHandle } from "react";

// Wrap the entire component function with forwardRef()
const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="w-[calc(100%-2rem)] max-w-lg rounded-2xl border-0 bg-white p-0 shadow-2xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm focus:outline-none sm:w-full"
    >
      <div className="relative max-h-[90vh] overflow-y-auto p-5 sm:p-7">
        <button
          type="button"
          onClick={() => dialog.current.close()}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          aria-label="Close modal"
        >
          &times;
        </button>

        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root"),
  );
});

export default Modal;
