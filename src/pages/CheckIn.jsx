import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { Badge } from "../components/Card.jsx";

export default function CheckIn() {
  const { clientes, getPlan, registrarAsistencia, asistencias } = useApp();
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [resultado, setResultado] = useState(null);

  const filtrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.telefono.includes(busqueda)
  );

  const hoy = new Date().toISOString().slice(0, 10);
  const asistenciasHoy = asistencias.filter((a) => a.fecha === hoy);

  function hacerCheckIn(clienteId) {
    const res = registrarAsistencia(clienteId);
    setResultado(res);
    setSeleccionado(clienteId);
    setTimeout(() => setResultado(null), 4000);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Check-in de asistencia</h1>
      <p className="text-muted text-sm">
        Busca al cliente por nombre o teléfono y registra su llegada. El método final (QR, huella o búsqueda) se definirá con el dueño; esta pantalla simula el resultado de negocio.
      </p>

      <input
        type="text"
        placeholder="Buscar cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="bg-bg-card border border-bg-border rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-orange"
      />

      <div className="grid md:grid-cols-2 gap-3">
        {filtrados.map((c) => {
          const plan = getPlan(c.planId);
          const vencido = c.finPlan < hoy;
          const sinClases = plan?.clases !== null && c.clasesRestantes <= 0;
          return (
            <div key={c.id} className="bg-bg-card border border-bg-border rounded-lg p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{c.nombre}</span>
                <Badge color={vencido ? "danger" : sinClases ? "warning" : "success"}>
                  {vencido ? "Plan vencido" : sinClases ? "Sin clases" : "Disponible"}
                </Badge>
              </div>
              <p className="text-muted text-sm">
                {plan?.clases === null ? "Plan libre" : `${c.clasesRestantes} clases restantes`} · vence {c.finPlan}
              </p>
              <button
                onClick={() => hacerCheckIn(c.id)}
                className="bg-brand-orange text-black font-semibold rounded py-2 text-sm hover:bg-brand-orangeDark"
              >
                Registrar asistencia
              </button>
              {seleccionado === c.id && resultado && (
                <p className={`text-sm ${resultado.ok ? "text-success" : "text-danger"}`}>
                  {resultado.ok ? "Asistencia registrada correctamente." : resultado.msg}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-bg-card border border-bg-border rounded-lg p-4">
        <h2 className="font-semibold mb-2">Asistencias de hoy ({asistenciasHoy.length})</h2>
        {asistenciasHoy.length === 0 && <p className="text-muted text-sm">Aún no hay registros hoy.</p>}
        <ul className="flex flex-col gap-1 text-sm">
          {asistenciasHoy.map((a) => {
            const cliente = clientes.find((c) => c.id === a.clienteId);
            return (
              <li key={a.id} className="flex justify-between text-muted">
                <span>{cliente?.nombre}</span>
                <span>{a.hora}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
