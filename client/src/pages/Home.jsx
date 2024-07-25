import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/project/getProjects");
      const data = await res.json();
      setProjects(data.projects);
    };
    fetchProjects();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to my Projects Page
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of projects, feel free to discover my
          latest projects as a Full-Stack MERN Developer.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {projects && projects.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              Recent Projects
            </h2>
            <div className="flex flex-wrap gap-4">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all projects
            </Link>
          </div>
        )}
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
    </div>
  );
}
