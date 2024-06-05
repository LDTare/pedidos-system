"use client";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
         Proyecto de la puntada dorada para la gestion de ordenes realizado por{" "}
          <a
            href="https://github.com/LDTare"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Aria Flandre
          </a>
          .
        </p>
      </div>
    </footer>
  )
}