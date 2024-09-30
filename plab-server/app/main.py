from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas  
from app.database import engine, get_db 

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/chat_rooms/", response_model=schemas.ChatRoom)
def create_chat_room(chat_room: schemas.ChatRoomCreate, user_id: int, db: Session = Depends(get_db)):
    return crud.create_chat_room(db=db, chat_room=chat_room, user_id=user_id)

@app.get("/chat_rooms/", response_model=list[schemas.ChatRoom])
def read_chat_rooms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    chat_rooms = crud.get_chat_rooms(db, skip=skip, limit=limit)
    return chat_rooms