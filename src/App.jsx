import React, { useState } from "react";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Clientes from "./pages/Clientes.jsx";
import Planes from "./pages/Planes.jsx";
import Reservas from "./pages/Reservas.jsx";
import CheckIn from "./pages/CheckIn.jsx";
import Pagos from "./pages/Pagos.jsx";
import Configuracion from "./pages/Configuracion.jsx";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    clientes: <Clientes />,
    planes: <Planes />,
    reservas: <Reservas />,
    checkin: <CheckIn />,
    pagos: <Pagos />,
    config: <Configuracion />,
  };

  return (
    <Layout current={page} onNavigate={setPage}>
      {pages[page]}
    </Layout>
  );
}
