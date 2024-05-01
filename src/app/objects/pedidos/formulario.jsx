"use client";

import { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export function PedidoFRM() {
    const [nombre, setNombre] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [contenido, setContenido] = useState([]);
    const [cantidad, setCantidad] = useState('');
    const [producto, setProducto] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [subtotal, setSubtotal] = useState('');
    const [total, setTotal] = useState('');
    const [estado, setEstado] = useState('');

    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const nuevoPedido = {
        nombre,
        fecha_entrega: fechaEntrega,
        total: parseFloat(total),
        estado,
      };
  
        const res = await fetch('/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoPedido),
            });
            const msg_server = await res.json();
        if (res.ok) {
            const listado=contenido.map(
                contenido => {
                  return{
                    pedidoId: msg_server.id,
                    cantidad: contenido.cantidad,
                    producto: contenido.producto,
                    precio_u: contenido.precio_u,
                    subtotal: contenido.subtotal,
                  }
                }
              );
            const contenidoRes = await fetch('/api/contenido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(listado),
            });
        } else {
          
          console.log(msg_server.message);
        }
      limpiarCampos();
    };
  
    const handleAddPedido = () => {
      setContenido([...contenido, { 
        cantidad: Number(cantidad),
         producto, precio_u: Number(precioUnitario),
          subtotal: Number(subtotal) }]);
    };
    
  
    const handleRemovePedido = (index) => {
      const nuevosPedidos = [...contenido];
      nuevosPedidos.splice(index, 1);
      setContenido(nuevosPedidos);
    };
  
    const handleUpdatePedido = (index, field, value) => {
      const nuevosPedidos = [...contenido];
      nuevosPedidos[index][field] = value;
      setContenido(nuevosPedidos);
    };
  
    const limpiarCampos = () => {
      setNombre('');
      setFechaEntrega('');
      setContenido([]);
      setCantidad('');
      setProducto('');
      setPrecioUnitario('');
      setSubtotal('');
      setTotal('');
      setEstado('');
    };
  
    return (
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2>Nuevo Pedido</h2>
            <div className='mb-2'>
              <input
                type="text"
                name="nombre"
                className="w-full bg-zinc-700 form-control py-2 rounded my-2"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input
                type="date"
                name="fecha_entrega"
                className="w-full bg-zinc-700 form-control py-2 rounded my-2"
                placeholder="Fecha de Entrega"
                value={fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input
                type="number"
                name="cantidad"
                className="w-full bg-zinc-700 form-control py-2 rounded my-2"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input
                type="text"
                name="producto"
                className="w-full bg-zinc-700 form-control py-2 rounded my-2"
                placeholder="Producto"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input
                type="number"
                name="precio_unitario"
                className="w-full bg-zinc-700 form-control py-2 rounded my-2"
                placeholder="Precio Unitario"
                value={precioUnitario}
                onChange={(e) => setPrecioUnitario(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input
                type="number"
                name="subtotal"
                className="w-full bg-zinc-700 form-control py-2 rounded my-2"
                placeholder="Subtotal"
                value={subtotal}
                onChange={(e) => setSubtotal(e.target.value)}
              />
            </div>
            <div className='mb-2'>
              <input
                type="number"
                name="total"
                className="w-full bg-zinc-700 form-control py-2 rounded my-2"
                placeholder="Total"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
            </div>
            <div>
              <select
                name="estado"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setEstado(e.target.value)}
                value={estado}
              >
                <option value="Seleccione el estado">Seleccione el estado</option>
                <option value="En proceso">En proceso</option>
                <option value="Abonado">Abonado</option>
              </select>
            </div>
            <button type="button" onClick={handleAddPedido} className='btn btn-info my-2'>Agregar Pedido</button>
            <div>
              {contenido.map((pedido, index) => (
                <div key={index}>
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={pedido.cantidad}
                    onChange={(e) => handleUpdatePedido(index, 'cantidad', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Producto"
                    value={pedido.producto}
                    onChange={(e) => handleUpdatePedido(index, 'producto', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Precio Unitario"
                    value={pedido.precio_u}
                    onChange={(e) => handleUpdatePedido(index, 'precio_u', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Subtotal"
                    value={pedido.subtotal}
                    onChange={(e) => handleUpdatePedido(index, 'subtotal', e.target.value)}
                  />
                  <button type="button" onClick={() => handleRemovePedido(index)} className='btn btn-danger'>Eliminar Pedido</button>
                </div>
              ))}
            </div>
            <button className='btn btn-success my-2'>Crear Pedido</button>
            <Link href={"/pages/pedidos/dashboard"} className='btn btn-secondary'>Regresar</Link>
          </form>
        </div>
      </div>
    );
}

export default PedidoFRM;