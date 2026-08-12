import Input from "./Input";
import { useRef, useState } from "react";
import Modal from "./Modal";
export default function NewProject({ onCancel, onAdd }) {
  const inputsData = useRef({});
  const modal = useRef();
  function handleSubmit() {
    if (
      inputsData.current.title.value.trim() === "" ||
      inputsData.current.description.value.trim() === "" ||
      inputsData.current.date.value.trim() === ""
    ) {
      modal.current.open(); // This will work perfectly now!
      return;
    }

    const newProjectData = {
      title: inputsData.current.title.value,
      description: inputsData.current.description.value,
      date: inputsData.current.date.value,
    };

    onAdd(newProjectData);
  }

  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-lg font-bold">Invalid Inputs</h2>
        <p className="text-sm text-slate-400 mt-2">
          Please fill out all the fields
        </p>
      </Modal>
      <>
        <menu className="flex items-center gap-4 justify-end mb-4 md:mb-8">
          <li>
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              onClick={handleSubmit}
            >
              Save
            </button>
          </li>
        </menu>

        <div className="flex flex-col gap-2">
          <Input
            ref={(el) => (inputsData.current.title = el)}
            id="title"
            label="Title"
            type="text"
          />
          <Input
            ref={(el) => (inputsData.current.description = el)}
            textarea
            id="description"
            label="Description"
          />
          <Input
            ref={(el) => (inputsData.current.date = el)}
            id="date"
            label="Due Date"
            type="date"
          />
        </div>
      </>
    </>
  );
}
