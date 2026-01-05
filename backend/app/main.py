from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.forward_chaining import forward_chaining
from app.models import DiagnosaRequest

app = FastAPI(
    title="Sistem Pakar Kematangan Pisang",
    description="Metode Forward Chaining",
    version="1.0"
)

# CORS (WAJIB untuk React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "OK",
        "message": "Sistem Pakar Kematangan Pisang Aktif",
        "metode": "Forward Chaining"
    }

@app.post("/diagnosa")
def diagnosa(data: DiagnosaRequest):
    hasil = forward_chaining(data.fakta)
    return hasil

from app.questions import QUESTIONS

@app.get("/pertanyaan/{index}")
def get_pertanyaan(index: int):
    if index >= len(QUESTIONS):
        return {"selesai": True}
    return QUESTIONS[index]
