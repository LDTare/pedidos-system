"use client";
import { Separator } from "@radix-ui/react-select";
import { SidebarNav } from "@/app/objects/inicio/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/pages/perfil",
  },
  {
    title: "Acerca de",
    href: "/pages/perfil/About",
  },
];
export default function SettingsLayout({ children }) {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Ajustes</h2>
          <p className="text-muted-foreground">
          Administre la configuración de su cuenta y establezca las preferencias de correo electrónico.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
