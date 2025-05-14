const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// GET all contacts
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// POST a new contact
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const newContact = new Contact({ name, email });
  await newContact.save();
  res.json(newContact);
});

// DELETE a contact
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

module.exports = router;
