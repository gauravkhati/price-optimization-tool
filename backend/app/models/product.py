from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from ..database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))  # Unique Product ID
    name = Column(String, unique=True, nullable=False)
    category = Column(String, nullable=False)
    cost_price = Column(Float, nullable=False)
    selling_price = Column(Float, nullable=False)
    description = Column(String, nullable=True)
    available_stock = Column(Integer, nullable=False)
    units_sold = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    customer_rating=Column(Float, default=0)

    # Relationships
    demand_forecast = relationship("DemandForecast", back_populates="product", cascade="all, delete")
    price_optimization = relationship("PriceOptimization", back_populates="product", cascade="all, delete")


class DemandForecast(Base):
    __tablename__ = "demand_forecasts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))  # Unique Forecast ID
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    demand_forecast = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to Product Table
    product = relationship("Product", back_populates="demand_forecast")


class PriceOptimization(Base):
    __tablename__ = "price_optimization"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))  
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    optimized_price = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to Product Table
    product = relationship("Product", back_populates="price_optimization")