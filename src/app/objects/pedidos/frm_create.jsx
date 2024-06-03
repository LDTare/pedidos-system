"use client";
import { set, z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Formulario_Creacion() {
  const params = useParams();
  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const validationSchema = z.object({
    nombre: z.string().min(1, {
      message: "El nombre del cliente es requerido",
    }),
    contenido: z
      .array(
        z.object({
          cantidad: z.coerce.number(),
          producto: z
            .string()
            .min(1, { message: "Por favor ingrese un producto" }),
        })
      )
      .nonempty({ message: "Por favor llene todos los campos" }),
  });

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      nombre: "",
      contenido: [],
    },
  });

  useEffect(() => {
    if (params.id) {
      fetch(`/api/pedidos/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          form.reset(data);
          setContenido(data.contenido.map((item) => item.subtotal));
          setTotal(data.total);
        });
    }
  }, [params.id]);

  const { fields, append, remove } = useFieldArray({
    name: "contenido",
    control: form.control,
  });

  async function onSubmit(data) {
    console.log(data);

    if (!params.id) {
      const promisePedido = fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sucursalId: id,
          nombre: data.nombre,
          estado: "Pendiente",
        }),
      });

      toast.promise(
        promisePedido,
        {
          loading: "Registrando pedido",
          success: "Se ha registrado el pedido",
          error: "Ocurrio un error al registrar el pedido",
        }
      );

      const res = await promisePedido;

      const msg_server = await res.json();

      data.contenido = data.contenido.map((item) => ({
        ...item,
        pedidoId: msg_server.id,
      }));

      const promiseContenido = fetch("/api/contenido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.contenido),
      });

      toast.promise(
        promiseContenido,
        {
          loading: "Registrando contenido",
          success: "Se ha registrado el contenido",
          error: "Ocurrio un error al registrar el contenido",
        }
      );

      const res2 = await promiseContenido;

      if (res.ok && res2.ok) {
        toast.info("Se ha registrado el pedido exitosamente");
        router.refresh();
        form.reset();
      } else {
        toast.error("Ocurrio un error al registrar el pedido");
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 max-w-2xl p-5 border rounded-md border-slate-400"
        >
          <h1 className="text-3xl font-bold text-center my-5">
            Actualizacion de pedidos
          </h1>

          <div className="w-full py-2 border-b border-b-slate-400">
            <Button
              type="reset"
              className="!mt-0"
              onClick={() => {
                // Redirect to the main page of the system
                router.refresh();
                router.back();
                form.reset();
              }}
            >
              Regresar al inicio
            </Button>
          </div>

          <div className="border rounded-md p-5 my-5 border-slate-400">
            <div className="relative name py-5">
              <FormField
                name="nombre"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Nombre del cliente
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el nombre del cliente"
                        type="text"
                        className="mt-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative contenido">
              {fields.map((_, index) => {
                return (
                  <div key={index}>
                    <div className="flex gap-x-5 my-5">
                      <FormField
                        control={form.control}
                        key={index}
                        name={`contenido.${index}.cantidad`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        key={index + 1}
                        name={`contenido.${index}.producto`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Producto</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        key={index + 4}
                        name={`products.${index}.file`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Acciones</FormLabel>
                            <FormControl>
                              <Button
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                Eliminar
                              </Button>
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative products">
              <FormField
                control={form.control}
                name="products"
                render={() => (
                  <Button
                    className="w-full my-5"
                    type="button"
                    variant="delivery"
                    onClick={() =>
                      append({
                        cantidad: 1,
                        producto: "Puntada dorada",
                      })
                    }
                  >
                    Agregar producto
                  </Button>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="!mt-0 w-full">
            Registrar pedido
          </Button>
        </form>
      </Form>
    </div>
  );
}
