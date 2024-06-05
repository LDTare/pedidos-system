export default function About() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Acerca de</h1>
      <p className="text-muted-foreground">
        La puntada dorada sistema de gestión de pedidos version 1.0.0
      </p>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Transparencia</h2>
          <ul className="list-disc list-inside">
            <li>NextJS / Framework de desarrollo</li>
            <li>NextAuth / Manipulador de sesiones</li>
            <li>MySQL / Tecnologia gestora de datos</li>
            <li>Shadcdn / Framework de diseño </li>
          </ul>
        </div>

        <div>
            <h2 className="text-2xl font-bold">Repositorio</h2>
            <p className="text-muted-foreground">
                El codigo fuente de este proyecto forma parte de un protafolio de proyectos y recibirá actualizaciones visuales según las necesidades.
            </p>
        </div>

        <div>
            <h2 className="text-2xl font-bold">Contacto</h2>
            <p className="text-muted-foreground">
                Para cualquier duda, soporte o aclaración, favor de contactar a: 
            </p>
            <ul className="list-disc list-inside">
                <li>Correo: joanrandy34@gmail.com
                </li>
                <li>Telefono: 4243-0843
                </li>
            </ul>
            </div>
      </div>
    </div>
  );
}
