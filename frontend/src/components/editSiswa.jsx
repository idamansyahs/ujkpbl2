import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSiswa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    umur: "",
    alamat: "",
    tanggal: "",
    jurusan: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/siswa/${id}`);
        if (!mounted) return;
        const data = res.data || {};
        setForm({
          nama: data.nama ?? "",
          umur: data.umur ?? "",
          alamat: data.alamat ?? "",
          tanggal: data.tanggal ?? "",
          jurusan: data.jurusan ?? "",
        });
        setLoading(false);
      } catch (err) {
        if (!mounted) return;
        setError(
          err.response?.data?.message || err.message || "Gagal memuat data"
        );
        setLoading(false);
      }
    };

    if (id) fetchData();
    else setLoading(false);

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
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

    setSaving(true);
    try {
      const payload = { ...form, umur: umurNum };
      await axios.put(`http://localhost:8888/siswa/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      setSaving(false);
      navigate("/");
    } catch (err) {
      setSaving(false);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal menyimpan perubahan"
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
      <h2>Edit Siswa</h2>
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
            disabled={saving}
            style={{ padding: "8px 16px" }}
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
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

export default EditSiswa;
