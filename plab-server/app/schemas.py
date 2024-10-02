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
        from_attributes = True

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
        from_attributes = True

class MessageBase(BaseModel):
    content: str
    user_id: int
    room_id: int

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class ChatRoomMemberBase(BaseModel):
    user_id: int
    room_id: int

class ChatRoomMemberCreate(ChatRoomMemberBase):
    pass

class ChatRoomMember(ChatRoomMemberBase):
    id: int

    class Config:
        from_attributes = True
