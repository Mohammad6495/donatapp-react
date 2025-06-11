import http from "../../http";
import { API_URLs } from "../../CONSTANTS";

const ticket_apis = API_URLs.ticket;

// Get All Tickets
export const apiCall_getAllTickets = () => {
  return http.get(ticket_apis.getAllTickets);
};

//c Create a Ticket
export const apiCall_createTicket = ({ title, priority }) => {
  return http.post(ticket_apis.createTicket, { title, priority });
};

// Adding Message To Ticket
export const apiCall_addMessageToTicket = ({ ticketId, message }) => {
  return http.post(ticket_apis.addMessageToTicket, { ticketId, message });
};

// Get Ticket's Detail
export const apiCall_getTicketDetail = (id) => {
  return http.get(ticket_apis.getTicketDetail + "?id=" + id);
};
