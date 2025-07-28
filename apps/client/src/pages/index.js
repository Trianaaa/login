import ListEmployee from "@/Features/Employee/view/ListEmployee";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Employee management</title>
        <meta name="description" content="Employee management software" />
      </Head>
      <main>
        <ListEmployee />
      </main>
    </>
  );
};

export default Home;
