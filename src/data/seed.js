export const seedPlanes = [
  { id: "p8", nombre: "8 clases", clases: 8, vendible: true, duracionDias: 30 },
  { id: "p12", nombre: "12 clases", clases: 12, vendible: true, duracionDias: 30 },
  { id: "p16", nombre: "16 clases", clases: 16, vendible: true, duracionDias: 30 },
  { id: "p20", nombre: "20 clases", clases: 20, vendible: true, duracionDias: 30 },
  { id: "libre", nombre: "Plan libre", clases: null, vendible: true, duracionDias: 30 },
  { id: "antiguo", nombre: "Plan antiguo (descontinuado)", clases: 10, vendible: false, duracionDias: 30 },
];

const hoy = new Date();
function addDias(base, dias) {
  const d = new Date(base);
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}
function restaDias(base, dias) {
  return addDias(base, -dias);
}

export const seedClientes = [
  {
    id: "c1",
    nombre: "Camila Rojas",
    telefono: "+56911111111",
    cumpleanos: addDias(hoy, 5),
    fechaIngreso: restaDias(hoy, 200),
    planId: "p8",
    inicioPlan: restaDias(hoy, 20),
    finPlan: addDias(hoy, 10),
    clasesRestantes: 2,
    estadoPago: "al_dia",
  },
  {
    id: "c2",
    nombre: "Matías Fuentes",
    telefono: "+56922222222",
    cumpleanos: addDias(hoy, 40),
    fechaIngreso: restaDias(hoy, 400),
    planId: "p12",
    inicioPlan: restaDias(hoy, 5),
    finPlan: addDias(hoy, 25),
    clasesRestantes: 10,
    estadoPago: "al_dia",
  },
  {
    id: "c3",
    nombre: "Francisca Soto",
    telefono: "+56933333333",
    cumpleanos: addDias(hoy, 120),
    fechaIngreso: restaDias(hoy, 60),
    planId: "libre",
    inicioPlan: restaDias(hoy, 10),
    finPlan: addDias(hoy, 20),
    clasesRestantes: null,
    estadoPago: "al_dia",
  },
  {
    id: "c4",
    nombre: "Diego Herrera",
    telefono: "+56944444444",
    cumpleanos: addDias(hoy, 200),
    fechaIngreso: restaDias(hoy, 500),
    planId: "p16",
    inicioPlan: restaDias(hoy, 40),
    finPlan: restaDias(hoy, 5),
    clasesRestantes: 3,
    estadoPago: "atrasado",
  },
  {
    id: "c5",
    nombre: "Valentina Muñoz",
    telefono: "+56955555555",
    cumpleanos: addDias(hoy, 15),
    fechaIngreso: restaDias(hoy, 15),
    planId: "p20",
    inicioPlan: restaDias(hoy, 3),
    finPlan: addDias(hoy, 27),
    clasesRestantes: 0,
    estadoPago: "al_dia",
  },
  {
    id: "c6",
    nombre: "Benjamín Castro",
    telefono: "+56966666666",
    cumpleanos: addDias(hoy, 300),
    fechaIngreso: restaDias(hoy, 900),
    planId: "antiguo",
    inicioPlan: restaDias(hoy, 10),
    finPlan: addDias(hoy, 20),
    clasesRestantes: 4,
    estadoPago: "al_dia",
  },
];

export const seedHorarios = [
  { id: "h1", dia: "Lunes", hora: "08:30", cupo: 5 },
  { id: "h2", dia: "Lunes", hora: "18:00", cupo: 5 },
  { id: "h3", dia: "Martes", hora: "08:30", cupo: 5 },
  { id: "h4", dia: "Martes", hora: "19:00", cupo: 4 },
  { id: "h5", dia: "Miercoles", hora: "18:00", cupo: 5 },
  { id: "h6", dia: "Sabado", hora: "10:00", cupo: 5 },
];

export const seedReservas = [
  { id: "r1", clienteId: "c1", horarioId: "h1", fecha: hoy.toISOString().slice(0, 10), estado: "confirmada" },
  { id: "r2", clienteId: "c2", horarioId: "h1", fecha: hoy.toISOString().slice(0, 10), estado: "confirmada" },
];

export const seedAsistencias = [];

export const seedPagos = [
  { id: "pg1", clienteId: "c2", monto: 25000, metodo: "Transferencia", fecha: restaDias(hoy, 5) },
  { id: "pg2", clienteId: "c1", monto: 18000, metodo: "Efectivo", fecha: restaDias(hoy, 20) },
];

export const configDefault = {
  horarioGimnasio: {
    semana: "08:30 - 22:00",
    sabado: "09:00 - 14:00",
    domingo: "Cerrado",
  },
  cupoDefault: 5,
  horasCancelacion: 12,
};
