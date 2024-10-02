from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import crud, models, schemas  
from app.database import engine, get_db 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("No SECRET_KEY set for")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=username)
    if user is None:
        raise credentials_exception
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/chat_rooms/", response_model=schemas.ChatRoom)
def create_chat_room(chat_room: schemas.ChatRoomCreate, current_user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_chat_room(db=db, chat_room=chat_room, user_id=current_user.id)

@app.get("/chat_rooms/", response_model=list[schemas.ChatRoom])
def read_chat_rooms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    chat_rooms = crud.get_chat_rooms(db, skip=skip, limit=limit)
    return chat_rooms

@app.post("/chat_rooms/{room_id}/join", response_model=schemas.ChatRoomMember)
def join_chat_room(
    room_id: int, 
    current_user: schemas.User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    db_room = crud.get_chat_room(db, room_id=room_id)
    if db_room is None:
        raise HTTPException(status_code=404, detail="채팅방을 찾을 수 없습니다")
    
    # 이미 참여한 사용자인지 확인
    existing_member = crud.get_chat_room_member(db, room_id=room_id, user_id=current_user.id)
    if existing_member:
        raise HTTPException(status_code=400, detail="이미 채팅방에 참여하고 있습니다")
    
    return crud.join_chat_room(db=db, room_id=room_id, user_id=current_user.id)

@app.get("/chat_rooms/{room_id}/messages", response_model=list[schemas.Message])
def read_messages(room_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    messages = crud.get_messages(db, room_id=room_id, skip=skip, limit=limit)
    return messages

@app.post("/chat_rooms/{room_id}/messages", response_model=schemas.Message)
def create_message(room_id: int, message: schemas.MessageCreate, current_user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_message(db=db, message=message, room_id=room_id, user_id=current_user.id)

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    logger.debug(f"Login attempt for user: {form_data.username}")
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        logger.warning(f"Failed login attempt for user: {form_data.username}")
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTP error occurred: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 실제 운영 환경에서는 구체적인 origin 지정
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)