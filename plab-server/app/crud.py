from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
from datetime import datetime

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

def join_chat_room(db: Session, room_id: int, user_id: int):
    db_member = models.ChatRoomMember(user_id=user_id, room_id=room_id)
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

def get_messages(db: Session, room_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Message).filter(models.Message.room_id == room_id).offset(skip).limit(limit).all()

def create_message(db: Session, message: schemas.MessageCreate, room_id: int):
    db_message = models.Message(**message.dict(), room_id=room_id, timestamp=datetime.now())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user or not pwd_context.verify(password, user.hashed_password):
        return False
    return user

def get_chat_room_member(db: Session, room_id: int, user_id: int):
    return db.query(models.ChatRoomMember).filter(
        models.ChatRoomMember.room_id == room_id,
        models.ChatRoomMember.user_id == user_id
    ).first()
