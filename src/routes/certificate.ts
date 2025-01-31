import { Router } from "express";
import protectRoute from "../middleware/auth";
import { createCertificate,getUser,getById,deleteCertificate } from "../controllers/certificate.controller";

const router = Router();
router.post("/create", protectRoute(), createCertificate);
router.get("/:userId", protectRoute(), getUser);
router.get("/:id", getById);
router.delete("/:id", protectRoute(), deleteCertificate);




export default router;