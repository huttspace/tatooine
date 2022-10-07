import { NextPageContext } from "next";
import { getSession } from "src/lib/auth";
import { prisma } from "src/lib/prisma";

const RedirectPage = () => {
  return;
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/auth/login" } };
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
    include: {
      project: {
        include: {
          environments: {
            where: {
              production: true,
            },
          },
        },
      },
    },
  });
  // TODO if not found membership or project, move to create project page
  if (!membership?.project) {
    return { redirect: { permanent: false, destination: "/projects" } };
  }

  const project = membership.project;
  const productionEnvironment = project.environments[0];

  return {
    redirect: { permanent: false, destination: `/${project.id}/plans` },
    // redirect: { permanent: false, destination: `/${project.id}/${productionEnvironment.envKey}/plans` },
  };
}

export default RedirectPage;
