"use client";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import "jspdf-autotable";

function createPDF(pedido) {
  const doc = new jsPDF({
    format: "a2"
  });
  doc.text(`Pedido No. ${pedido.id}`, 10, 10);
  doc.text(
    `Fecha de pedido: ${pedido.fecha_pedido.toLocaleDateString()}`,
    10,
    20
  );
  if (pedido.fecha_entrega) {
    doc.text(
      `Fecha de entrega: ${pedido.fecha_entrega.toLocaleDateString()}`,
      10,
      30
    );
  }
  doc.text(`Total: Q.${pedido.total}`, 10, 40);
  doc.text("Productos", 10, 50);
  doc.autoTable({
    startY: 60,
    head: [["Productos", "Cantidad", "Precio unitario", "Subtotal"]],
    body: pedido.contenido.map((producto) => [
      producto.producto,
      producto.cantidad,
      producto.precio_u,
      producto.subtotal,
    ]),
  });
  doc.save(`pedido-${pedido.id}.pdf`);
}

function ImprimirPDF({ pedido }) {
  return <Button
  onClick={() => createPDF(pedido)}
  className="w-full"
  variant="default"
  >Imprimir recibo</Button>;
}

export default ImprimirPDF;