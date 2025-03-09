from app.services.product import create_product, delete_product, get_filtered_products, get_product_by_id, get_products, update_product
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..schemas.product import FilterProduct, FilterProductResponse, ProductCreate, ProductUpdate, ProductResponse,BulkProductCreate
from ..database import get_db
from ..models.product import Product
from typing import List, Optional

router = APIRouter()

@router.post("/", response_model=ProductResponse)
def create(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product)

@router.post("/bulkAdd",response_model=List[ProductResponse])
def bulk_add_products(products:BulkProductCreate, db: Session = Depends(get_db)):
    print('products',products)
    return [create_product(db, product) for product in products]


@router.get("/filter", response_model=FilterProductResponse)
def filter_products(  name: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("created_at"),
    order: Optional[str] = Query("desc"),
    limit: Optional[int] = Query(10),
    skip: Optional[int] = Query(0), db: Session = Depends(get_db)):
    filters={'category':category,'name':name,'sort_by':sort_by,'order':order,'limit':limit,'skip':skip}

    return get_filtered_products(db,filters)


# Read All Products
@router.get("/", response_model=List[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return get_products(db)




# Read a Product by ID
@router.get("/{product_id}", response_model=ProductResponse)
def retrieve(product_id: str, db: Session = Depends(get_db)):
    return get_product_by_id(db, product_id)

# Update a Product
@router.put("/{product_id}", response_model=ProductResponse)
def update(product_id: str, product_update: ProductUpdate, db: Session = Depends(get_db)):
  return update_product(db, product_id, product_update)

# ✅ Delete a Product
@router.delete("/{product_id}")
def delete(product_id: str, db: Session = Depends(get_db)):
   return delete_product(db, product_id)