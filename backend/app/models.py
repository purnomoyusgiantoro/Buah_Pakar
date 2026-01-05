# app/models.py

from pydantic import BaseModel
from typing import List

class DiagnosaRequest(BaseModel):
    fakta: List[str]
