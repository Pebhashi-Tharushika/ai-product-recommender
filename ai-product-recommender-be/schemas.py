from pydantic import BaseModel
from typing import List, Optional

# for creation and update
class ProductBase(BaseModel):
    name: str
    price: float
    category: str
    description: str
    tags: Optional[List[str]] = None
    image_url: Optional[str] = None

# for creating 
class ProductCreate(ProductBase):
    pass

# for reading 
class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True  # Allows conversion of SQLAlchemy model --> Pydantic schema --> JSON