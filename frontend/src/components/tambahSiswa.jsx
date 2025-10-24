import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TambahSiswa() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    umur: "",
    alamat: "",
    tanggal: "",
    jurusan: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Minimal validation
    if (!form.nama || form.nama.trim() === "") {
      setError("Nama wajib diisi");
      return;
    }
    if (!form.umur || String(form.umur).trim() === "") {
      setError("Umur wajib diisi");
      return;
    }
    const umurNum = Number(form.umur);
    if (!Number.isInteger(umurNum) || umurNum <= 0) {
      setError("Umur harus berupa angka bulat positif");
      return;
    }
    if (!form.alamat || form.alamat.trim() === "") {
      setError("Alamat wajib diisi");
      return;
    }
    if (!form.tanggal || form.tanggal.trim() === "") {
      setError("Tanggal wajib diisi");
      return;
    }
    if (!form.jurusan || form.jurusan.trim() === "") {
      setError("Jurusan wajib diisi");
      return;
    }

    setLoading(true);
    try {
      // Convert umur to number to match Prisma schema (umur Int)
      const payload = { ...form, umur: umurNum };
      await axios.post("http://localhost:8888/siswa", payload, {
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || err.message || "Gagal menyimpan data"
      );
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
      <h2>Tambah Siswa</h2>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Nama</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Umur</label>
          <input
            name="umur"
            type="number"
            value={form.umur}
            onChange={handleChange}
            placeholder="Umur"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Alamat</label>
          <input
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            placeholder="Alamat"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Tanggal</label>
          <input
            name="tanggal"
            type="date"
            value={form.tanggal}
            onChange={handleChange}
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>Jurusan</label>
          <input
            name="jurusan"
            value={form.jurusan}
            onChange={handleChange}
            placeholder="Jurusan"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "8px 16px" }}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{ padding: "8px 16px" }}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default TambahSiswa;
