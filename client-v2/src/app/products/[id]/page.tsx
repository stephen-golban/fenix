import { sanityFetch } from "@/sanity/lib/fetch";
import { productByIdQuery } from "@/sanity/lib/queries";

import { InfoIcon } from "lucide-react";
import { ImageGallery, ProductInfo } from "@/components";
import { Alert, AlertDescription } from "@/components/ui";

export default async function ProductPge({
  params,
}: {
  params: { id: string };
}) {
  const data = await sanityFetch({
    query: productByIdQuery,
    params: { id: params.id },
  });

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <Alert variant="default" className="max-w-md">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Produsul nu a fost găsit. Vă rugăm să verificați URL-ul sau să
            încercați un alt produs.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <ImageGallery images={data.photos} />

        <ProductInfo data={data} />
      </div>
    </div>
  );
}
