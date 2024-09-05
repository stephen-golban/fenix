"use client";

import React from "react";
import { PortableText } from "next-sanity";
import InfoTable from "./info-table";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import Link from "next/link";
import { Truck, ShieldCheck, AlertTriangle } from "lucide-react";

const ProductInfo: React.FC<{ data: any }> = ({ data }) => {
  console.log(data);
  return (
    <Card className="basis-full lg:basis-3/6 text-font p-4 lg:p-8">
      <CardHeader className="mb-6 flex flex-col border-b pb-6">
        <CardTitle className="text-2xl md:text-3xl lg:text-5xl font-medium">
          {data.title}
        </CardTitle>
        <dt className="flex flex-wrap gap-3 text-sm tracking-wide items-center mt-2">
          <b className="uppercase">Cod produs:</b>
          <Badge variant="destructive" className="text-xs font-bold">
            #{data.productCode}
          </Badge>
        </dt>
      </CardHeader>

      <CardContent>
        <dl className="mb-6">
          <dt className="mb-4 text-sm tracking-wide">
            <b className="uppercase">Culori:</b>
            <div className="flex flex-row items-center mt-2 gap-2">
              {data.colors.map((item: any) => (
                <div
                  key={item}
                  className="w-7 h-7 rounded"
                  style={{ backgroundColor: item.hex }}
                />
              ))}
            </div>
          </dt>

          <dt className="flex flex-wrap gap-3 mb-4 text-sm tracking-wide items-center">
            <b className="uppercase">Disponibilitate:</b>
            {data.availableOnDemand ? (
              <Badge variant="default">Disponibil</Badge>
            ) : (
              <Badge variant="destructive">Nu este disponibil</Badge>
            )}
          </dt>

          <dt className="mb-4 text-sm tracking-wide">
            <b className="uppercase">Categorie:</b>{" "}
            <Link
              href={`/categories/${data.categoryId}`}
              className="font-semibold ml-2 underline hover:text-primary"
            >
              {data.category.title}
            </Link>
          </dt>

          <dt className="flex flex-wrap gap-3 mb-4 text-sm tracking-wide items-center">
            <b className="uppercase">Tip material:</b>
            <p className="font-semibold">{data.material_type}</p>
          </dt>

          <InfoTable data={data.dimensions_with_price} />

          <Separator className="my-6" />

          <div className="rounded-full p-2 pl-0 text-sm mt-6">
            <PortableText value={data.description} />
          </div>

          <Separator className="my-6" />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="delivery">
              <AccordionTrigger className="flex justify-between hover:no-underline">
                <div className="flex items-center">
                  <Truck className="mr-2" />
                  <span>Livrare</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5">
                  <li>Livrare GRATUITĂ în Chișinău şi Suburbii</li>
                  <li>Livrarea se efectuează în toată MOLDOVA</li>
                  <li>Achitarea la primirea produsului</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranty">
              <AccordionTrigger className="flex justify-between hover:no-underline">
                <div className="flex items-center">
                  <ShieldCheck className="mr-2" />
                  <span>Garanție</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5">
                  <li>
                    Oferim garanție la toate produsele conform legislației în
                    vigoare
                  </li>
                  <li>
                    Toate produsele se verifică de către Dumneavoastră împreună
                    cu expeditorul companiei Fenix.md
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="attention">
              <AccordionTrigger className="flex justify-between hover:no-underline">
                <div className="flex items-center">
                  <AlertTriangle className="mr-2" />
                  <span>ATENȚIE</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5">
                  <li>
                    Disponibilitatea, prețul şi caracteristicile produsului este
                    necesar să le verificați la consultanții companiei Fenix.md
                    sau apelați 068 89 89 00.
                  </li>
                  <li>
                    În legătură cu cursul valutar oscilant, vă rugăm sa
                    precizați la consultant prețul și disponibilitatea
                    produsului în limita stocului.
                  </li>
                  <li>
                    În oferta de CREDITARE și achitarea creditului este
                    efectuată conform contractului şi poate fi efectuată cu
                    CARDUL sau la oricare BANCĂ sau oficiu POȘTAL nu se includ
                    toate produsele
                  </li>
                  <li>
                    Pentru înregistrarea comenzi apelați 068 89 89 00 sau
                    scrieți un mesaj pe Facebook/Mesinger: Fenix.md sau
                    Instagram: fenixshop.md cu indicarea COD PRODUS
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </dl>
      </CardContent>
    </Card>
  );
};

export default ProductInfo;
