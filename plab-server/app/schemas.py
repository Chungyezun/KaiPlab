from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class ChatRoomBase(BaseModel):
    name: str
    description: str
    start_time: datetime
    max_members: int

class ChatRoomCreate(ChatRoomBase):
    pass

class ChatRoom(ChatRoomBase):
    id: int
    creator_id: int

    class Config:
        orm_mode = True
