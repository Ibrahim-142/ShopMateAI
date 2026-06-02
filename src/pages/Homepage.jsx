import Card from "../components/Card";

const Homepage = ({ products, loading }) => {
  return (
    <div className="min-h-screen p-6 flex justify-center flex-col">

      {loading && (
        <div className="text-center text-gray-500 mb-4">
          Loading products...
        </div>
      )}

      <div className="grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(250px,250px))]">

        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-60 bg-gray-200 animate-pulse rounded-lg" />
          ))
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <Card key={index} product={product} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No products found
          </p>
        )}

      </div>
    </div>
  );
};

export default Homepage;