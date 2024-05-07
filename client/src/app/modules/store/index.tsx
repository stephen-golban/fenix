import React, { Suspense, useState } from "react"
import Filter from "../../components/ui/filter"
import { ProductGridItems } from "../../components/ui/product-grid"
import Sort from "../../components/ui/sort"
import db from "../../lib/db.json"
import { useParams } from "react-router-dom"

const CategoriesModule: React.FC = () => {
  const [products, setProducts] = useState(db.products)
const param = useParams()

  const handleCategoryChange = (category: string | null) => {
    if (category === "all") {
      setProducts(db.products)
    } else {
      const filteredProducts = db.products.filter(
        product => product.description === category
      )
      setProducts(filteredProducts)
    }
  }

  const handleSortChange = (option: string) => {
    let sortedProducts = [...products]
    if (option === "Trending") {
      sortedProducts.sort((a, b) => {
        return Math.random() - 0.5
      })
    } else if (option === "Price: Low to high") {
      sortedProducts.sort((a, b) => {
        return (
          Number(a.dimensions_with_price[0].price) -
          Number(b.dimensions_with_price[0].price)
        )
      })
    } else if (option === "Price: High to low") {
      sortedProducts.sort((a, b) => {
        return (
          Number(b.dimensions_with_price[0].price) -
          Number(a.dimensions_with_price[0].price)
        )
      })
    }
    setProducts(sortedProducts)
  }

  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-black">
        <Filter onCategoryChange={handleCategoryChange} />
        <div className="order-last min-h-screen w-full md:order-none">
          <div className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </div>
        </div>
        <Sort onSortChange={handleSortChange} />
      </div>
    </Suspense>
  )
}

export { CategoriesModule }
