"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipboardPen } from "lucide-react";
import { format } from "date-fns";

import Loader from "@/components/ui/loader";
import { formatter } from "@/lib/utils";
import { Item } from "@/lib/types";

export default function TypesPage() {
  const [types, setTypes] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/types/`
        );
        setTypes(response.data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-10 p-6 bg-violet-300">
      <section className="flex flex-col gap-6">
        <header>
          <h2 className="text-2xl font-bold tracking-tight">Mis tipos</h2>
          <p className="text-sm">Listado de tipos de uña creados.</p>
        </header>
        <section className="flex flex-col gap-4">
          {types.map((type: Item) => (
            <article
              key={type.name}
              className="font-medium flex flex-col gap-2 w-full bg-violet-400 p-4 rounded-md"
            >
              <p>
                {type.name}: {formatter.format(type.price)}
              </p>
              <span>
                Última actualización:
                {type.updatedAt && (
                  <span> {format(type.updatedAt, "dd/MM/yyyy")}</span>
                )}
              </span>
              <Link
                href={`/prices/types/${type._id}`}
                className="w-full flex justify-center bg-violet-600 gap-1 text-white rounded-md py-2"
              >
                <ClipboardPen />
                Editar
              </Link>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
