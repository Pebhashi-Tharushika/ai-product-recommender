from fastapi import FastAPI
from database import Base, engine, SessionLocal
import models

# initialize FastAPI app
app = FastAPI() 

# create database tables
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


