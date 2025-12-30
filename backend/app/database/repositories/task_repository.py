from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import List, Optional
from datetime import datetime
from app.models.task import Task, TaskCategory, TaskStatus, Importance, Urgency


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, task_data: dict) -> Task:
        task = Task(**task_data)
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task
    
    def get_by_id(self, task_id: int) -> Optional[Task]:
        return self.db.query(Task).filter(Task.id == task_id).first()
    
    def get_all(
        self,
        category: Optional[TaskCategory] = None,
        status: Optional[TaskStatus] = None,
        importance: Optional[Importance] = None,
        urgency: Optional[Urgency] = None,
        assignee_id: Optional[int] = None,
        search: Optional[str] = None,
        limit: int = 100,
        offset: int = 0
    ) -> List[Task]:
        query = self.db.query(Task)
        
        if category:
            query = query.filter(Task.category == category)
        if status:
            query = query.filter(Task.status == status)
        if importance:
            query = query.filter(Task.importance == importance)
        if urgency:
            query = query.filter(Task.urgency == urgency)
        if assignee_id:
            query = query.filter(Task.assignee_id == assignee_id)
        if search:
            query = query.filter(
                or_(
                    Task.title.ilike(f"%{search}%"),
                    Task.description.ilike(f"%{search}%")
                )
            )
        
        return query.order_by(Task.created_at.desc()).offset(offset).limit(limit).all()
    
    def update(self, task_id: int, task_data: dict) -> Optional[Task]:
        task = self.get_by_id(task_id)
        if not task:
            return None
        
        for key, value in task_data.items():
            setattr(task, key, value)
        
        task.updated_at = datetime.utcnow()
        self.db.commit()
        self.db.refresh(task)
        return task
    
    def delete(self, task_id: int) -> bool:
        task = self.get_by_id(task_id)
        if not task:
            return False
        
        self.db.delete(task)
        self.db.commit()
        return True
    
    def count(self) -> int:
        return self.db.query(Task).count()
    
    def get_by_status(self, status: TaskStatus) -> List[Task]:
        return self.db.query(Task).filter(Task.status == status).all()
    
    def get_urgent_tasks(self) -> List[Task]:
        return self.db.query(Task).filter(
            and_(
                Task.urgency == Urgency.URGENT,
                Task.status != TaskStatus.DONE
            )
        ).all()

