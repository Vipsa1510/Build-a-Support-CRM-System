import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getTicket,
  updateTicket,
  getNotes,
  addNote,
} from "../api/ticketApi";

export default function TicketDetails() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ticketRes = await getTicket(ticketId);
      setTicket(ticketRes.data);
      setStatus(ticketRes.data.status);

      const notesRes = await getNotes(ticketId);
      setNotes(notesRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTicket(ticketId, {
        status,
      });

      alert("Status Updated");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      await addNote(ticketId, {
        note_text: newNote,
      });

      setNewNote("");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#081426] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081426] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0d1b31] border-r border-blue-900 p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-10">
          Support CRM
        </h1>

        <Link
          to="/"
          className="block px-4 py-3 rounded-xl hover:bg-[#13294d]"
        >
          Dashboard
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <button
          onClick={() => navigate("/")}
          className="text-blue-400 hover:text-blue-300 mb-6"
        >
          ← Back
        </button>

        <div className="bg-[#0d1b31] p-8 rounded-2xl border border-blue-900">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">
                {ticket.subject}
              </h1>

              <p className="text-gray-400 mt-2">
                {ticket.ticket_id}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm ${
                ticket.status === "Open"
                  ? "bg-blue-500/20 text-blue-300"
                  : ticket.status === "Closed"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}
            >
              {ticket.status}
            </span>
          </div>

          {/* Customer + Status */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Customer Information
              </h3>

              <p className="mb-2">
                <strong>Name:</strong>{" "}
                {ticket.customer_name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {ticket.customer_email}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Update Status
              </h3>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full bg-[#13294d] px-4 py-3 rounded-xl mb-4"
              >
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

              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl"
              >
                Update Status
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 pt-6 border-t border-blue-900">
            <h3 className="text-lg font-semibold mb-4">
              Description
            </h3>

            <p className="text-gray-300 leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Notes */}
          <div className="mt-10 pt-6 border-t border-blue-900">
            <h3 className="text-lg font-semibold mb-4">
              Activity Timeline
            </h3>

            <div className="space-y-4 mb-6">
              {notes.length === 0 && (
                <div className="text-gray-400">
                  No notes yet.
                </div>
              )}

              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-[#13294d] p-4 rounded-xl border border-blue-800"
                >
                  
                <p>{note.note_text}</p>

            <p className="text-xs text-gray-400 mt-2">
            {new Date(note.created_at).toLocaleString()}
            </p>
            </div>
                
              ))}
            </div>

            <textarea
              rows="3"
              value={newNote}
              onChange={(e) =>
                setNewNote(e.target.value)
              }
              placeholder="Add note..."
              className="w-full bg-[#13294d] rounded-xl p-4 mb-4"
            />

            <button
              onClick={handleAddNote}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}