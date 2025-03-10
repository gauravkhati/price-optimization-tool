from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from fastapi import Query
from fastapi import Header

class ProductBase(BaseModel):
    name: str
    category: str
    cost_price: float
    selling_price: float
    description: Optional[str] = None
    available_stock: float
    units_sold: Optional[int] = 0

class ProductCreate(ProductBase):
    pass

class FilterProduct(BaseModel):
    name:Optional[str] = Query(None)
    category:Optional[str] =Query(None)
    sort_by:Optional[str] = Query("created_at")
    order:Optional[str] = Query("desc")
    limit:Optional[int] = Query(10)
    skip:Optional[int] = Query(0)



class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    cost_price: Optional[float] = None
    selling_price: Optional[float] = None
    description: Optional[str] = None
    stock: Optional[int] = None
    units_sold: Optional[int] = None

class ProductResponse(BaseModel):
    id: str=None
    name: str=None
    category: str=None
    cost_price: float=None
    selling_price: float=None
    description: Optional[str] = None
    available_stock: float=None
    units_sold: Optional[int] = None
    customer_rating: Optional[float] = None
    demand_forecast: Optional[float] = None
    optimized_price: Optional[float] = None

class CreateProductResponse(BaseModel):
    id: str=None
    name: str=None
    category: str=None
    cost_price: float=None
    selling_price: float=None
    description: Optional[str] = None
    available_stock: float=None
    units_sold: Optional[int] = None
    customer_rating: Optional[float] = None

    class Config:
        from_attributes = True
        

class FilterProductResponse(BaseModel):
    total: int
    limit: int
    skip: int
    products: List[ProductResponse]

class BulkProductCreate(BaseModel):
    data: List[ProductCreate]   