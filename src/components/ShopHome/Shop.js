import "./shop.css";

function RenderProducts({ product }) {
  return (
    <div className="product-container">
      <h3>{product.title}</h3>
      <div className="prd-image">
        <img src={product.imageUrl} alt={product.description} />
      </div>
      <div className="prd-body">
        <div className="prd-price">
          <h4>{product.price} $</h4>
        </div>
        <div className="prd-description">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

const Shop = (props) => {
  const productList = props.products.map((prd, id) => {
    return <RenderProducts product={prd} key={id} />;
  });
  return <div className="home-page-container">{productList}</div>;
};
export default Shop;
