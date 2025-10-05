from sqlalchemy.dialects.postgresql import ARRAY 
from sqlalchemy import Column, Integer, String, Float, Text
from database import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=False)
    tags = Column(ARRAY(String), nullable=True)
    image_url = Column(String, nullable=True)