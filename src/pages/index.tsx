import type { NextPageWithLayout } from "next";
import { AppLayout } from "../layouts";

const Home: NextPageWithLayout = () => {
  return <div>hello world</div>;
};

Home.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Home;
