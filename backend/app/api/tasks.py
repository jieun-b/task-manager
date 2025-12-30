from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from app.database.base import get_db
from app.services.task_service import TaskService
from app.models.task import Task

router = APIRouter(prefix="/api/tasks", tags=["tasks"])


# Pydantic 스키마
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = "업무"
    status: Optional[str] = "Todo"
    assignee_id: Optional[int] = None
    tags: Optional[str] = None
    due_date: Optional[datetime] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    assignee_id: Optional[int] = None
    tags: Optional[str] = None
    due_date: Optional[datetime] = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    category: str
    status: str
    assignee_id: Optional[int]
    tags: Optional[str]
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """Task 생성"""
    service = TaskService(db)
    task_data = task.dict()
    created_task = service.create_task(task_data)
    return created_task


@router.get("/", response_model=List[TaskResponse])
def get_tasks(
    category: Optional[str] = Query(None, description="카테고리 필터"),
    status: Optional[str] = Query(None, description="상태 필터"),
    assignee_id: Optional[int] = Query(None, description="담당자 ID 필터"),
    search: Optional[str] = Query(None, description="검색어"),
    limit: int = Query(100, ge=1, le=1000),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    """Task 목록 조회"""
    service = TaskService(db)
    tasks = service.get_tasks(
        category=category,
        status=status,
        assignee_id=assignee_id,
        search=search,
        limit=limit,
        offset=offset
    )
    return tasks


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """Task 상세 조회"""
    service = TaskService(db)
    task = service.get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    """Task 업데이트"""
    service = TaskService(db)
    task_data = {k: v for k, v in task.dict().items() if v is not None}
    updated_task = service.update_task(task_id, task_data)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """Task 삭제"""
    service = TaskService(db)
    success = service.delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return None

