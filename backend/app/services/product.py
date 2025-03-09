from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from ..models.product import Product
from ..schemas.product import FilterProduct, ProductCreate
from sqlalchemy import asc, desc

def create_product(db: Session, product: ProductCreate):
    """ Create a new product """
    existing_product = db.query(Product).filter(Product.name == product.name).first()
    if existing_product:
        raise HTTPException(status_code=400, detail="Product already exists")

    new_product = Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

def get_products(db: Session):
    """ Retrieve all products """
    return db.query(Product).options(
        joinedload(Product.demand_forecast),
        joinedload(Product.price_optimization)
    ).all()

def get_filtered_products(db: Session, filter: FilterProduct):  
    query = db.query(Product)
    if filter.get("name"):  
        name=filter['name']
        query = query.filter(Product.name.ilike(f"%{name}%"))
    if filter.get("category"):
        query = query.filter(Product.category == filter["category"])
    
    # Sorting
    if filter.get("sort_by") in ["cost_price", "selling_price", "units_sold", "name"]:
        sort_func = asc if filter.get("order", "desc") == "asc" else desc
        query = query.order_by(sort_func(getattr(Product, filter["sort_by"])))

    # Pagination
    total_count = query.count()
    print('query',query)
    products = query.offset(filter.get("skip", 0)).limit(filter.get("limit", 10)).all()
    return {
        "total": total_count,
        "limit": filter.get("limit", 10),
        "skip": filter.get("skip", 0),
        "products": list(products)
    }

def get_product_by_id(db: Session, product_id: str):
    """ Retrieve a single product by ID """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

def update_product(db: Session, product_id: str, updated_product: ProductCreate):
    """ Update an existing product """
    product = db.query(Product).options(
        joinedload(Product.demand_forecast),
        joinedload(Product.price_optimization)
    ).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    for key, value in updated_product.dict().items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product

def delete_product(db: Session, product_id: str):
    """ Delete a product """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}
