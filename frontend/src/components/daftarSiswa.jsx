import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const DaftarSiswa = () => {
  const fetcher = async () => {
    const response = await axios.get("http://localhost:8888/siswa", {
      headers: { Accept: "application/json" },
    });
    return response.data;
  };
  const { mutate } = useSWRConfig();
  const deleteSiswa = async (id) => {
    if (window.confirm("Apakah anda ingin menghapus?"))
      await axios.delete(`http://localhost:8888/siswa/${id}`);
    mutate(`http://localhost:8888?siswa`);
  };

  const { data, error } = useSWR("http://localhost:8888/siswa", fetcher);
  if (error) return <h1>Gagal Memuat Data</h1>;
  if (!data) return <h1>Loading...</h1>;
  return (
    <div>
      <div>DaftarSiswa</div>
      <div className="flex mb-4 flex-col">
        <Link to="/tambah" className="">
          Tambah Data Siswa
        </Link>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Umur</th>
              <th>Alamat</th>
              <th>Tanggal</th>
              <th>Jurusan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((siswa, index) => (
                <tr key={siswa.id}>
                  <td>{index + 1}</td>
                  <td>{siswa.nama}</td>
                  <td>{siswa.umur}</td>
                  <td>{siswa.alamat}</td>
                  <td>{siswa.tanggal}</td>
                  <td>{siswa.jurusan}</td>
                  <td className="py-2 px-4 space-x-2">
                    <Link to={`/edit/${siswa.id}`} className="">
                      Edit
                    </Link>
                    <button onClick={() => deleteSiswa(siswa.id)} className="">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarSiswa;
