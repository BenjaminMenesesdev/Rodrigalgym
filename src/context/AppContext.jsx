import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import {
  seedClientes,
  seedPlanes,
  seedHorarios,
  seedReservas,
  seedAsistencias,
  seedPagos,
  configDefault,
} from "../data/seed.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [clientes, setClientes] = useLocalStorage("rg_clientes", seedClientes);
  const [planes] = useLocalStorage("rg_planes", seedPlanes);
  const [horarios, setHorarios] = useLocalStorage("rg_horarios", seedHorarios);
  const [reservas, setReservas] = useLocalStorage("rg_reservas", seedReservas);
  const [asistencias, setAsistencias] = useLocalStorage("rg_asistencias", seedAsistencias);
  const [pagos, setPagos] = useLocalStorage("rg_pagos", seedPagos);
  const [config, setConfig] = useLocalStorage("rg_config", configDefault);

  function getPlan(planId) {
    return planes.find((p) => p.id === planId);
  }

  function getCliente(clienteId) {
    return clientes.find((c) => c.id === clienteId);
  }

  function agregarCliente(cliente) {
    const nuevo = { ...cliente, id: "c" + Date.now() };
    setClientes([...clientes, nuevo]);
    return nuevo;
  }

  function actualizarCliente(id, cambios) {
    setClientes(clientes.map((c) => (c.id === id ? { ...c, ...cambios } : c)));
  }

  function reservasDeHorario(horarioId, fecha) {
    return reservas.filter(
      (r) => r.horarioId === horarioId && r.fecha === fecha && r.estado === "confirmada"
    );
  }

  function crearReserva(clienteId, horarioId, fecha) {
    const horario = horarios.find((h) => h.id === horarioId);
    const cliente = getCliente(clienteId);
    if (!horario || !cliente) return { ok: false, msg: "Datos inválidos" };

    const plan = getPlan(cliente.planId);
    const esLibre = plan && plan.clases === null;

    if (!esLibre) {
      const ocupadas = reservasDeHorario(horarioId, fecha).length;
      if (ocupadas >= horario.cupo) {
        return { ok: false, msg: "El horario ya está lleno" };
      }
    }

    if (!esLibre && (cliente.clasesRestantes === null || cliente.clasesRestantes <= 0)) {
      return { ok: false, msg: "El cliente no tiene clases disponibles" };
    }

    const yaTieneReserva = reservas.find(
      (r) => r.clienteId === clienteId && r.horarioId === horarioId && r.fecha === fecha && r.estado === "confirmada"
    );
    if (yaTieneReserva) {
      return { ok: false, msg: "El cliente ya tiene reserva en ese horario" };
    }

    const nueva = {
      id: "r" + Date.now(),
      clienteId,
      horarioId,
      fecha,
      estado: "confirmada",
      creadaEn: new Date().toISOString(),
    };
    setReservas([...reservas, nueva]);
    return { ok: true, reserva: nueva };
  }

  function cancelarReserva(reservaId) {
    const reserva = reservas.find((r) => r.id === reservaId);
    if (!reserva) return { ok: false, msg: "Reserva no encontrada" };

    const horasDesdeCreacion = 100;
    if (horasDesdeCreacion < config.horasCancelacion) {
      return { ok: false, msg: `Debe cancelar con al menos ${config.horasCancelacion} horas de anticipación` };
    }
    setReservas(reservas.map((r) => (r.id === reservaId ? { ...r, estado: "cancelada" } : r)));
    return { ok: true };
  }

  function registrarAsistencia(clienteId, reservaId = null) {
    const cliente = getCliente(clienteId);
    if (!cliente) return { ok: false, msg: "Cliente no encontrado" };

    const plan = getPlan(cliente.planId);
    if (!plan) return { ok: false, msg: "El cliente no tiene un plan asignado" };

    const hoy = new Date().toISOString().slice(0, 10);
    if (cliente.finPlan < hoy) {
      return { ok: false, msg: "El plan de este cliente está vencido" };
    }

    const esLibre = plan.clases === null;

    if (!esLibre && (cliente.clasesRestantes === null || cliente.clasesRestantes <= 0)) {
      return { ok: false, msg: "El cliente no tiene clases disponibles" };
    }

    const yaAsistioHoy = asistencias.find(
      (a) => a.clienteId === clienteId && a.fecha === hoy && (reservaId ? a.reservaId === reservaId : true)
    );
    if (reservaId && yaAsistioHoy) {
      return { ok: false, msg: "Ya se registró la asistencia de esta reserva" };
    }

    const nuevaAsistencia = {
      id: "a" + Date.now(),
      clienteId,
      reservaId,
      fecha: hoy,
      hora: new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }),
      planUsado: plan.id,
      descontoClase: !esLibre,
    };
    setAsistencias([...asistencias, nuevaAsistencia]);

    if (!esLibre) {
      actualizarCliente(clienteId, { clasesRestantes: cliente.clasesRestantes - 1 });
    }

    if (reservaId) {
      setReservas(
        reservas.map((r) => (r.id === reservaId ? { ...r, estado: "completada" } : r))
      );
    }

    return { ok: true, asistencia: nuevaAsistencia };
  }

  function registrarPago(clienteId, monto, metodo) {
    const nuevo = {
      id: "pg" + Date.now(),
      clienteId,
      monto: Number(monto),
      metodo,
      fecha: new Date().toISOString().slice(0, 10),
    };
    setPagos([...pagos, nuevo]);
    actualizarCliente(clienteId, { estadoPago: "al_dia" });
    return nuevo;
  }

  const value = {
    clientes,
    planes,
    horarios,
    reservas,
    asistencias,
    pagos,
    config,
    setConfig,
    setHorarios,
    getPlan,
    getCliente,
    agregarCliente,
    actualizarCliente,
    reservasDeHorario,
    crearReserva,
    cancelarReserva,
    registrarAsistencia,
    registrarPago,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de AppProvider");
  return ctx;
}
