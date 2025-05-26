import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";

function Home({ addToCart }) {
  const { slug } = useParams();
  return (
    <div>
      <h1 className="mb-4">Productos {slug && `– ${slug}`}</h1>
      <ProductList addToCart={addToCart} category={slug} />
    </div>
  );
}

export default Home;
