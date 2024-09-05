import { ImageGallery, ProductInfo } from "@/components";
import { Alert, AlertDescription } from "@/components/ui";
import { client } from "@/sanity/lib/client";
import { InfoIcon } from "lucide-react";

async function getData(id: string) {
  const query = `*[_type == "product" && _id == "${id}"][0] {
    ...,
    category-> {
      title
    }
  }`;

  const data = await client.fetch(query, { revalidate: 3600 });
  return data;
}

export default async function ProductPge({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

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
