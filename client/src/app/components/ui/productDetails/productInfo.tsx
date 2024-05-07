import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import db from "../../../lib/db.json"

interface ButtonProps {
  title: string
}
interface ProductDetails {
  id: string
  width: number
  length: number
  height: number
  price: number
}

const Button: React.FC<ButtonProps> = ({ title }) => (
  <button
    aria-disabled="false"
    title={title}
    className={`flex min-w-[48px] items-center justify-center rounded-full border dark:text-white bg-neutral-100
    px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 ring-1 ring-transparent `}
  >
    {title}
  </button>
)

const ProductInfo = () => {
  const { id } = useParams<{ id: string }>()
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = db.products.find(product => product.id === id)
        if (product) {
          setProductDetails(product.dimensions_with_price)
        }
      } catch (error) {
        console.error("Error fetching product images:", error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div className="basis-full lg:basis-2/6">
      <div className="mb-12 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-6 text-5xl font-medium dark:text-white">
          Acme Baby Onesie
        </h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <p>
            $10.00<span className="ml-1 inline">USD</span>
          </p>
        </div>
      </div>
      <dl className="mb-12">
        <dt className="mb-4 text-sm uppercase tracking-wide dark:text-white">
          Size
        </dt>
        <dd className="flex flex-wrap gap-3">
          {["NB", "3M", "6M", "12M", "18M", "24M"].map(size => (
            <Button key={size} title={size} />
          ))}
        </dd>
      </dl>
      <dl className="mb-12">
        <dt className="mb-4 text-sm uppercase tracking-wide  dark:text-white">
          Color
        </dt>
        <dd className="flex flex-wrap gap-3">
          {["Black", "White", "Beige"].map(color => (
            <Button key={color} title={color} />
          ))}
        </dd>
      </dl>

      <dl className="mb-12">
        <dt className="mb-4 text-sm uppercase tracking-wide  dark:text-white">
          Cod Articol: 0001
        </dt>
      </dl>
    </div>
  )
}

export default ProductInfo
