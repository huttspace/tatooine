import { NextPageContext } from "next";
import { getSession } from "src/lib/auth";
import { prisma } from "src/lib/prisma";

const RedirectPage = () => {
  return;
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session?.user);
  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/auth/login" } };
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
    include: { project: true },
  });
  // TODO if not found membership or project, move to create project page
  // if (!membership.project) {}

  const project = membership?.project;

  return {
    redirect: { permanent: false, destination: `/${project?.id ?? ""}/plans` },
  };
}

export default RedirectPage;
