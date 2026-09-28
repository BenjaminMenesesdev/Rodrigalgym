import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { Badge } from "../components/Card.jsx";

export default function Reservas() {
  const { horarios, clientes, reservasDeHorario, crearReserva, cancelarReserva, getCliente } = useApp();
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [clienteId, setClienteId] = useState(clientes[0]?.id || "");
  const [mensaje, setMensaje] = useState(null);

  function reservar(horarioId) {
    const res = crearReserva(clienteId, horarioId, fecha);
    setMensaje(res.ok ? { tipo: "success", texto: "Reserva creada correctamente" } : { tipo: "danger", texto: res.msg });
    setTimeout(() => setMensaje(null), 3500);
  }

  function cancelar(reservaId) {
    const res = cancelarReserva(reservaId);
    setMensaje(res.ok ? { tipo: "success", texto: "Reserva cancelada" } : { tipo: "danger", texto: res.msg });
    setTimeout(() => setMensaje(null), 3500);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Reservas y agenda</h1>

      <div className="flex flex-col md:flex-row gap-3">
        <label className="text-xs text-muted flex flex-col gap-1">Fecha
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
            className="bg-bg-card border border-bg-border rounded px-3 py-2 text-sm" />
        </label>
        <label className="text-xs text-muted flex flex-col gap-1 flex-1">Cliente a reservar
          <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}
            className="bg-bg-card border border-bg-border rounded px-3 py-2 text-sm">
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </label>
      </div>

      {mensaje && (
        <div className={`rounded px-3 py-2 text-sm border ${
          mensaje.tipo === "success" ? "bg-success/10 border-success/40 text-success" : "bg-danger/10 border-danger/40 text-danger"
        }`}>
          {mensaje.texto}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {horarios.map((h) => {
          const ocupadas = reservasDeHorario(h.id, fecha);
          const lleno = ocupadas.length >= h.cupo;
          return (
            <div key={h.id} className="bg-bg-card border border-bg-border rounded-lg p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{h.dia} · {h.hora}</span>
                <Badge color={lleno ? "danger" : "success"}>{ocupadas.length}/{h.cupo} cupos</Badge>
              </div>
              <ul className="text-sm flex flex-col gap-1">
                {ocupadas.map((r) => (
                  <li key={r.id} className="flex justify-between items-center text-muted">
                    <span>{getCliente(r.clienteId)?.nombre}</span>
                    <button onClick={() => cancelar(r.id)} className="text-danger text-xs hover:underline">
                      Cancelar
                    </button>
                  </li>
                ))}
                {ocupadas.length === 0 && <li className="text-muted text-xs">Sin reservas aún</li>}
              </ul>
              <button
                onClick={() => reservar(h.id)}
                disabled={lleno}
                className="mt-2 bg-brand-orange disabled:bg-bg-border disabled:text-muted text-black font-semibold rounded py-2 text-sm hover:bg-brand-orangeDark"
              >
                {lleno ? "Horario lleno" : "Reservar para este cliente"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
