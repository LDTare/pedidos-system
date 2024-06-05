"use client";

//importaciones para el formulario
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//importaciones para los campos de formulario
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

//importaciones para comportamiento
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export function FrmUser() {
  //Estados para almacenar los datos del formulario
  const [user, setUser] = useState([]);

  //variables para el manejo del formulario
  const router = useRouter();
  const params = useParams();

  //Estado para manejar los errores
  const [error, setError] = useState(null);

  //Definición del esquema de validación
  const schema = z
    .object({
      name: z
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
        .default(params.id ? user?.name : ""),
      username: z
        .string()
        .min(3, {
          message: "El nombre de usuario debe tener al menos 3 caracteres",
        })
        .default(params.id ? user?.username : ""),
      email: z
        .string()
        .email({ message: "El email no es válido" })
        .default(params.id ? user?.email : ""),
      password: z
        .string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .default(params.id ? user?.password : ""),
      confirmPassword: z.string().default(params.id ? user?.password : ""),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    });

  //Hook para manejar el formulario
  useEffect(() => {
    if (params.id) {
      const promesaUsuario = fetch("/api/usuarios/" + params.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.promise(promesaUsuario, {
        loading: "Cargando usuario...",
        success: "Usuario cargado",
        error: "Error al cargar el usuario",
      });

      const fetchUsuario = async () => {
        const response = await promesaUsuario;
        const data = await response.json();
        setUser(data);
      };

        fetchUsuario();
    }
  }, [params.id]);

  //Hook para manejar el formulario
  const form = useForm({
    resolver: zodResolver(schema),
  });

  //Función para enviar el formulario
  async function onSubmit(data) {
    const promesa = fetch("/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    toast.promise(promesa, {
      loading: "Guardando usuario...",
      success: "Usuario guardado",
      error: "Error al guardar el usuario",
    });

    const response = await promesa;
    if (response.ok) {
      router.push("/pages/usuarios/dashboard");
    } else {
        const msg_server = await response.json();
      setError(msg_server.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {error && <p>{error}</p>}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre del empleado"
                  {...field}
                  defaultValue={params.id ? user?.name : ""}
                />
              </FormControl>
              <FormDescription>
                Apartado para registrar el nombre completo del empleado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombre de usuario"
                  {...field}
                  defaultValue={params.id ? user?.username : ""}
                />
              </FormControl>
              <FormDescription>
                Apartado para registrar el nombre de usuario para el sistema
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Correo electrónico"
                  {...field}
                  defaultValue={params.id ? user?.email : ""}
                />
              </FormControl>
              <FormDescription>
                Apartado para registrar el correo electrónico del empleado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  {...field}
                  defaultValue={params.id ? user?.password : ""}
                />
              </FormControl>
              <FormDescription>
                Apartado para registrar la contraseña del empleado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirmar contraseña"
                  {...field}
                  defaultValue={params.id ? user?.password : ""}
                />
              </FormControl>
              <FormDescription>
                Apartado para confirmar la contraseña del empleado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Guardar</Button>
        <Button
          type="button"
          onClick={() => router.push("/pages/usuarios/dashboard")}
        >
          Cancelar
        </Button>
      </form>
    </Form>
  );
}
