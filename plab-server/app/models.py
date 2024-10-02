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

class ChatRoomMember(Base):
    __tablename__ = "chat_room_members"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(Integer, ForeignKey("chat_rooms.id"))

    user = relationship("User", back_populates="joined_rooms")
    room = relationship("ChatRoom", back_populates="members")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    timestamp = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(Integer, ForeignKey("chat_rooms.id"))

    user = relationship("User", back_populates="messages")
    room = relationship("ChatRoom", back_populates="messages")

User.joined_rooms = relationship("ChatRoomMember", back_populates="user")
User.messages = relationship("Message", back_populates="user")
ChatRoom.members = relationship("ChatRoomMember", back_populates="room")
ChatRoom.messages = relationship("Message", back_populates="room")
