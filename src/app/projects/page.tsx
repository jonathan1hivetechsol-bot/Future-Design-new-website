import Projects from "@/components/Projects";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Future Designz",
  description: "Our completed projects showcasing premium tiles and bathroom fixtures.",
};

const ProjectsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Our Projects"
        description="Explore our collection of completed projects showcasing premium tile installations and design work."
      />
      <Projects mode="full" />
    </>
  );
};

export default ProjectsPage;
