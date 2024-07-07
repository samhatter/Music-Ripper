from fastapi import FastAPI, Response, status, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import faulthandler
import json

from src.endpoints import ripper_endpoints

# initialize fast api
app = FastAPI(title="Music Ripper")
faulthandler.enable()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    resources = {
        "Title": "Music Ripper"
    }
    return resources


app.include_router(
    ripper_endpoints.router,
    tags=["Ripper API"]
)
