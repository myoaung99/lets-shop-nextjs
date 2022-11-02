import HomePage from "../components/LV3/HomePage";
import data from "../utils/data";

export default function Home(props) {
  return <HomePage products={props.products} />;
}

export async function getStaticProps(context) {
  return {
    props: {
      products: data.products,
    },
    revalidate: 1,
  };
}
