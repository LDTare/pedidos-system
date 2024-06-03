"use client";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import "jspdf-autotable";

function createPDF(pedido) {

  const year = new Date().getFullYear();
  const doc = new jsPDF({
    format: "a4",
  });

  doc.rect(25, 15, 155, 100, "S");
  doc.setFontSize(15);
  doc.text("LA PUNTADA DORADA", 45, 25);

  doc.rect(125, 20, 45, 7, "F");

  doc.setFontSize(11.5);
  doc.setTextColor(255, 255, 255);
  doc.text("ORDEN DE TRABAJO", 128, 25);

  doc.setFontSize(9.5);
  doc.setTextColor(0, 0, 0);
  doc.text("Email: lapuntadadorada@gmail.com", 35, 32);
  doc.text("Telefono: 7738-4005", 90, 32);

  doc.setFontSize(9.5);
  doc.text("Direccion: $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", 33, 36);

  doc.rect(125, 27, 45, 10, "S");
  doc.setFontSize(12);
  doc.text(`NO. ${pedido.id} - ` + year, 130, 33);

  doc.setFontSize(10.5);
  doc.rect(33, 37, 137, 14, "S");

  //cliente
  doc.text(`Cliente: ${pedido.nombre}`, 35, 42);

  doc.line(33, 44, 170, 44);
  doc.text(
    `Fecha de pedido: ${pedido.fecha_pedido.toLocaleDateString()}`,
    105,
    49
  );

  doc.line(100, 44, 100, 51);

  if (pedido.fecha_entrega) {
    doc.text(
      `Fecha de entrega: ${pedido.fecha_entrega.toLocaleDateString()}`,
      35,
      49
    );
  }
  else{
    doc.text(`Fecha de entrega: ${pedido.estado} `, 35, 49);
  }
  
  if(pedido.total > 0){
    doc.text(`Total: Q.${pedido.total}`, 130, 135);
  }

  jsPDF.autoTableSetDefaults({
    headStyles: {
      fillColor: [0,0,0],	
      textColor: [255,255,255],
    },
  });
  doc.autoTable({
    startY: 52,
    theme: "grid",
    tableWidth: 137,
    margin:{
      left:33,
    },
    head: [["Cantidad", "Productos", "Precio unitario"]],
    body: pedido.contenido.map((producto) => [
      producto.cantidad,
      producto.producto,
      producto.precio_u,
    ]),

    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 20 },
    },
    
  });

  doc.text("Fecha de impresión:", 35, 135);
  doc.text(new Date().toLocaleDateString(), 70, 135);

  doc.setLineDash([2.5]);
  doc.line(0, 145, 210, 145);

  // Save the PDF
  doc.save(`pedido-${pedido.id}.pdf`);
}

function ImprimirPDF({ pedido }) {
  return (
    <Button
      onClick={() => createPDF(pedido)}
      className="w-full"
      variant="default"
    >
      Imprimir recibo
    </Button>
  );
}

export default ImprimirPDF;
