import React, { useState, useEffect } from "react";

function App() {
  const [successMessage, setSuccessMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch contacts from backend
  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contacts");
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Add new contact
  const addContact = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const newContact = await res.json();
    setContacts([...contacts, newContact]);
    setName("");
    setEmail("");
    setSuccessMessage("Contact added successfully!");
    setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
  };

  // Delete contact
  const deleteContact = async (id) => {
    await fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: "DELETE",
    });
    setContacts(contacts.filter((c) => c._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Manager</h2>

      {successMessage && (
        <div style={{ color: "green", marginBottom: "10px" }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={addContact}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>

      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} ({contact.email})
            <button
              onClick={() => deleteContact(contact._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
