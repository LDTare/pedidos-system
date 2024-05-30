"use client";
import { set, z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Formulario_Edit() {
  const params = useParams();

  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const [pedido, setPedido] = useState({
    nombre: "",
    fecha_pedido: "",
    fecha_entrega: "",
    total: 0,
  });
  const [contenido, setContenido] = useState([]);

  const router = useRouter();

  const validationSchema = z.object({
    nombre: z
      .string()
      .min(1, {
        message: "El nombre del cliente es requerido",
      })
      .default(params.id ? pedido.nombre : ""),
    contenido: z
      .array(
        z.object({
          id: z
            .number()
            .default(params.id ? contenido.id : 0)
            .nullable(),
          cantidad: z.coerce.number(),
          producto: z
            .string()
            .min(1, { message: "Por favor ingrese un producto" }),
          precio_u: z.coerce
            .number({ message: "Por favor ingrese un precio" })
            .default(0),
          subtotal: z.coerce.number().default(0),
        })
      )
      .nonempty({ message: "Por favor llene todos los campos" }),
    total: z.coerce.number(),
  });

  const form = useForm({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (params.id) {
      const fetchPedido = async () => {
        const res = await fetch("/api/pedidos/" + params.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const pedido_info = await res.json();
        setPedido(pedido_info);
        form.setValue("nombre", pedido_info.nombre);
      };

      const fetchData = async () => {
        const res = await fetch("/api/contenido/" + params.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        setContenido(data);

        data.forEach((item) => {
          item.precio_u = 0;
          item.subtotal = 0;
        });

        form.reset({
          contenido: data,
        });
      };
      fetchPedido();
      fetchData();
    }
  }, []);

  const { fields, append, remove } = useFieldArray({
    name: "contenido",
    control: form.control,
  });

  const calculateSubtotals = () => {
    let total = 0;
    contenido.forEach((subtotal) => {
      total += subtotal;
    });
    return total;
  };

  async function onSubmit(data) {
    const subtotals = calculateSubtotals();
    const fecha_entrega = new Date();
    setTotal(subtotals);

    console.log(data);

    if (!params.id) {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: data.nombre,
          total: subtotals,
          estado: "Pendiente",
        }),
      });

      const msg_server = await res.json();

      data.contenido = data.contenido.map((item) => ({
        ...item,
        pedidoId: msg_server.id,
      }));

      const res2 = await fetch("/api/contenido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.contenido),
      });

      if (res.ok && res2.ok) {
        alert("Pedido registrado correctamente");
        form.reset();
        setContenido([]);
        setTotal(0);
      } else {
        alert("Error al registrar el pedido");
      }
    } else {
      const res = await fetch("/api/pedidos/" + params.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: data.nombre,
          total: subtotals,
          fecha_entrega: fecha_entrega,
          estado: "Entregado",
        }),
      });

      const res2 = await fetch("/api/contenido/" + params.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.contenido),
      });

      if (res.ok && res2.ok) {
        toast.info("Pedido actualizado");
        router.refresh();
        router.back();
        form.reset({
          nombre: "",
          contenido: [],
          total: 0,
        });
        setContenido([]);
        setTotal(0);
      } else {
        toast.error("Ocurrio un error al actualizar el pedido");
        const msg_server = await res2.json();
        setError(msg_server.message);
        toast.message(error, {
          description: "Ocurrio un error al actualizar el pedido",
        })
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 max-w-3xl space-y-5 border rounded-md p-5"
        >
          <h1 className="text-3xl font-bold text-center my-5">
            Actualizacion de pedidos
          </h1>

          <Button
            type="reset"
            className="!mt-0 w-full"
            onClick={() => {
              // Redirect to the previous page
              router.refresh();
              router.back();
              setContenido([]);
              setTotal(0);
              form.reset({
                nombre: "",
                contenido: [],
                total: 0,
              });
            }}
          >
            Regresar
          </Button>

          <div className="relative name">
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
                      value={field.value || (params.id ? pedido.nombre : "")}
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
                  <div className="flex gap-x-5">
                    <FormField
                      control={form.control}
                      key={index}
                      name={`contenido.${index}.cantidad`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cantidad</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={
                                field.value ||
                                (params.id ? contenido[index].cantidad : 0)
                              }
                              onChange={(e) => {
                                field.onChange(e);
                                const subtotal =
                                  e.target.value *
                                  form.getValues(`contenido.${index}.precio_u`);
                                setContenido((prev) => {
                                  const newContenido = [...prev];
                                  newContenido[index] = subtotal;
                                  return newContenido;
                                });
                                form.setValue(
                                  `contenido.${index}.subtotal`,
                                  subtotal
                                );
                              }}
                            />
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
                            <Input
                              {...field}
                              value={
                                field.value ||
                                (params.id ? contenido[index].producto : "")
                              }
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={index + 2}
                      name={`contenido.${index}.precio_u`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || (params.id ? contenido[index].precio_u : 0)}
                              onChange={(e) => {
                                field.onChange(e);
                                const subtotal =
                                  e.target.value *
                                  form.getValues(`contenido.${index}.cantidad`);
                                setContenido((prev) => {
                                  const newContenido = [...prev];
                                  newContenido[index] = subtotal;
                                  return newContenido;
                                });
                                form.setValue(
                                  `contenido.${index}.subtotal`,
                                  subtotal
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 capitalize" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={index + 3}
                      name={`contenido.${index}.subtotal`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subtotal</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={
                                field.value ||
                                (params.id ? contenido[index].subtotal : 0)
                              }
                              readOnly
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 capitalize" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative total">
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={total} // Set the default value to the total
                      readOnly
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            ></FormField>

            <div>
              <Button
                className="w-full my-5"
                type="button"
                onClick={() => {
                  form.setValue("total", calculateSubtotals()); // Calculate the total
                }}
              >
                Calcular total
              </Button>
            </div>
          </div>
          <Button type="submit" className="!mt-0 w-full">
            Actualizar pedido
          </Button>
        </form>
      </Form>
    </div>
  );
}
