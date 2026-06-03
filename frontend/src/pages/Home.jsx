import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../api/ticketApi";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTickets();
  }, [search, status]);

  const fetchTickets = async () => {
    try {
      const res = await getTickets({
        search,
        status,
      });

      setTickets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const total = tickets.length;

  const openCount = tickets.filter(
    (t) => t.status === "Open"
  ).length;

  const progressCount = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;

  const closedCount = tickets.filter(
    (t) => t.status === "Closed"
  ).length;

  return (
    <div className="min-h-screen bg-[#081426] text-white flex">

      {/* Sidebar */}

      <div className="
        w-64
        bg-[#0d1b31]
        border-r
        border-blue-900
        p-6
        hidden
        md:block
      ">

        <h1 className="
          text-2xl
          font-bold
          mb-10
        ">
          Support CRM
        </h1>

        <div className="space-y-4">

          <div className="
            bg-blue-600
            px-4
            py-3
            rounded-xl
          ">
            Dashboard
          </div>

          <Link
            to="/create"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-[#13294d]
            "
          >
            Create Ticket
          </Link>

        </div>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-8">

        {/* Header */}

        <div className="
          flex
          justify-between
          items-center
          mb-8
        ">

          <div>

            <h1 className="
              text-4xl
              font-bold
            ">
              Dashboard
            </h1>

            <p className="
              text-gray-400
              mt-2
            ">
              Manage support tickets
            </p>

          </div>

          <Link
            to="/create"
            className="
              bg-blue-600
              hover:bg-blue-500
              px-5
              py-3
              rounded-xl
              font-semibold
            "
          >
            + New Ticket
          </Link>

        </div>

        {/* Stats */}

        <div className="
          grid
          md:grid-cols-4
          gap-5
          mb-8
        ">

          <div className="
            bg-[#0d1b31]
            p-6
            rounded-2xl
            border
            border-blue-900
          ">
            <p className="text-gray-400">
              Total Tickets
            </p>

            <h2 className="
              text-4xl
              font-bold
              mt-2
            ">
              {total}
            </h2>
          </div>

          <div className="
            bg-[#0d1b31]
            p-6
            rounded-2xl
            border
            border-blue-900
          ">
            <p className="text-gray-400">
              Open
            </p>

            <h2 className="
              text-4xl
              font-bold
              text-blue-400
              mt-2
            ">
              {openCount}
            </h2>
          </div>

          <div className="
            bg-[#0d1b31]
            p-6
            rounded-2xl
            border
            border-blue-900
          ">
            <p className="text-gray-400">
              In Progress
            </p>

            <h2 className="
              text-4xl
              font-bold
              text-yellow-400
              mt-2
            ">
              {progressCount}
            </h2>
          </div>

          <div className="
            bg-[#0d1b31]
            p-6
            rounded-2xl
            border
            border-blue-900
          ">
            <p className="text-gray-400">
              Closed
            </p>

            <h2 className="
              text-4xl
              font-bold
              text-green-400
              mt-2
            ">
              {closedCount}
            </h2>
          </div>

        </div>

        {/* Filters */}

        <div className="
          bg-[#0d1b31]
          p-5
          rounded-2xl
          border
          border-blue-900
          mb-8
          flex
          gap-4
          flex-wrap
        ">

          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              flex-1
              bg-[#13294d]
              rounded-xl
              px-4
              py-3
              outline-none
            "
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="
              bg-[#13294d]
              rounded-xl
              px-4
              py-3
            "
          >
            <option value="">
              All Status
            </option>

            <option value="Open">
              Open
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Closed">
              Closed
            </option>

          </select>

        </div>

        {/* Ticket Table */}

        <div className="
          bg-[#0d1b31]
          rounded-2xl
          border
          border-blue-900
          overflow-hidden
        ">

          <table className="w-full">

            <thead>

              <tr className="
                border-b
                border-blue-900
              ">

                <th className="
                  text-left
                  p-4
                ">
                  Ticket ID
                </th>

                <th className="
                  text-left
                  p-4
                ">
                  Customer
                </th>

                <th className="
                  text-left
                  p-4
                ">
                  Subject
                </th>

                <th className="
                  text-left
                  p-4
                ">
                  Status
                </th>

                <th className="
                  text-left
                  p-4
                ">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {tickets.map((ticket) => (

                <tr
                  key={ticket.ticket_id}
                  className="
                    border-b
                    border-blue-950
                  "
                >

                  <td className="p-4">
                    {ticket.ticket_id}
                  </td>

                  <td className="p-4">
                    {ticket.customer_name}
                  </td>

                  <td className="p-4">
                    {ticket.subject}
                  </td>

                  <td className="p-4">

                    <span className={`
                      px-3 py-1 rounded-full text-sm
                      ${
                        ticket.status === "Open"
                          ? "bg-blue-500/20 text-blue-300"
                          : ticket.status === "Closed"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }
                    `}>
                      {ticket.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <Link
                      to={`/ticket/${ticket.ticket_id}`}
                      className="
                        text-blue-400
                        hover:text-blue-300
                      "
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}