from fastapi import FastAPI, Response, UploadFile
from rembg import remove
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:4000",
    "http://localhost:3000",
    "https://background-remover-neon.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load model session once to make it faster
from rembg import new_session
session = new_session()

@app.post("/remove-bg")
async def remove_bg(image: UploadFile):
    data = await image.read()
    output = remove(data=data, session=session)
    return Response(content=output, media_type="image/png")


@app.get("/")
def test():
    return {"Response": "App is running..."}


# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 8000))  
#     uvicorn.run("app:app", host="0.0.0.0", port=port, workers=1)




