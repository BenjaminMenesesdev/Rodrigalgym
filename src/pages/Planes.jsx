import React from "react";
import { useApp } from "../context/AppContext.jsx";
import { Badge } from "../components/Card.jsx";

export default function Planes() {
  const { planes, clientes } = useApp();

  function clientesConPlan(planId) {
    return clientes.filter((c) => c.planId === planId).length;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Catálogo de planes</h1>
      <p className="text-muted text-sm">
        Los planes marcados como "no vendible" siguen activos para los clientes que ya los tienen, pero no se ofrecen a clientes nuevos.
      </p>
      <div className="grid md:grid-cols-3 gap-3">
        {planes.map((p) => (
          <div key={p.id} className="bg-bg-card border border-bg-border rounded-lg p-4 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h2 className="font-semibold">{p.nombre}</h2>
              <Badge color={p.vendible ? "success" : "muted"}>
                {p.vendible ? "Vendible" : "No vendible"}
              </Badge>
            </div>
            <p className="text-muted text-sm">
              {p.clases === null ? "Clases ilimitadas (plan libre)" : `${p.clases} clases por ciclo`}
            </p>
            <p className="text-muted text-sm">Duración: {p.duracionDias} días</p>
            <p className="text-sm">Clientes con este plan: <span className="text-brand-orange font-semibold">{clientesConPlan(p.id)}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
