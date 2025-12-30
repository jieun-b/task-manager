from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    slack_user_id = Column(String, unique=True, nullable=True, index=True)
    slack_username = Column(String, nullable=True)
    display_name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 관계
    tasks = relationship("Task", back_populates="assignee")

