import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1>Support CRM</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        <Link to="/create">
          Create Ticket
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;