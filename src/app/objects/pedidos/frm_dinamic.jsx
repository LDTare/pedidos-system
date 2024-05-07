"use client";
import { set, z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState,useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {

  const params = useParams();

  const [total, setTotal] = useState(0);	
  const [contenido, setContenido] = useState([]);

  const router = useRouter();

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
          precio_u: z.coerce.number(
            { message: "Por favor ingrese un precio" }
          ),
          subtotal: z.coerce.number(),
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
    if(params.id){
      fetch(`/api/pedidos/${params.id}`)
      .then(res => res.json())
      .then(data => {
        form.reset(data);
        setContenido(data.contenido.map(item => item.subtotal));
        setTotal(data.total);
      }); 
    }
  }, [params.id]);

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

  async function onSubmit (data) {
    const subtotals = calculateSubtotals();
    setTotal(subtotals);

    console.log(data);
    
    if(!params.id){
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
      })

      const msg_server = await res.json();
      
      data.contenido = data.contenido.map(item => ({ ...item, pedidoId: msg_server.id }));

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
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 max-w-xl space-y-5"
        >

          <Button 
          type="reset"
          className="!mt-0 w-full"
          onClick={() => {
            // Redirect to the main page of the system
            router.push("/pages/pedidos/dashboard");
            form.reset();
            setContenido([]);
            setTotal(0);
          }}
          >
            Regresar al inicio
          </Button>

          <h1 className="text-3xl font-bold text-center">
            Registrar nuevo pedido
          </h1>
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
                            <Input {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              const subtotal = e.target.value * form.getValues(`contenido.${index}.precio_u`);
                              setContenido(prev => {
                                const newContenido = [...prev];
                                newContenido[index] = subtotal;
                                return newContenido;
                              }
                              );
                              form.setValue(`contenido.${index}.subtotal`, subtotal);
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
                            <Input {...field} />
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
                            <Input {...field} 
                             onChange={(e) => {
                              field.onChange(e);
                              const subtotal = e.target.value * form.getValues(`contenido.${index}.cantidad`);
                              setContenido(prev => {
                                const newContenido = [...prev];
                                newContenido[index] = subtotal;
                                return newContenido;
                              }
                              );
                              form.setValue(`contenido.${index}.subtotal`, subtotal);
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
                              readOnly // Changed value to the one stored in the 'contenido' array
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 capitalize" />
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
                            <Button onClick={() => 
                            {
                              remove(index);
                              setContenido(prev => {
                                const newContenido = [...prev];
                                newContenido.splice(index, 1);
                                return newContenido;
                              }
                              );
                            }
                            }>
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
                  onClick={() =>
                    append({
                      cantidad: 1,
                      producto: "",
                      precio_u: 0,
                      subtotal: 0,
                    })
                  }
                >
                  Agregar producto
                </Button>
              )}
            />
          </div>
          <div className="relative total">
           {
              total > 0 && (
                <div>
                  <Label>Total de la orden: </Label>
                  <Label> Q.{total} </Label>
                </div>
              )
           }
          </div>
          <Button type="submit" className="!mt-0 w-full">
            Registrar pedido
          </Button>
        </form>
      </Form>
    </div>
  );
}
