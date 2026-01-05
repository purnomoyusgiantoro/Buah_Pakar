from app.rules import RULES

def forward_chaining(fakta_user):
    hasil_semua = []

    for rule in RULES:
        cocok = [f for f in rule["fakta"] if f in fakta_user]

        if cocok:
            cf_rule = len(cocok) / len(rule["fakta"])
            cf_total = cf_rule * rule["cf"]

            hasil_semua.append({
                "kode": rule["kode"],
                "hasil": rule["hasil"],
                "cf": round(cf_total, 2),
                "fakta_cocok": cocok
            })

    if not hasil_semua:
        return {
            "hasil": "Tidak dapat ditentukan",
            "cf": 0
        }

    return max(hasil_semua, key=lambda x: x["cf"])
