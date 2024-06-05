"use client";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import "jspdf-autotable";

// This function creates a PDF document based on the provided pedido object.
function createPDF({pedido}) {

  // Get the current year
  const year = new Date().getFullYear();

  // Create a new instance of jsPDF with A4 format
  const doc = new jsPDF({
    format: "a4",
  });

  // Draw a rectangle as a border for the header section
  doc.rect(25, 15, 155, 100, "S");

  // Set the font size and position for the header text
  doc.setFontSize(15);
  doc.text("LA PUNTADA DORADA", 45, 25);

  // Draw a filled rectangle for the "ORDEN DE TRABAJO" label
  doc.rect(125, 20, 45, 7, "F");

  // Set the font size and color for the "ORDEN DE TRABAJO" label
  doc.setFontSize(11.5);
  doc.setTextColor(255, 255, 255);
  doc.text("ORDEN DE TRABAJO", 128, 25);

  // Set the font size and color for the contact information
  doc.setFontSize(9.5);
  doc.setTextColor(0, 0, 0);
  doc.text("Email: lapuntadadorada@gmail.com", 35, 32);
  doc.text(`Telefono: ${pedido.sucursal.telefono}`, 90, 32);

  // Set the font size and position for the address
  doc.setFontSize(9.5);
  doc.text(`Direccion: ${pedido.sucursal.direccion}`, 33, 36);

  // Draw a rectangle for the order number and year
  doc.rect(125, 27, 45, 10, "S");

  // Set the font size and position for the order number and year
  doc.setFontSize(12);
  doc.text(`NO. ${pedido.id} - ` + year, 130, 33);

  // Draw a rectangle for the client section
  doc.rect(33, 37, 137, 14, "S");

  // Set the font size and position for the client name
  doc.setFontSize(10.5);
  doc.text(`Cliente: ${pedido.nombre}`, 35, 42);

  // Draw a line below the client section
  doc.line(33, 44, 170, 44);

  // Set the font size and position for the pedido fecha_pedido
  doc.text(
    `Fecha de pedido: ${pedido.fecha_pedido.toLocaleDateString()}`,
    105,
    49
  );

  // Draw a vertical line to separate the fecha_pedido and fecha_entrega
  doc.line(100, 44, 100, 51);

  // Check if fecha_entrega exists and set the font size and position accordingly
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
  
  // Check if total is greater than 0 and set the font size and position for the total
  if(pedido.total > 0){
    doc.text(`Total: Q.${pedido.total}`, 130, 135);
  }

  // Set the default styles for the table header
  jsPDF.autoTableSetDefaults({
    headStyles: {
      fillColor: [0,0,0],	
      textColor: [255,255,255],
    },
  });

  // Generate the table with the pedido contenido
  doc.autoTable({
    startY: 52,
    theme: "grid",
    tableWidth: 137,
    margin:{
      left:33,
    },
    head: [["Cantidad", "Productos", "Precio U."]],
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

  // Set the font size and position for the "Fecha de impresión" label
  doc.text("Fecha de impresión:", 35, 135);
  doc.text(new Date().toLocaleDateString(), 70, 135);

  // Draw a dashed line as a separator
  doc.setLineDash([2.5]);
  doc.line(0, 145, 210, 145);

  // Save the PDF with a filename based on the pedido id
  doc.save(`pedido-${pedido.id}.pdf`);
}

function ImprimirPDF( pedido ) {
  return (
    <Button
      onClick={() => createPDF(pedido)}
      className="mx-2"
      variant="default"
    >
      Imprimir recibo
    </Button>
  );
}

export default ImprimirPDF;
