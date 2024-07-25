import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { BsGithub, BsLink } from "react-icons/bs";

export default function ProjectPage() {
  const { projectSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/project/getprojects?slug=${projectSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setProject(data.projects[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  console.log("link= " + project.projectLink);
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {project && project.title}
      </h1>
      <Link
        to={`/search?category=${project && project.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {project && project.category}
        </Button>
      </Link>
      <img
        src={project && project.image}
        alt={project && project.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <Button
          gradientDuoTone="tealToLime"
          className="rounded-tl-xl rounded-bl-none"
        >
          <div className="flex justify-between ">
            <BsLink className=" size-5 my-2 mr-2" />
            <a
              //href="https://www.100jsprojects.com"
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="my-2"
            >
              Go to project
            </a>
          </div>
        </Button>

        <Button
          gradientDuoTone="tealToLime"
          className="rounded-tl-xl rounded-bl-none "
        >
          <div className="flex justify-between ">
            <BsGithub className="size-4 my-2 mr-2" />
            <a
              //href="https://www.100jsprojects.com"

              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="my-2"
            >
              Go to Code
            </a>
          </div>
        </Button>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full project-content"
        dangerouslySetInnerHTML={{ __html: project && project.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
    </main>
  );
}
