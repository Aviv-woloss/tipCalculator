from datetime import datetime
from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

DATABASE_URL = "postgresql://postgres:5342@localhost:5432/tip_calculator"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class CalculationModel(Base):
    __tablename__ = "calculations"

    id = Column(Integer, primary_key=True, index=True)
    bill_amount = Column(Float, nullable=False)
    tip_percentage = Column(Integer, nullable=False)
    number_of_people = Column(Integer, nullable=False)
    total_amount = Column(Float, nullable=False)
    amount_per_person = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class CalculationCreate(BaseModel):
    bill_amount: float
    tip_percentage: int
    number_of_people: int

class CalculationResponse(BaseModel):
    id: int
    bill_amount: float
    tip_percentage: int
    number_of_people: int
    total_amount: float
    amount_per_person: float
    created_at: datetime

    class Config:
        from_attributes = True

app = FastAPI(title="Tip Calculator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   
        "http://127.0.0.1:5173",
        "http://localhost:4200",    
        "http://127.0.0.1:4200"
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/calculations", response_model=CalculationResponse)
def create_calculation(data: CalculationCreate, db: Session = Depends(get_db)):
    if data.number_of_people <= 0:
        raise HTTPException(status_code=400, detail="Number of people must be greater than 0")
    
    tip_amount = data.bill_amount * (data.tip_percentage / 100)
    total_amount = data.bill_amount + tip_amount
    amount_per_person = total_amount / data.number_of_people

    db_calculation = CalculationModel(
        bill_amount=data.bill_amount,
        tip_percentage=data.tip_percentage,
        number_of_people=data.number_of_people,
        total_amount=round(total_amount, 2),
        amount_per_person=round(amount_per_person, 2)
    )
    
    db.add(db_calculation)
    db.commit()
    db.refresh(db_calculation)
    return db_calculation

@app.get("/api/calculations", response_model=List[CalculationResponse])
def get_calculations(db: Session = Depends(get_db)):
    calculations = db.query(CalculationModel).order_by(CalculationModel.created_at.desc()).all()
    return calculations