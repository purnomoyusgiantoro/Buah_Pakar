import { useEffect, useState } from "react";

export default function App() {
  const [index, setIndex] = useState(0);
  const [pertanyaan, setPertanyaan] = useState(null);
  const [fakta, setFakta] = useState([]);
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil pertanyaan dari backend
  const loadPertanyaan = async (i) => {
    const res = await fetch(`http://127.0.0.1:8000/pertanyaan/${i}`);
    const data = await res.json();
    setPertanyaan(data);
  };

  useEffect(() => {
    loadPertanyaan(index);
  }, [index]);

  const jawab = (ya) => {
    if (ya && pertanyaan.kode) {
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

  // Jika pertanyaan selesai → diagnosa
  useEffect(() => {
    if (pertanyaan?.selesai) {
      diagnosa();
    }
  }, [pertanyaan]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow rounded p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          Sistem Pakar Kematangan Pisang 🍌
        </h1>

        {!hasil && pertanyaan && !pertanyaan.selesai && (
          <>
            <p className="text-lg mb-6">{pertanyaan.pertanyaan}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => jawab(true)}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Ya
              </button>
              <button
                onClick={() => jawab(false)}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Tidak
              </button>
            </div>
          </>
        )}

        {loading && <p className="mt-4">Menganalisis...</p>}

        {hasil && (
          <div className="mt-4 bg-green-100 p-4 rounded">
            <h2 className="font-semibold">Hasil Diagnosa</h2>
            <p className="text-xl">{hasil.hasil}</p>
            <p className="text-sm mt-1">
              Tingkat Kepastian: {(hasil.cf * 100).toFixed(0)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
