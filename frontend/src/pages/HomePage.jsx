import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000";

/* =========================
   HOME PAGE
========================= */
function HomePage({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-amber-300 to-green-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
      
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center relative z-10 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="text-9xl mb-6 animate-bounce">🍌</div>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent mb-4">
          Sistem Pakar Kematangan Pisang
        </h1>
        <div className="inline-block bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
          🧠 Metode Forward Chaining
        </div>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-xl mx-auto">
          Jawab serangkaian pertanyaan sesuai kondisi fisik pisang untuk mendapatkan hasil diagnosa tingkat kematangan yang akurat.
        </p>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl active:scale-95"
        >
          🚀 Mulai Diagnosa
        </button>

        <div className="mt-8 flex justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Cepat & Akurat</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Mudah Digunakan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Hasil Terpercaya</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   QUESTION PAGE
========================= */
function QuestionPage({ index, fakta, onNext, onFinish }) {
  const [pertanyaan, setPertanyaan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetchPertanyaan();
  }, [index]);

  const fetchPertanyaan = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/pertanyaan/${index}`);
      const data = await res.json();

      if (data?.selesai) {
        onFinish();
      } else {
        setPertanyaan(data);
      }
    } catch (err) {
      console.error("Gagal mengambil pertanyaan:", err);
      onFinish();
    } finally {
      setLoading(false);
    }
  };

  const jawab = (ya) => {
    setSelectedAnswer(ya);
    setTimeout(() => {
      if (ya && pertanyaan?.kode) {
        onNext(pertanyaan.kode);
      } else {
        onNext(null);
      }
      setSelectedAnswer(null);
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-amber-300 to-green-400">
        <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl text-center">
          <div className="text-7xl mb-4 inline-block animate-spin">🍌</div>
          <p className="text-lg font-semibold text-gray-700">Memuat pertanyaan...</p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!pertanyaan) return null;

  const progress = ((index + 1) / 10) * 100; // Assuming max 10 questions

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-amber-300 to-green-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative z-10">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Pertanyaan {index + 1}
            </span>
            <span className="text-sm font-semibold text-green-600">
              {Math.min(progress, 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-2xl p-8 mb-6 border-2 border-yellow-200">
          <div className="text-5xl mb-4 text-center">🤔</div>
          <h2 className="text-2xl font-bold text-center text-gray-800 leading-relaxed">
            {pertanyaan.pertanyaan}
          </h2>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => jawab(true)}
            className={`flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
              selectedAnswer === true ? "scale-95 shadow-inner" : ""
            }`}
          >
            <span className="text-2xl">✓</span>
            <span className="text-xl">Ya</span>
          </button>
          <button
            onClick={() => jawab(false)}
            className={`flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
              selectedAnswer === false ? "scale-95 shadow-inner" : ""
            }`}
          >
            <span className="text-2xl">✗</span>
            <span className="text-xl">Tidak</span>
          </button>
        </div>

        {fakta.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📋</span>
              <p className="text-sm font-bold text-green-800">Fakta Terkumpul:</p>
              <span className="ml-auto bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {fakta.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {fakta.map((f, i) => (
                <span
                  key={i}
                  className="text-xs bg-white text-green-700 px-3 py-2 rounded-lg font-semibold shadow-sm border border-green-200 transform hover:scale-105 transition-transform"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   RESULT PAGE
========================= */
function ResultPage({ fakta, onRestart }) {
  const [hasil, setHasil] = useState(null);

  useEffect(() => {
    diagnosa();
  }, []);

  const diagnosa = async () => {
    try {
      const res = await fetch(`${API_URL}/diagnosa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fakta }),
      });
      const data = await res.json();
      setHasil(data);
    } catch (err) {
      setHasil({ hasil: "Error", cf: 0 });
    }
  };

  if (!hasil) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-amber-300 to-green-400">
        <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl text-center">
          <div className="text-7xl mb-4 animate-pulse">🔍</div>
          <p className="text-lg font-semibold text-gray-700">Menganalisis data...</p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  const cfPercent = hasil.cf * 100;
  const getEmoji = () => {
    if (cfPercent >= 80) return "🎉";
    if (cfPercent >= 60) return "👍";
    if (cfPercent >= 40) return "🤔";
    return "⚠️";
  };

  const getConfidenceColor = () => {
    if (cfPercent >= 80) return "from-green-600 to-green-700";
    if (cfPercent >= 60) return "from-blue-600 to-blue-700";
    if (cfPercent >= 40) return "from-yellow-600 to-yellow-700";
    return "from-red-600 to-red-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-amber-300 to-green-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Celebration elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center relative z-10 transform animate-fadeIn">
        <div className="text-6xl mb-4 animate-bounce">{getEmoji()}</div>
        <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
          Hasil Diagnosa
        </h2>

        <div className={`bg-gradient-to-r ${getConfidenceColor()} text-white rounded-2xl p-8 mb-6 shadow-xl transform hover:scale-105 transition-transform`}>
          <div className="text-sm font-semibold mb-2 opacity-90">
            Tingkat Kematangan:
          </div>
          <h3 className="text-5xl font-extrabold mb-4">{hasil.hasil}</h3>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
            <p className="text-2xl font-bold">
              {cfPercent.toFixed(0)}%
            </p>
            <p className="text-sm opacity-90">Tingkat Kepastian</p>
          </div>
        </div>

        {/* Confidence bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${getConfidenceColor()} h-full rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${cfPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Facts summary */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border-2 border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl">📊</span>
            <p className="text-sm font-bold text-gray-700">Berdasarkan {fakta.length} fakta yang teridentifikasi</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {fakta.map((f, i) => (
              <span
                key={i}
                className="text-xs bg-white text-gray-700 px-3 py-2 rounded-lg font-semibold shadow-sm border border-gray-300"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 px-12 rounded-full text-xl w-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          🔄 Diagnosa Lagi
        </button>
      </div>
    </div>
  );
}

/* =========================
   MAIN APP
========================= */
export default function App() {
  const [page, setPage] = useState("home");
  const [index, setIndex] = useState(0);
  const [fakta, setFakta] = useState([]);

  const start = () => {
    setPage("question");
    setIndex(0);
    setFakta([]);
  };

  const next = (kode) => {
    if (kode) setFakta((prev) => [...prev, kode]);
    setIndex((prev) => prev + 1);
  };

  const finish = () => setPage("result");

  return (
    <>
      {page === "home" && <HomePage onStart={start} />}
      {page === "question" && (
        <QuestionPage
          index={index}
          fakta={fakta}
          onNext={next}
          onFinish={finish}
        />
      )}
      {page === "result" && (
        <ResultPage fakta={fakta} onRestart={() => setPage("home")} />
      )}
    </>
  );
}