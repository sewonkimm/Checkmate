from fastapi import FastAPI
import uvicorn
from dataclasses import asdict
from starlette.middleware.cors import CORSMiddleware
from app.common.config import conf
from app.database.conn import db
from app.routers import checkSpell, recommendWords

c = conf()
app = FastAPI()

# DataBase Initialization
conf_dict = asdict(c)
db.init_app(app, **conf_dict)

# Middleware Definition
app.add_middleware(
    CORSMiddleware,
    allow_origins=conf().ALLOW_SITE,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router Definition
app.include_router(checkSpell.router)
app.include_router(recommendWords.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
