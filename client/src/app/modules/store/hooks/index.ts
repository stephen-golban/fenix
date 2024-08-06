import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Category, Product, ProductsApiResponse } from "../../../typings";
import useAxiosRequest from "../../../api/hooks";

function useStoreModule() {
  const { id: categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [callProducts] = useAxiosRequest<ProductsApiResponse>(
    "/product",
    "get"
  );
  const [getCategories] = useAxiosRequest<Category[]>("/categories", "get");

  const fetchProducts = useCallback(
    async (pageNumber: number) => {
      setLoading(true);
      try {
        const response = await callProducts({
          params: { page: pageNumber, limit: 20 },
        });
        if (response) {
          const newProducts = response.data;
          setProducts((prev) =>
            pageNumber === 1 ? newProducts : [...prev, ...newProducts]
          );
          setFilteredProducts((prev) =>
            pageNumber === 1 ? newProducts : [...prev, ...newProducts]
          );
          setHasMore(newProducts.length > 0);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    },
    [callProducts]
  );

  const fetchMoreProducts = useCallback(async () => {
    setLoadingMore(true);
    try {
      const response = await callProducts({
        params: { page: page + 1, limit: 20 },
      });
      if (response) {
        const newProducts = response.data;
        setProducts((prev) => [...prev, ...newProducts]);
        setFilteredProducts((prev) => [...prev, ...newProducts]);
        setHasMore(newProducts.length > 0);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [callProducts, page]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getCategories();
      if (response) {
        setCategories(response);
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  }, [getCategories]);

  useEffect(() => {
    fetchCategories();
    fetchProducts(1);
  }, [fetchCategories, fetchProducts]);

  useEffect(() => {
    const applyFiltersAndSort = () => {
      let filtered = products;

      // Filter by category
      if (categoryId && categoryId !== "Toate") {
        filtered = filtered.filter(
          (product) => product.categoryId === categoryId
        );
      }

      // Filter by query
      const query = searchParams.get("q");
      if (query) {
        const lowerQuery = query.toLowerCase();
        filtered = filtered.filter((product) => {
          const lowerTitle = product.title.toLowerCase();
          const matchesTitle = lowerTitle.includes(lowerQuery);
          const matchesDimensionId = product.dimensions_with_price.some((dim) =>
            dim.id.toLowerCase().includes(lowerQuery)
          );
          return (
            matchesTitle ||
            matchesDimensionId ||
            product.id.includes(lowerQuery)
          );
        });
      }

      // Sort the products
      if (sortOption) {
        filtered = sortProducts(filtered, sortOption);
      }

      setFilteredProducts(filtered);
    };

    applyFiltersAndSort();
  }, [searchParams, products, categoryId, sortOption]);

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      if (category === "Toate" || !category) {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(
          (product) => product.categoryId === category
        );
        setFilteredProducts(filtered);
      }
      if (sortOption) {
        setFilteredProducts((prev) => sortProducts(prev, sortOption));
      }
    },
    [products, sortOption]
  );

  const handleSortChange = useCallback((option: string) => {
    setSortOption(option);
    setFilteredProducts((prev) => sortProducts(prev, option));
  }, []);

  const sortProducts = (productsToSort: Product[], option: string) => {
    let sortedProducts = [...productsToSort];

    if (option === "Preț: De la mic la mare") {
      sortedProducts.sort(
        (a, b) =>
          Number(a.dimensions_with_price[0].price) -
          Number(b.dimensions_with_price[0].price)
      );
    } else if (option === "Preț: De la mare la mic") {
      sortedProducts.sort(
        (a, b) =>
          Number(b.dimensions_with_price[0].price) -
          Number(a.dimensions_with_price[0].price)
      );
    }
    return sortedProducts;
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchMoreProducts();
    }
  };

  return {
    handleSortChange,
    handleCategoryChange,
    loading,
    loadingMore,
    categories,
    products: filteredProducts,
    loadMore,
    hasMore,
  };
}

export default useStoreModule;
