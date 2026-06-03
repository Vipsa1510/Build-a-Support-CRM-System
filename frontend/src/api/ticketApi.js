

import axios from "axios";

const API = axios.create({
  baseURL:
    "http://127.0.0.1:8010/api/tickets",
});

export const getTickets = (params) =>
  API.get("/", { params });

export const createTicket = (data) =>
  API.post("/", data);

export const getTicket = (ticketId) =>
  API.get(`/${ticketId}`);

export const updateTicket = (
  ticketId,
  data
) =>
  API.put(`/${ticketId}`, data);

export const getNotes = (
  ticketId
) =>
  API.get(
    `/${ticketId}/notes`
  );

export const addNote = (
  ticketId,
  data
) =>
  API.post(
    `/${ticketId}/notes`,
    data
  );