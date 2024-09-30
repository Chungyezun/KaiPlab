from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class ChatRoom(Base):
    __tablename__ = "chat_rooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    start_time = Column(DateTime)
    max_members = Column(Integer)
    creator_id = Column(Integer, ForeignKey("users.id"))

    creator = relationship("User", back_populates="created_rooms")

User.created_rooms = relationship("ChatRoom", back_populates="creator")
