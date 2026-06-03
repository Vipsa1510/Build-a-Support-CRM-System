import { Link } from "react-router-dom";

function TicketCard({ ticket }) {
  return (
    <div className="border rounded p-4 shadow">

      <h2>{ticket.subject}</h2>

      <p>{ticket.customer_name}</p>

      <p>{ticket.status}</p>

      <Link
        to={`/ticket/${ticket.ticket_id}`}
      >
        View Details
      </Link>

    </div>
  );
}

export default TicketCard;