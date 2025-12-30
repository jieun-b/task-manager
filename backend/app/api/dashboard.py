from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any
from app.database.base import get_db
from app.services.task_service import TaskService

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)) -> Dict[str, Any]:
    """대시보드 통계 데이터"""
    service = TaskService(db)
    return service.get_dashboard_stats()

