from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine

# create database tables
models.Base.metadata.create_all(bind=engine)

# initialize FastAPI app
app = FastAPI(title="AI Product Recommender API")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.post("/api/products/", response_model=schemas.Product)
def create_product_route(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)


@app.get("/api/products/", response_model=list[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_products(db, skip=skip, limit=limit)


@app.get("/api/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


@app.put("/api/products/{product_id}", response_model=schemas.Product)
def update_product_route(product_id: int, updated_product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = crud.update_product(db, product_id, updated_product)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


@app.delete("/api/products/{product_id}", response_model=schemas.Product)
def delete_product_route(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.delete_product(db, product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


# Get recommended products
@app.get("/api/products/{product_id}/recommendations", response_model=list[schemas.Product])
def get_recommendations(product_id: int, db: Session = Depends(get_db)):
    recommendations = crud.get_recommended_products(db, product_id)
    if recommendations is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return recommendations

