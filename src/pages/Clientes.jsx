import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { Badge } from "../components/Card.jsx";

export default function Clientes() {
  const { clientes, planes, agregarCliente, getPlan } = useApp();
  const [busqueda, setBusqueda] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    cumpleanos: "",
    fechaIngreso: new Date().toISOString().slice(0, 10),
    planId: planes[0]?.id || "",
    inicioPlan: new Date().toISOString().slice(0, 10),
    finPlan: new Date().toISOString().slice(0, 10),
    clasesRestantes: 0,
    estadoPago: "al_dia",
  });

  const filtrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.telefono.includes(busqueda)
  );

  function crear(e) {
    e.preventDefault();
    const plan = getPlan(form.planId);
    agregarCliente({
      ...form,
      clasesRestantes: plan && plan.clases === null ? null : Number(form.clasesRestantes),
    });
    setMostrarForm(false);
    setForm({ ...form, nombre: "", telefono: "" });
  }

  function antiguedad(fechaIngreso) {
    const dias = Math.round((new Date() - new Date(fechaIngreso)) / (1000 * 60 * 60 * 24));
    if (dias < 30) return `${dias} días`;
    if (dias < 365) return `${Math.floor(dias / 30)} meses`;
    return `${(dias / 365).toFixed(1)} años`;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="bg-brand-orange text-black font-semibold px-4 py-2 rounded hover:bg-brand-orangeDark"
        >
          {mostrarForm ? "Cancelar" : "+ Nuevo cliente"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre o teléfono..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="bg-bg-card border border-bg-border rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-orange"
      />

      {mostrarForm && (
        <form onSubmit={crear} className="bg-bg-card border border-bg-border rounded-lg p-4 grid md:grid-cols-2 gap-3">
          <input required placeholder="Nombre completo" value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
          <input required placeholder="Teléfono (+56...)" value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
          <label className="text-xs text-muted flex flex-col gap-1">Cumpleaños
            <input required type="date" value={form.cumpleanos}
              onChange={(e) => setForm({ ...form, cumpleanos: e.target.value })}
              className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
          </label>
          <label className="text-xs text-muted flex flex-col gap-1">Fecha de ingreso
            <input required type="date" value={form.fechaIngreso}
              onChange={(e) => setForm({ ...form, fechaIngreso: e.target.value })}
              className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
          </label>
          <label className="text-xs text-muted flex flex-col gap-1">Plan
            <select value={form.planId} onChange={(e) => setForm({ ...form, planId: e.target.value })}
              className="bg-bg border border-bg-border rounded px-3 py-2 text-sm">
              {planes.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}{!p.vendible ? " (no vendible)" : ""}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-muted flex flex-col gap-1">Clases restantes
            <input type="number" min="0" value={form.clasesRestantes}
              onChange={(e) => setForm({ ...form, clasesRestantes: e.target.value })}
              className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
          </label>
          <label className="text-xs text-muted flex flex-col gap-1">Inicio de plan
            <input type="date" value={form.inicioPlan}
              onChange={(e) => setForm({ ...form, inicioPlan: e.target.value })}
              className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
          </label>
          <label className="text-xs text-muted flex flex-col gap-1">Fin de plan
            <input type="date" value={form.finPlan}
              onChange={(e) => setForm({ ...form, finPlan: e.target.value })}
              className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
          </label>
          <button type="submit" className="md:col-span-2 bg-brand-orange text-black font-semibold rounded py-2 hover:bg-brand-orangeDark">
            Guardar cliente
          </button>
        </form>
      )}

      <div className="bg-bg-card border border-bg-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted border-b border-bg-border">
              <th className="p-3">Nombre</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Clases</th>
              <th className="p-3">Vence</th>
              <th className="p-3">Pago</th>
              <th className="p-3">Antigüedad</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((c) => {
              const plan = getPlan(c.planId);
              const vencido = c.finPlan < new Date().toISOString().slice(0, 10);
              return (
                <tr key={c.id} onClick={() => setSeleccionado(c.id === seleccionado ? null : c.id)}
                  className="border-b border-bg-border cursor-pointer hover:bg-bg">
                  <td className="p-3">{c.nombre}<br /><span className="text-muted text-xs">{c.telefono}</span></td>
                  <td className="p-3">{plan?.nombre}</td>
                  <td className="p-3">{plan?.clases === null ? "Libre" : c.clasesRestantes}</td>
                  <td className="p-3">
                    <Badge color={vencido ? "danger" : "success"}>{c.finPlan}</Badge>
                  </td>
                  <td className="p-3">
                    <Badge color={c.estadoPago === "atrasado" ? "danger" : "success"}>
                      {c.estadoPago === "atrasado" ? "Atrasado" : "Al día"}
                    </Badge>
                  </td>
                  <td className="p-3">{antiguedad(c.fechaIngreso)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
