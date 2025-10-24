import express from "express";
import {
  getSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} from "../controller/siswaController.js";
const router = express.Router();

router.get("/siswa", getSiswa);
router.get("/siswa/:id", getSiswaById);
router.post("/siswa", createSiswa);
router.put("/siswa/:id", updateSiswa);
router.delete("/siswa/:id", deleteSiswa);

export default router;
