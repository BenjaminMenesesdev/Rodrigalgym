import React, { useState } from "react";

const NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "clientes", label: "Clientes" },
  { id: "planes", label: "Planes" },
  { id: "reservas", label: "Reservas" },
  { id: "checkin", label: "Check-in" },
  { id: "pagos", label: "Pagos" },
  { id: "config", label: "Configuración" },
];

export default function Layout({ current, onNavigate, children }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function ir(id) {
    onNavigate(id);
    setMenuAbierto(false);
  }

  return (
    <div className="min-h-screen bg-bg text-white flex flex-col">
      <header className="bg-bg-card border-b border-bg-border px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-brand-orange flex items-center justify-center font-bold text-black">
            RG
          </div>
          <span className="font-semibold text-lg">RodriGal Gym</span>
        </div>
        <button
          className="md:hidden text-white border border-bg-border rounded px-3 py-1"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          Menú
        </button>
        <nav className="hidden md:flex gap-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => ir(item.id)}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                current === item.id
                  ? "bg-brand-orange text-black font-semibold"
                  : "text-muted hover:text-white hover:bg-bg-border"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {menuAbierto && (
        <nav className="md:hidden bg-bg-card border-b border-bg-border flex flex-col p-2 gap-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => ir(item.id)}
              className={`px-3 py-2 rounded text-sm text-left ${
                current === item.id
                  ? "bg-brand-orange text-black font-semibold"
                  : "text-muted hover:text-white hover:bg-bg-border"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}

      <main className="flex-1 p-4 md:p-6 max-w-6xl w-full mx-auto">{children}</main>

      <footer className="text-center text-xs text-muted py-4 border-t border-bg-border">
        RodriGal Gym · MVP de demostración · Datos guardados localmente en tu navegador
      </footer>
    </div>
  );
}
