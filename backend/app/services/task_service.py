from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from app.database.repositories.task_repository import TaskRepository
from app.models.task import Task, TaskCategory, TaskStatus, Importance, Urgency
from datetime import datetime


class TaskService:
    def __init__(self, db: Session):
        self.repository = TaskRepository(db)
        self.db = db
    
    def create_task(self, task_data: Dict[str, Any]) -> Task:
        """Task 생성"""
        return self.repository.create(task_data)
    
    def get_task(self, task_id: int) -> Optional[Task]:
        """Task 조회"""
        return self.repository.get_by_id(task_id)
    
    def get_tasks(
        self,
        category: Optional[str] = None,
        status: Optional[str] = None,
        importance: Optional[str] = None,
        urgency: Optional[str] = None,
        assignee_id: Optional[int] = None,
        search: Optional[str] = None,
        limit: int = 100,
        offset: int = 0
    ) -> List[Task]:
        """Task 목록 조회 (필터링 지원)"""
        # 문자열을 Enum으로 변환
        category_enum = TaskCategory(category) if category else None
        status_enum = TaskStatus(status) if status else None
        importance_enum = Importance(importance) if importance else None
        urgency_enum = Urgency(urgency) if urgency else None
        
        return self.repository.get_all(
            category=category_enum,
            status=status_enum,
            importance=importance_enum,
            urgency=urgency_enum,
            assignee_id=assignee_id,
            search=search,
            limit=limit,
            offset=offset
        )
    
    def update_task(self, task_id: int, task_data: Dict[str, Any]) -> Optional[Task]:
        """Task 업데이트"""
        # Enum 변환이 필요한 필드 처리
        if "category" in task_data and isinstance(task_data["category"], str):
            task_data["category"] = TaskCategory(task_data["category"])
        if "status" in task_data and isinstance(task_data["status"], str):
            task_data["status"] = TaskStatus(task_data["status"])
        if "importance" in task_data and isinstance(task_data["importance"], str):
            task_data["importance"] = Importance(task_data["importance"])
        if "urgency" in task_data and isinstance(task_data["urgency"], str):
            task_data["urgency"] = Urgency(task_data["urgency"])
        
        return self.repository.update(task_id, task_data)
    
    def delete_task(self, task_id: int) -> bool:
        """Task 삭제"""
        return self.repository.delete(task_id)
    
    def get_dashboard_stats(self) -> Dict[str, Any]:
        """대시보드 통계 데이터"""
        total = self.repository.count()
        todo = len(self.repository.get_by_status(TaskStatus.TODO))
        in_progress = len(self.repository.get_by_status(TaskStatus.IN_PROGRESS))
        done = len(self.repository.get_by_status(TaskStatus.DONE))
        blocked = len(self.repository.get_by_status(TaskStatus.BLOCKED))
        urgent = len(self.repository.get_urgent_tasks())
        
        return {
            "total": total,
            "by_status": {
                "todo": todo,
                "in_progress": in_progress,
                "done": done,
                "blocked": blocked
            },
            "urgent_count": urgent
        }

