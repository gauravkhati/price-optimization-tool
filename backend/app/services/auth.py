from ..exceptions import BadRequestException
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from app.models.user import User
from ..schemas.users import UserCreate, UserLogin, Token
from ..core.security import hash_password, verify_password, create_access_token
from ..config import ACCESS_TOKEN_EXPIRE_MINUTES


# User Registration
def register_user(user: UserCreate, db: Session):
    """Register a new user."""
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise BadRequestException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    new_user = User(name=user.name,email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(
        data={"sub": new_user.email,"userRole":"user","name":new_user.name}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

# User Login
def authenticate_user(user: UserLogin, db: Session):
    """Authenticate user and return JWT token."""
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(
        data={"sub": db_user.email,"userRole":db_user.role,"name":db_user.name}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

# User Logout (Handled in frontend by removing token)
def logout_user():
    """Invalidate user session (handled in frontend by clearing token)."""
    return {"message": "User logged out successfully"}
