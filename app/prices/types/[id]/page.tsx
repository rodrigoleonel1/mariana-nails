"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import TypeForm from "./components/type-form";
import Loader from "@/components/ui/loader";
import { Item } from "@/lib/types";

export default function TypesPage({ params }: { params: { id: string } }) {
  const [type, setType] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/types/${params.id}`
        );
        setType(response.data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <Loader />;

  return (
    <main className="mx-auto max-w-3xl flex flex-col gap-10 p-6 bg-violet-300">
      <section className="flex flex-col gap-6">
        <header>
          <h2 className="text-2xl font-bold tracking-tight">{type?.name}</h2>
          <p className="text-sm">Puedes actualizar el precio.</p>
        </header>
        {type && <TypeForm type={type} />}
      </section>
    </main>
  );
}
