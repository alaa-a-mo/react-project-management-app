import { useState, useRef } from "react";
import Button from "./Button";
import Modal from "./Modal";

export default function SelectedProject({
  selectedProject,
  onAddTask,
  onDeleteTask,
  onDeleteProject,
}) {
  const modal = useRef();
  const [enteredTask, setEnteredTask] = useState("");
  function handleSubmitTask() {
    if (enteredTask.trim() === "") {
      modal.current.open();
      return;
    }
    onAddTask(enteredTask);
    setEnteredTask("");
  }
  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-lg font-bold">Invalid Inputs</h2>
        <p className="text-sm text-slate-400 mt-2">
          Please fill out the task field
        </p>
      </Modal>
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl mb-1">
              {selectedProject.title}
            </h1>

            <span className="text-xs md:text-sm text-slate-400">
              {selectedProject.dueDate}
            </span>
          </div>

          <button
            onClick={() => onDeleteProject(selectedProject.id)}
            className="self-start rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-7">
        <p className="text-base leading-7 text-slate-600 whitespace-pre-wrap">
          {selectedProject.description}
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-slate-800">Tasks</h2>

          <p className="text-sm text-slate-400">
            Manage the tasks for this project.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={enteredTask}
            onChange={(e) => setEnteredTask(e.target.value)}
            type="text"
            placeholder="Add a new task..."
            className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <Button type="button" onClick={handleSubmitTask}>
            Add Task
          </Button>
        </div>
        {selectedProject.tasks?.length > 0 ? (
          <ul className="mt-6 space-y-2">
            {selectedProject.tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/40"
              >
                <div className="flex min-w-0 items-center">
                  <span className="mr-3 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                  <span className="break-words">{task.title}</span>
                </div>

                <button
                  onClick={() => onDeleteTask(task.id, selectedProject.id)}
                  type="button"
                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
            <p className="text-sm text-slate-400">No tasks added yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
