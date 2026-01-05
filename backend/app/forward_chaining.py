from app.rules import RULES

def forward_chaining(fakta_user):
    """
    Melakukan inferensi menggunakan metode Forward Chaining
    dengan perhitungan Certainty Factor (CF)
    """
    hasil_semua = []

    for rule in RULES:
        # Cari fakta yang cocok antara input user dan rule
        cocok = [f for f in rule["fakta"] if f in fakta_user]

        if cocok:
            # Hitung CF berdasarkan rasio fakta yang cocok
            cf_rule = len(cocok) / len(rule["fakta"])
            cf_total = cf_rule * rule["cf"]

            hasil_semua.append({
                "kode": rule["kode"],
                "hasil": rule["hasil"],
                "cf": round(cf_total, 2),
                "fakta_cocok": cocok,
                "total_fakta": len(rule["fakta"]),
                "fakta_terpenuhi": len(cocok)
            })

    # Jika tidak ada rule yang cocok
    if not hasil_semua:
        return {
            "kode": None,
            "hasil": "Tidak dapat ditentukan",
            "cf": 0,
            "fakta_cocok": [],
            "pesan": "Tidak ada aturan yang sesuai dengan gejala yang dipilih"
        }

    # Ambil hasil dengan CF tertinggi
    hasil_terbaik = max(hasil_semua, key=lambda x: x["cf"])
    
    # Tambahkan informasi alternatif diagnosis
    hasil_terbaik["alternatif"] = [
        {
            "kode": h["kode"],
            "hasil": h["hasil"],
            "cf": h["cf"]
        }
        for h in sorted(hasil_semua, key=lambda x: x["cf"], reverse=True)[1:4]
    ]
    
    return hasil_terbaik