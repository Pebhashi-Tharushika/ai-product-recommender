from typing import List, cast
from sqlalchemy import and_, or_
from sqlalchemy.orm import Session 
import models, schemas

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()


def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()


def update_product(db: Session, product_id: int, product: schemas.ProductCreate):
    db_product = get_product(db, product_id)
    if db_product:
        for key, value in product.model_dump(exclude_unset=True).items():
            setattr(db_product, key, value)
        db.commit()
        db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int):
    db_product = get_product(db, product_id)
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product


def get_recommended_products(db: Session, product_id: int, limit: int = 5):

    current_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if current_product is None:
        return None
    
    query = db.query(models.Product).filter(models.Product.id != product_id)

    # based on same category
    category_rule = models.Product.category == current_product.category
    

    # based on similar price range (+/- 20%)
    price_min = current_product.price * 0.8
    price_max = current_product.price * 1.2
    price_rule = and_(models.Product.price >= price_min, models.Product.price <= price_max)


    all_rules = [category_rule, price_rule]

    # based on shared tags
    tag_rules = None

    tags_list: List[str] = cast(List[str], current_product.tags)
    if tags_list is not None and len(tags_list) > 0:
        tag_rules = models.Product.tags.op('@>')(tags_list) 
        
    if tag_rules is not None:
        all_rules.append(tag_rules)
        
    combined_filter = or_(*all_rules)
   
    recommendations = query.filter(combined_filter).limit(limit).all()
    
    return recommendations
