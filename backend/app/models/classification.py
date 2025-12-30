from sqlalchemy import Column, Integer, String, Float, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database.base import Base


class ClassificationCategory(str, enum.Enum):
    TASK = "업무"
    REQUEST = "요청"
    ANNOUNCEMENT = "공지"
    QUESTION = "질문"
    DISCUSSION = "논의"


class ClassificationImportance(str, enum.Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class ClassificationUrgency(str, enum.Enum):
    URGENT = "Urgent"
    NORMAL = "Normal"
    LOW = "Low"


class Classification(Base):
    __tablename__ = "classifications"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(SQLEnum(ClassificationCategory), nullable=False)
    importance = Column(SQLEnum(ClassificationImportance), nullable=False)
    urgency = Column(SQLEnum(ClassificationUrgency), nullable=False)
    tags = Column(String, nullable=True)  # JSON 문자열 또는 쉼표 구분
    summary = Column(String, nullable=True)
    confidence = Column(Float, nullable=True)  # 0.0 ~ 1.0
    
    # 원본 텍스트 (나중에 Agent가 분석한 원본)
    original_text = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # 관계
    tasks = relationship("Task", back_populates="classification")

