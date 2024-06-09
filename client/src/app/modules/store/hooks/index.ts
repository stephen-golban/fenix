import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Category, Product } from "../../../typings";
import useAxiosRequest from "../../../api/hooks";
import { useMount } from "react-use";

function useStoreModule() {
  const { id: categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string | null>(null);

  const [callProducts, { loading: loadingProducts }] = useAxiosRequest<
    Product[]
  >("/product", "get");
  const [getCategories, { loading: loadingCategories }] = useAxiosRequest<
    Category[]
  >("/categories", "get");

  const refetch = async () => {
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        callProducts(),
        getCategories(),
      ]);
      if (productResponse) {
        setProducts(productResponse);
        setFilteredProducts(productResponse);
      }
      if (categoryResponse) {
        setCategories(categoryResponse);
      }
    } catch (error) {
      console.error("Failed to load products or categories:", error);
    }
  };

  useMount(refetch);

  const loading = loadingProducts || loadingCategories;

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
        return matchesTitle || matchesDimensionId;
      });
    }

    // Sort the products
    if (sortOption) {
      filtered = sortProducts(filtered, sortOption);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFiltersAndSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, products, categoryId, sortOption]);

  const handleCategoryChange = (category: string | null) => {
    if (category === "Toate" || !category) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.categoryId === category
      );
      setFilteredProducts(filtered);
    }
    if (sortOption) {
      setFilteredProducts((prevFilteredProducts) =>
        sortProducts(prevFilteredProducts, sortOption)
      );
    }
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setFilteredProducts((prevFilteredProducts) =>
      sortProducts(prevFilteredProducts, option)
    );
  };

  const sortProducts = (productsToSort: Product[], option: string) => {
    let sortedProducts = [...productsToSort];

    if (option === "Preț: De la mic la mare") {
      sortedProducts.sort((a, b) => {
        return (
          Number(a.dimensions_with_price[0].price) -
          Number(b.dimensions_with_price[0].price)
        );
      });
    } else if (option === "Preț: De la mare la mic") {
      sortedProducts.sort((a, b) => {
        return (
          Number(b.dimensions_with_price[0].price) -
          Number(a.dimensions_with_price[0].price)
        );
      });
    }
    return sortedProducts;
  };

  return {
    handleSortChange,
    handleCategoryChange,
    loading,
    categories,
    products: filteredProducts,
  };
}

export default useStoreModule;
