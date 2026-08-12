import Button from "./Button.jsx";
import noProjectsImg from "../assets/no-projects.png";
export default function NoProjectSelected({ onAddProject }) {
  return (
    <div className="flex flex-col text-center w-full items-center justify-center">
      <img
        src={noProjectsImg}
        alt="An empty tasklist"
        className="mb-6 h-20 w-20 object-contain sm:h-24 sm:w-24"
      />

      <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
        No Project Selected
      </h2>

      <p className="mb-7 mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
        Select a project from the sidebar or get started by creating a new
        project.
      </p>
      <Button onClick={onAddProject}>Create New Project</Button>
    </div>
  );
}
