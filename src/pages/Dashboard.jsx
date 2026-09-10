import React from "react";
import { useApp } from "../context/AppContext.jsx";
import { Card, Badge } from "../components/Card.jsx";

export default function Dashboard() {
  const { clientes, reservas, asistencias, getPlan } = useApp();
  const hoy = new Date().toISOString().slice(0, 10);

  const activos = clientes.length;
  const asistenciasHoy = asistencias.filter((a) => a.fecha === hoy).length;
  const reservasHoy = reservas.filter((r) => r.fecha === hoy && r.estado === "confirmada").length;

  const porVencer = clientes.filter((c) => {
    const dias = (new Date(c.finPlan) - new Date(hoy)) / (1000 * 60 * 60 * 24);
    return dias >= 0 && dias <= 7;
  });

  const vencidos = clientes.filter((c) => c.finPlan < hoy);
  const sinClases = clientes.filter((c) => {
    const plan = getPlan(c.planId);
    return plan && plan.clases !== null && c.clasesRestantes <= 0;
  });
  const atrasados = clientes.filter((c) => c.estadoPago === "atrasado");

  const cumpleanosProximos = clientes
    .map((c) => {
      const cump = new Date(c.cumpleanos);
      const diff = Math.round((cump - new Date(hoy)) / (1000 * 60 * 60 * 24));
      return { ...c, diff };
    })
    .filter((c) => c.diff >= 0 && c.diff <= 30)
    .sort((a, b) => a.diff - b.diff);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted text-sm">Resumen general del gimnasio, hoy {hoy}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card title="Clientes activos" value={activos} />
        <Card title="Asistencias hoy" value={asistenciasHoy} accent="success" />
        <Card title="Reservas hoy" value={reservasHoy} accent="orange" />
        <Card title="Pagos atrasados" value={atrasados.length} accent="danger" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-bg-card border border-bg-border rounded-lg p-4">
          <h2 className="font-semibold mb-3">Planes por vencer (7 días)</h2>
          {porVencer.length === 0 && <p className="text-muted text-sm">Sin planes por vencer.</p>}
          <ul className="flex flex-col gap-2">
            {porVencer.map((c) => (
              <li key={c.id} className="flex justify-between text-sm">
                <span>{c.nombre}</span>
                <Badge color="warning">vence {c.finPlan}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-bg-card border border-bg-border rounded-lg p-4">
          <h2 className="font-semibold mb-3">Planes vencidos</h2>
          {vencidos.length === 0 && <p className="text-muted text-sm">Sin planes vencidos.</p>}
          <ul className="flex flex-col gap-2">
            {vencidos.map((c) => (
              <li key={c.id} className="flex justify-between text-sm">
                <span>{c.nombre}</span>
                <Badge color="danger">venció {c.finPlan}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-bg-card border border-bg-border rounded-lg p-4">
          <h2 className="font-semibold mb-3">Sin clases disponibles</h2>
          {sinClases.length === 0 && <p className="text-muted text-sm">Todos con clases disponibles.</p>}
          <ul className="flex flex-col gap-2">
            {sinClases.map((c) => (
              <li key={c.id} className="flex justify-between text-sm">
                <span>{c.nombre}</span>
                <Badge color="danger">0 clases</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-bg-card border border-bg-border rounded-lg p-4">
          <h2 className="font-semibold mb-3">Cumpleaños próximos (30 días)</h2>
          {cumpleanosProximos.length === 0 && <p className="text-muted text-sm">Sin cumpleaños próximos.</p>}
          <ul className="flex flex-col gap-2">
            {cumpleanosProximos.map((c) => (
              <li key={c.id} className="flex justify-between text-sm">
                <span>{c.nombre}</span>
                <Badge color="orange">en {c.diff} días</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
