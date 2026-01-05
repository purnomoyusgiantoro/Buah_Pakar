import { useEffect, useState } from "react";

export default function Diagnosa() {
  const [index, setIndex] = useState(0);
  const [pertanyaan, setPertanyaan] = useState(null);
  const [fakta, setFakta] = useState([]);
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadPertanyaan = async (i) => {
    const res = await fetch(`http://127.0.0.1:8000/pertanyaan/${i}`);
    const data = await res.json();
    setPertanyaan(data);
  };

  useEffect(() => {
    loadPertanyaan(index);
  }, [index]);

  const jawab = (ya) => {
    if (ya && pertanyaan?.kode) {
      setFakta((prev) => [...prev, pertanyaan.kode]);
    }
    setIndex((prev) => prev + 1);
  };

  const diagnosa = async () => {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/diagnosa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fakta }),
    });
    const data = await res.json();
    setHasil(data);
    setLoading(false);
  };

  useEffect(() => {
    if (pertanyaan?.selesai) {
      diagnosa();
    }
  }, [pertanyaan]);

  if (loading) return <p className="p-6">Memproses diagnosa...</p>;

  if (hasil) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Hasil Diagnosa</h2>
        <pre>{JSON.stringify(hasil, null, 2)}</pre>
      </div>
    );
  }

  if (!pertanyaan) return <p className="p-6">Memuat pertanyaan...</p>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">{pertanyaan.teks}</h2>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => jawab(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Ya
        </button>
        <button
          onClick={() => jawab(false)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Tidak
        </button>
      </div>
    </div>
  );
}
