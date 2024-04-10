// Mock de pagos (payments)
const payments = [
  {
    id: 1,
    date: "2024-04-09",
    description: "Pago mensual",
    type: "Débito",
    transaction_Number: 123456,
    status: "Completado",
    amount: 100,
    amountPaid: 100,
    category: "Mensualidad",
  },
];

export const userMock = {
  id: 2,
  name: "pepe2",
  email: "pepe2@example.com",
  payments: [
    {
      amount: 190,
      amountPaid: 0,
      category: "servicios",
      date: "2024-04-09",
      description: "Payment for utilities",
      id: 7,
      status: "pendiente",
      transaction_Number: 1712695122,
      type: "efectivo",
      userId: 2,
    },
  ],
};

const users = [
  {
    id: 2,
    name: "pepe",
    email: "pepe@example.com",
    password: "password1",
    payments: payments,
  },
  {
    id: 2,
    name: "Usuario 2",
    email: "usuario2@example.com",
    password: "password2",
    payments: payments,
  },
];

export const userUpdateMock = {
  id: 2,
  name: "pepe",
  email: "pepe@example.com",
  payments: [
    {
      amount: 190,
      amountPaid: 0,
      category: "servicios",
      date: "2024-04-09",
      description: "Payment for utilities",
      id: 7,
      status: "pendiente",
      transaction_Number: 1712695122,
      type: "efectivo",
      userId: 2,
    },
  ],
};
