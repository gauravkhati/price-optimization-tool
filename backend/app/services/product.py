from ..core.calculations import calculate_demand_forecast, calculate_optimized_price
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from ..models.product import DemandForecast, PriceOptimization, Product
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

    # Calculate demand forecast
    forecasted_demand = calculate_demand_forecast(
        available_stock=new_product.available_stock, 
        units_sold=new_product.units_sold
    )

    # Store demand forecast in DB
    demand_forecast_entry = DemandForecast(
        product_id=new_product.id,
        demand_forecast=forecasted_demand
    )
    db.add(demand_forecast_entry)
    
    # Calculate optimized price
    optimized_price = calculate_optimized_price(
        cost_price=new_product.cost_price, 
        selling_price=new_product.selling_price, 
        demand_forecast=forecasted_demand
    )

    # Store optimized price in DB
    price_optimization_entry = PriceOptimization(
        product_id=new_product.id,
        optimized_price=optimized_price
    )
    db.add(price_optimization_entry)

    # Commit all changes
    db.commit()
    return new_product

def get_products(db: Session):
    """ Retrieve all products """
    return db.query(Product).options(
        joinedload(Product.demand_forecast),
        joinedload(Product.price_optimization)
    ).all()

def get_filtered_products(db: Session, filters: dict):
    query = db.query(Product).options(
        joinedload(Product.demand_forecast),  
        joinedload(Product.price_optimization)  
    )
    # Filtering
    if filters.get("name"):  
        query = query.filter(Product.name.ilike(f"%{filters['name']}%"))
    if filters.get("category"):
        query = query.filter(Product.category == filters["category"])

    # Sorting
    if filters.get("sort_by") in ["cost_price", "selling_price", "units_sold", "name"]:
        sort_func = asc if filters.get("order", "desc") == "asc" else desc
        query = query.order_by(sort_func(getattr(Product, filters["sort_by"])))

    # Pagination
    total_count = query.count()
    query = query.offset(filters.get("skip", 0)).limit(filters.get("limit", 10))

    # Selecting specific columns (optional)
    if filters.get("select"):
        columns = [getattr(Product, col) for col in filters["select"] if hasattr(Product, col)]
        if columns:
            query = query.with_entities(*columns)

    # Fetch results
    products = query.all()

    # Formatting output with related data
    product_list = []
    for product in products:
        product_data = {
            "id": product.id,
            "name": product.name,
            "category": product.category,
            "cost_price": product.cost_price,
            "selling_price": product.selling_price,
            "available_stock": product.available_stock,
            "units_sold": product.units_sold,
            "description": product.description,
            "customer_rating": product.customer_rating,
            "created_at": product.created_at,
            "updated_at": product.updated_at,
            "demand_forecast": product.demand_forecast[0].demand_forecast if product.demand_forecast else None,
            "optimized_price": product.price_optimization[0].optimized_price if product.price_optimization else None
        }
        product_list.append(product_data)

    return {
        "total": total_count,
        "limit": filters.get("limit", 10),
        "skip": filters.get("skip", 0),
        "products": product_list
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
