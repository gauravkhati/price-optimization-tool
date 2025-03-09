from .middleware.errorHandling import ErrorHandlingMiddleware
from .middleware.authenticationMiddleware import AuthMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import CLIENT_ORIGIN
from .routes import auth,product
from .database import engine, Base

app=FastAPI()
#Create tables in PostgreSQL if they don’t exist
Base.metadata.create_all(bind=engine)
origins = [
    CLIENT_ORIGIN,
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(AuthMiddleware)
app.add_middleware(ErrorHandlingMiddleware)


app.include_router(auth.router, tags=['Auth'], prefix='/api')
app.include_router(product.router, tags=['Product'], prefix='/auth/api/product')


@app.get("/")
def health_check():
    return {"status":"ok"}
