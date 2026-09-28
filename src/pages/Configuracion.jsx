import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";

export default function Configuracion() {
  const { config, setConfig, horarios, setHorarios } = useApp();
  const [local, setLocal] = useState(config);

  function guardar(e) {
    e.preventDefault();
    setConfig(local);
  }

  function actualizarHorario(id, cupo) {
    setHorarios(horarios.map((h) => (h.id === id ? { ...h, cupo: Number(cupo) } : h)));
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Configuración del gimnasio</h1>

      <form onSubmit={guardar} className="bg-bg-card border border-bg-border rounded-lg p-4 grid md:grid-cols-2 gap-3">
        <label className="text-xs text-muted flex flex-col gap-1">Horario lunes a viernes
          <input value={local.horarioGimnasio.semana}
            onChange={(e) => setLocal({ ...local, horarioGimnasio: { ...local.horarioGimnasio, semana: e.target.value } })}
            className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
        </label>
        <label className="text-xs text-muted flex flex-col gap-1">Horario sábado
          <input value={local.horarioGimnasio.sabado}
            onChange={(e) => setLocal({ ...local, horarioGimnasio: { ...local.horarioGimnasio, sabado: e.target.value } })}
            className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
        </label>
        <label className="text-xs text-muted flex flex-col gap-1">Domingo
          <input value={local.horarioGimnasio.domingo}
            onChange={(e) => setLocal({ ...local, horarioGimnasio: { ...local.horarioGimnasio, domingo: e.target.value } })}
            className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
        </label>
        <label className="text-xs text-muted flex flex-col gap-1">Horas mínimas para cancelar reserva
          <input type="number" min="0" value={local.horasCancelacion}
            onChange={(e) => setLocal({ ...local, horasCancelacion: Number(e.target.value) })}
            className="bg-bg border border-bg-border rounded px-3 py-2 text-sm" />
        </label>
        <button type="submit" className="md:col-span-2 bg-brand-orange text-black font-semibold rounded py-2 hover:bg-brand-orangeDark">
          Guardar configuración
        </button>
      </form>

      <div className="bg-bg-card border border-bg-border rounded-lg p-4">
        <h2 className="font-semibold mb-3">Cupos por horario</h2>
        <div className="flex flex-col gap-2">
          {horarios.map((h) => (
            <div key={h.id} className="flex items-center justify-between gap-3 text-sm">
              <span>{h.dia} · {h.hora}</span>
              <input
                type="number"
                min="1"
                value={h.cupo}
                onChange={(e) => actualizarHorario(h.id, e.target.value)}
                className="bg-bg border border-bg-border rounded px-2 py-1 w-20 text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
