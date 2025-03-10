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

def get_filtered_products(db: Session, filters: FilterProduct):   
    query = db.query(Product)
    if filters.get("name"):  
        name=filters['name']
        query = query.filter(Product.name.ilike(f"%{name}%"))
    if filters.get("category"):
        query = query.filter(Product.category == filters["category"])
    
    # Sorting
    if filters.get("sort_by") in ["cost_price", "selling_price", "units_sold", "name"]:
        sort_func = asc if filters.get("order", "desc") == "asc" else desc
        query = query.order_by(sort_func(getattr(Product, filters["sort_by"])))

    # Pagination
    total_count = query.count()
    query = query.offset(filters.get("skip", 0)).limit(filters.get("limit", 10))
    if filters.get('select'):
        columns = [getattr(Product, col) for col in filters['select'] if hasattr(Product, col)]
        print('columns',columns)
        if columns:

            query = query.with_entities(*columns)
    print('query',query)
    products=query.all()
    print('products',products)

    return {
        "total": total_count,
        "limit": filters.get("limit", 10),
        "skip": filters.get("skip", 0),
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
