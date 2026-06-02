import { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../contexts/SearchContext/useSearch";

export const useGlobalProducts = () => {
  const { query } = useSearch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url = query
          ? `/api/products/search?q=${query}`
          : `/api/products`;

        const res = await axios.get(url);

        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return { products, loading };
};