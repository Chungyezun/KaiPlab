from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_chat_rooms(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ChatRoom).offset(skip).limit(limit).all()

def create_chat_room(db: Session, chat_room: schemas.ChatRoomCreate, user_id: int):
    db_chat_room = models.ChatRoom(**chat_room.dict(), creator_id=user_id)
    db.add(db_chat_room)
    db.commit()
    db.refresh(db_chat_room)
    return db_chat_room
