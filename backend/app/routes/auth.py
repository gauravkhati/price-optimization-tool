from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.users import UserCreate, UserLogin,Token
from ..services.auth import register_user, authenticate_user,logout_user

router=APIRouter()

@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user, db)

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    return authenticate_user(user, db)

@router.post("/logout")
def logout():
    return logout_user()