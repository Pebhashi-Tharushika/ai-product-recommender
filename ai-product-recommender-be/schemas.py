from pydantic import BaseModel
from typing import Optional, List

# for creation and update
class ProductBase(BaseModel):
    name: str
    price: float
    category: str
    tags: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None

# for creating 
class ProductCreate(ProductBase):
    pass

# for reading 
class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True  # Allows conversion of SQLAlchemy model --> Pydantic schema --> JSON