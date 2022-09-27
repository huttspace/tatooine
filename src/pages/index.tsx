import { Button } from "@chakra-ui/react";
import type { NextPageWithLayout } from "next";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { AppLayout } from "src/layouts/";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      hello world<Link href='/auth/login'>signin</Link>
      <Button onClick={async () => await signOut()}>sign out</Button>
    </div>
  );
};

Home.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Home;
