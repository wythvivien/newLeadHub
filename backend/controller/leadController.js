import asyncHandler from "express-async-handler";
import Lead from "../models/leadModel.js";

// @desc    New Lead Entry
// route    POST /api/leads
// @access  Private

const createLead = asyncHandler(async (req, res) => {
  // Extracting the name, email and image of data submitted
  const { name, email, number, status } = req.body;

  // Get the user ID from the authenticated user
  const userId = req.user._id;

  // Create a new record into the database
  const lead = await Lead.create({ userId, name, email, number, status });

  if (lead) {
    res.status(201).json({
      _id: lead._id,
      userId: lead.userId,
      name: lead.name,
      email: lead.email,
      number: lead.number,
      status: lead.status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Lead Data");
  }
});

// @desc    Retrieve Lead Collection
// route    GET /api/leads
// @access  Private

const retrieveLeads = asyncHandler(async (req, res) => {
  // Get the userId from the authenticated user
  const { _id } = req.user;

  // Retrieve lead collection from the database
  const leads = await Lead.find({ userId: _id });
  res.status(200).json(leads);
});

// @desc    Get One Lead Document
// route    GET /api/leads/:id
// @access  Private

const getLead = asyncHandler(async (req, res) => {

  // Get ID parameter from the route path
  const { id } = req.params;

  // Get the userId from the authenticated user
  const { _id } = req.user;

  const lead = await Lead.findOne({ _id: id, userId: _id });
  res.status(200).json(lead);
});

// @desc    Update a Lead
// route    PUT /api/leads/:id
// @access  Private

const updateLead = asyncHandler(async (req, res) => {

  // Get ID parameter from the route path
  const { id } = req.params;

  // Get the userId from the authenticated user
  const { _id } = req.user;

  // Get Lead
  const lead = await Lead.findOne({ _id: id, userId: _id});

  if (lead) {
    lead.name = req.body.name || lead.name;
    lead.email = req.body.email || lead.email;
    lead.number = req.body.number || lead.number;
    lead.status = req.body.status || lead.status;

    const updatedLead = await lead.save();

    res.status(200).json({
      _id: updatedLead._id,
      userId: updatedLead.userId,
      name: updatedLead.name,
      email: updatedLead.email,
      number: updatedLead.number,
      status: updatedLead.status,
    });
    
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete a Lead
// route    DELETE /api/leads/:id
// @access  Private

const deleteLead = asyncHandler(async (req, res) => {
  // Get ID parameter from the route path
  const { id } = req.params;

  // Get the userId from the authenticated user
  const { _id } = req.user;

  // Get Lead
  const lead = await Lead.deleteOne({ _id: id, userId: _id });

  if (!lead) {
    res.status(404).json({ message: "Lead Not Found" });
  }

  res.status(200).json({ message: "Lead Deleted Successfully" });
});


// @desc    Sorting of Lead Collection
// route    GET /api/leads/recency
// @access  Private

const sortLeads = asyncHandler(async (req, res) => {
  // Get ID parameter from the route path
  const { sortBy } = req.query;
  const { _id } = req.user;

  // Get Lead Collection
  const lead = await Lead.find({ userId: _id });

  if (!lead) {
    res.status(404).json({ message: "Lead Not Found" });
  }

  res.status(200).json({ message: "Lead Deleted Successfully" });
});

// @desc    Filtering of Lead Collection
// route    GET /api/leads/recency
// @access  Private

const filterLeads = asyncHandler(async (req, res) => {
  // Get ID parameter from the route path
  const { sortBy } = req.query;
  const { _id } = req.user;
  
  // Get Lead Collection
  const lead = await Lead.find({ userId: _id });

  if (!lead) {
    res.status(404).json({ message: "Lead Not Found" });
  }

  res.status(200).json({ message: "Lead Deleted Successfully" });
});

// @desc    Sorting of Lead Collection
// route    GET /api/leads/recency
// @access  Private

const searchLeads = asyncHandler(async (req, res) => {
  // Get ID parameter from the route path
  const { sortBy } = req.query;
  const { _id } = req.user;
  
  // Get Lead Collection
  const lead = await Lead.find({ userId: _id });

  if (!lead) {
    res.status(404).json({ message: "Lead Not Found" });
  }

  res.status(200).json({ message: "Lead Deleted Successfully" });
});



export { createLead, retrieveLeads, getLead, updateLead, deleteLead };
