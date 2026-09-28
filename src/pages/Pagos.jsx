import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { Badge } from "../components/Card.jsx";

export default function Pagos() {
  const { clientes, pagos, registrarPago } = useApp();
  const [clienteId, setClienteId] = useState(clientes[0]?.id || "");
  const [monto, setMonto] = useState("");
  const [metodo, setMetodo] = useState("Efectivo");

  function submit(e) {
    e.preventDefault();
    if (!monto) return;
    registrarPago(clienteId, monto, metodo);
    setMonto("");
  }

  const atrasados = clientes.filter((c) => c.estadoPago === "atrasado");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Pagos</h1>

      <div className="bg-bg-card border border-bg-border rounded-lg p-4">
        <h2 className="font-semibold mb-2">Clientes con pago atrasado</h2>
        {atrasados.length === 0 && <p className="text-muted text-sm">No hay pagos atrasados.</p>}
        <ul className="flex flex-col gap-1 text-sm">
          {atrasados.map((c) => (
            <li key={c.id} className="flex justify-between">
              <span>{c.nombre}</span>
              <Badge color="danger">Atrasado</Badge>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={submit} className="bg-bg-card border border-bg-border rounded-lg p-4 grid md:grid-cols-4 gap-3 items-end">
        <label className="text-xs text-muted flex flex-col gap-1 md:col-span-2">Cliente
          <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}
            className="bg-bg border border-bg-border rounded px-3 py-2 text-sm">
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </label>
        <label className="text-xs text-muted flex flex-col gap-1">Monto (CLP)
          <input type="number" min="0" required value={monto} onChange={(e) => setMonto(e.target.value)}
            className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
        </label>
        <label className="text-xs text-muted flex flex-col gap-1">Método
          <select value={metodo} onChange={(e) => setMetodo(e.target.value)}
            className="bg-bg border border-bg-border rounded px-3 py-2 text-sm">
            <option>Efectivo</option>
            <option>Transferencia</option>
            <option>Tarjeta</option>
          </select>
        </label>
        <button type="submit" className="md:col-span-4 bg-brand-orange text-black font-semibold rounded py-2 text-sm hover:bg-brand-orangeDark">
          Registrar pago
        </button>
      </form>

      <div className="bg-bg-card border border-bg-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted border-b border-bg-border">
              <th className="p-3">Cliente</th>
              <th className="p-3">Monto</th>
              <th className="p-3">Método</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {[...pagos].reverse().map((p) => {
              const cliente = clientes.find((c) => c.id === p.clienteId);
              return (
                <tr key={p.id} className="border-b border-bg-border">
                  <td className="p-3">{cliente?.nombre}</td>
                  <td className="p-3">${p.monto.toLocaleString("es-CL")}</td>
                  <td className="p-3">{p.metodo}</td>
                  <td className="p-3">{p.fecha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
