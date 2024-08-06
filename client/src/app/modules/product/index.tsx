import React from "react";
import { RootLayout } from "../../components/layout";
import { useParams } from "react-router-dom";
import useAxiosRequest from "../../api/hooks";
import { Product } from "../../typings";
import { useMount } from "react-use";
import { ProductImage, ProductInfo, ProductRelated } from "../../components/ui";
import { isEmpty } from "lodash";

const ProductModule = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = React.useState<Product>();
  const [products, setProducts] = React.useState<Product[]>([]);

  const [call, { loading: loadingProduct }] = useAxiosRequest<Product>(
    `/product/${id}`,
    "get"
  );
  const [callProducts, { loading: loadingProducts }] = useAxiosRequest<
    Product[]
  >("/product", "get");

  useMount(async () => {
    try {
      const [productResponse, productsResponse] = await Promise.all([
        call(),
        callProducts(),
      ]);
      if (productResponse) {
        setProduct(productResponse);
      }
      if (productsResponse) {
        setProducts(productsResponse);
      }
    } catch (error) {
      console.error("Failed to load products or product:", error);
    }
  });

  const loading = loadingProducts || loadingProduct;

  return (
    <RootLayout loading={loading || !product}>
      <div className="container mx-auto">
        <div className="flex flex-col md:p-12 lg:flex-row lg:gap-8">
          <ProductImage data={product?.photos || []} />
          <ProductInfo {...(product || ({} as Product))} />
        </div>
        <p className="mb-8">
          <b>Livrare</b>
          <br />
          <i>
            • Livrare GRATUITĂ în Chișinău şi Suburbii <br />• Livrarea se
            efectuează în toată MOLDOVA <br />• Achitarea la primirea produsului
            <br />
          </i>
          <b>Garanție</b>
          <br />
          <i>
            • Oferim garanție la toate produsele conform legislației în vigoare{" "}
            <br />• Toate produsele se verifică de către Dumneavoastră împreună
            cu expeditorul companiei Fenix.md <br />
          </i>
          <b>ATENȚIE</b> <br />
          <i>
            • Disponibilitatea, prețul şi caracteristicile produsului este
            necesar să le verificați la consultanții companiei Fenix.md sau
            apelați 068 89 89 00. <br />• În legătură cu cursul valutar
            oscilant, vă rugăm sa precizați la consultant prețul și
            disponibilitatea produsului în limita stocului. <br />• În oferta de
            CREDITARE și achitarea creditului este efectuată conform
            contractului şi poate fi efectuată cu CARDUL sau la oricare BANCĂ
            sau oficiu POȘTAL nu se includ toate produsele • Pentru
            înregistrarea comenzi apelați 068 89 89 00 sau scrieți un mesaj pe
            Facebook/Mesinger: Fenix.md sau Instagram: fenixshop.md cu indicarea
            COD PRODUS
          </i>
        </p>
        {!isEmpty(products) && (
          <ProductRelated
            products={products}
            categoryId={product?.categoryId || ""}
          />
        )}
      </div>
    </RootLayout>
  );
};

export default ProductModule;
