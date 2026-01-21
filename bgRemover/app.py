from fastapi import FastAPI, Response, UploadFile
from rembg import remove
from PIL import Image
import io
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://localhost:4000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/remove-bg")
async def home (image: UploadFile):
    data = await image.read()
    output = remove(data=data)
    return Response(content=output, media_type="image/png")



@app.get("/")
def test ():
    return {"Response":"App is running..."}




