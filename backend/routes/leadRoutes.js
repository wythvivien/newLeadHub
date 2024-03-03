import express from "express";
import {
  createLead,
  retrieveLeads,
  getLead,
    updateLead,
  deleteLead
} from "../controller/leadController.js";

const router = express.Router();
router.route("/").post(createLead).get(retrieveLeads);
router.route("/:id").get(getLead).put(updateLead).delete(deleteLead);

export default router;
