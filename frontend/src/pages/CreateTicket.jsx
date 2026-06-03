import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createTicket } from "../api/ticketApi";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTicket(formData);

      alert("Ticket Created Successfully");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to create ticket");
    }
  };

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

      {/* Main */}

      <div className="flex-1 p-8">

        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-400 hover:text-blue-300"
        >
          ← Back to Dashboard
        </button>

        <div className="max-w-3xl">

          <h1 className="text-4xl font-bold mb-2">
            Create Ticket
          </h1>

          <p className="text-gray-400 mb-8">
            Add a new customer support request.
          </p>

          <form
            onSubmit={handleSubmit}
            className="
              bg-[#0d1b31]
              p-8
              rounded-2xl
              border
              border-blue-900
              space-y-6
            "
          >

            <div>
              <label className="block mb-2 text-gray-300">
                Customer Name
              </label>

              <input
                type="text"
                required
                className="
                  w-full
                  bg-[#13294d]
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                "
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customer_name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Customer Email
              </label>

              <input
                type="email"
                required
                className="
                  w-full
                  bg-[#13294d]
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                "
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customer_email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Subject
              </label>

              <input
                type="text"
                required
                className="
                  w-full
                  bg-[#13294d]
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                "
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Description
              </label>

              <textarea
                rows="6"
                required
                className="
                  w-full
                  bg-[#13294d]
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                "
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <button
              className="
                bg-blue-600
                hover:bg-blue-500
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              Create Ticket
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}