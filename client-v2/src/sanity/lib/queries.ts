import { defineQuery } from "next-sanity";

export const categoriesQuery = (
  searchParams?: any,
  limit = 100,
  sort: "recent" | "asc" = "recent"
) => {
  let categoryQuery = `*[_type == "category"]`;

  if (searchParams?.name) {
    categoryQuery += ` [title match "${searchParams.name}*"]`;
  }

  if (sort === "recent") {
    categoryQuery += ` | order(_createdAt desc)`;
  } else if (sort === "asc") {
    categoryQuery += ` | order(title asc)`;
  }

  categoryQuery += ` [${searchParams?.page ? parseInt(searchParams.page) * limit : 0}...${
    searchParams?.page ? (parseInt(searchParams.page) + 1) * limit : limit
  }] {
    _id,
    "slug": slug.current,
    title,
    image,
  }`;

  return defineQuery(categoryQuery);
};

export const categoriesCountQuery = (searchParams?: any) => {
  return defineQuery(
    searchParams?.name
      ? `count(*[_type == "category" && title match "${searchParams.name}*"])`
      : `count(*[_type == "category"])`
  );
};

export const featuredProductsQuery = defineQuery(`
  *[_type == "product"] | order(_createdAt desc) [0...12] {
    _id,
    title,
    mainPhoto
  }
`);

export const productByIdQuery = defineQuery(`
  *[_type == "product" && _id == $id][0] {
    ...,
    _id,
    category-> {
      title
    }
  }
`);

export const productsQuery = (
  categoryId = "",
  limit = 8,
  searchParams?: any
) => {
  const sortOrder = (() => {
    switch (searchParams?.sort) {
      case "asc price":
        return "| order(dimensions_with_price[0].price asc)";
      case "desc price":
        return "| order(dimensions_with_price[0].price desc)";
      case "asc lastUpdated":
        return "| order(productCode asc)";
      case "desc lastUpdated":
        return "| order(productCode desc)";
      default:
        return ""; // No valid sort option; ignore the sort
    }
  })();

  const availabilityFilter = (() => {
    switch (searchParams?.availability) {
      case "inStock":
        return "&& availableOnDemand == true";
      case "outOfStock":
        return "&& availableOnDemand == false";
      default:
        return ""; // No availability filter
    }
  })();

  const nameFilter = searchParams?.name
    ? `&& title match "${searchParams.name}*"`
    : "";

  const paginationParams = {
    start: searchParams?.page ? parseInt(searchParams.page) * limit : 0,
    end: limit,
  };

  const query = `*[_type == "product" ${
    categoryId
      ? `&& references(*[_type=="category" && _id == $categoryId]._id)`
      : ""
  } ${availabilityFilter} ${nameFilter}]{
      _id,
      title,
      mainPhoto,
      availableOnDemand,
      description,
      category -> {
        title
      },
      dimensions_with_price,
      productCode
    } ${sortOrder} [${paginationParams.start}...${paginationParams.start + paginationParams.end}]`;

  return defineQuery(query);
};
