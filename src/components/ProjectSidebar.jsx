import Button from "./Button";
import { useState } from "react";

export default function SideBar({
  onAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleOpenMenu() {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  }

  function handleClick(projectId) {
    setIsMenuOpen(false);
    onSelectProject(projectId);
  }
  function handleAddProject() {
    setIsMenuOpen(false);
    onAddProject();
  }
  return (
    <>
      <button
        className={`fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-800 hover:text-white md:hidden ${isMenuOpen ? "bg-slate-800 text-white" : ""}`}
        onClick={handleOpenMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 sm:w-72 flex-col rounded-r-xl bg-slate-900 px-4 py-8 shadow-xl transition-transform duration-300 ease-in-out md:static md:z-auto md:w-72 md:translate-x-0 md:rounded-r-xl md:px-8 md:py-16 md:shadow-none ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="mb-7 font-bold uppercase tracking-wider text-slate-400 md:text-xl">
          Your Projects
        </h2>

        <Button type="button" onClick={handleAddProject}>
          Add Project
        </Button>

        <ul className="mt-7 flex flex-col gap-2 overflow-y-auto">
          {projects.map((project) => {
            let cssClasses =
              "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium bg-slate-800 text-white hover:text-slate-200 hover:bg-slate-800/50 transition-colors";

            if (project.id === selectedProjectId) {
              cssClasses += " bg-indigo-600 text-white";
            } else {
              cssClasses += " bg-transparent text-slate-400";
            }

            return (
              <li key={project.id}>
                <button
                  onClick={() => handleClick(project.id)}
                  className={cssClasses}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-400" />
                  <span className="truncate">{project.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
