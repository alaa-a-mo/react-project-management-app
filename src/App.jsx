import { useState } from "react";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
function App() {
  const initialProjects = [
    {
      id: 1,
      title: "Build Portfolio Website",
      description:
        "Create a responsive portfolio website to showcase my frontend projects and skills.",
      dueDate: "2026-08-20",
      tasks: [
        {
          id: 1,
          title: "Design the homepage",
        },
        {
          id: 2,
          title: "Add project cards",
        },
        {
          id: 3,
          title: "Make the layout responsive",
        },
      ],
    },
    {
      id: 2,
      title: "React Learning",
      description:
        "Complete the advanced React concepts and practice building applications.",
      dueDate: "2026-08-25",
      tasks: [
        {
          id: 1,
          title: "Finish state management section",
        },
        {
          id: 2,
          title: "Practice refs and portals",
        },
      ],
    },
    {
      id: 3,
      title: "Job Search Dashboard",
      description:
        "Create a small dashboard to organize job applications and track their progress.",
      dueDate: "2026-09-01",
      tasks: [
        {
          id: 1,
          title: "Create application form",
        },
        {
          id: 2,
          title: "Add application status",
        },
      ],
    },
  ];
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: initialProjects,
  });
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId,
  );

  let content;

  function handleAddNewProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  function handleAddProjectData(newProjectData) {
    setProjectsState((prevState) => {
      const newProjectId = crypto.randomUUID();
      return {
        ...prevState,
        projects: [
          ...prevState.projects,
          {
            id: newProjectId,
            title: newProjectData.title,
            description: newProjectData.description,
            dueDate: newProjectData.date,
          },
        ],
        selectedProjectId: newProjectId,
      };
    });
  }
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  function handleSelectProject(projectId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
      };
    });
  }
  function handleProjectDelete(projectId) {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== projectId,
      ),
    }));
  }
  function handleAddTask(taskText) {
    if (taskText.trim() !== "") {
      setProjectsState((prevState) => {
        const newTask = {
          id: crypto.randomUUID(),
          title: taskText,
        };

        return {
          ...prevState,
          projects: prevState.projects.map((project) => {
            if (project.id === prevState.selectedProjectId) {
              return {
                ...project,
                tasks: [newTask, ...(project.tasks || [])],
              };
            }
            return project;
          }),
        };
      });
    } else {
      return alert("Please add a task first");
    }
  }

  function handleDeleteTask(taskId, selectedProjectId) {
    setProjectsState((prevState) => {
      const updatedTasks = prevState.projects
        .find((project) => project.id === prevState.selectedProjectId)
        .tasks.filter((task) => task.id !== taskId);

      return {
        ...prevState,
        projects: prevState.projects.map((project) => {
          if (project.id === selectedProjectId) {
            return {
              ...project,
              tasks: updatedTasks,
            };
          }
          return project;
        }),
      };
    });
  }

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onCancel={handleCancelAddProject}
        onAdd={handleAddProjectData}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddNewProject} />;
  } else {
    content = (
      <SelectedProject
        selectedProject={selectedProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onDeleteProject={handleProjectDelete}
      />
    );
  }
  return (
    <main className="flex h-screen py-8">
      <ProjectSidebar
        onAddProject={handleAddNewProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      <div className="w-full md:w-2/3 px-4 py-8 md:px-8 md:py-16 max-w-4xl">
        {content}
      </div>
    </main>
  );
}

export default App;
