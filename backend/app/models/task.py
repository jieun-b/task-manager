from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database.base import Base


class TaskCategory(str, enum.Enum):
    TASK = "업무"
    REQUEST = "요청"
    ANNOUNCEMENT = "공지"
    QUESTION = "질문"
    DISCUSSION = "논의"


class TaskStatus(str, enum.Enum):
    TODO = "Todo"
    IN_PROGRESS = "In Progress"
    DONE = "Done"
    BLOCKED = "Blocked"


class Importance(str, enum.Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class Urgency(str, enum.Enum):
    URGENT = "Urgent"
    NORMAL = "Normal"
    LOW = "Low"


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True)
    category = Column(SQLEnum(TaskCategory), nullable=False, default=TaskCategory.TASK)
    status = Column(SQLEnum(TaskStatus), nullable=False, default=TaskStatus.TODO)
    importance = Column(SQLEnum(Importance), nullable=False, default=Importance.MEDIUM)
    urgency = Column(SQLEnum(Urgency), nullable=False, default=Urgency.NORMAL)
    
    # 담당자
    assignee_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    assignee = relationship("User", back_populates="tasks")
    
    # 태그 (쉼표로 구분된 문자열로 저장)
    tags = Column(String, nullable=True)
    
    # 마감일
    due_date = Column(DateTime, nullable=True)
    
    # 메타데이터
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Agent 분류 결과 (나중에 사용)
    classification_id = Column(Integer, ForeignKey("classifications.id"), nullable=True)
    classification = relationship("Classification", back_populates="tasks")

