import ListProduct from "@/Features/Product/view/ListProduct/ListProduct";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Products management</title>
        <meta name="description" content="Products management software" />
      </Head>
      <main>
        <ListProduct />
      </main>
    </>
  );
};

export default Home;
