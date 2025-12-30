from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api import tasks, dashboard
from app.database.base import Base, engine

# 데이터베이스 테이블 생성
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager MVP",
    description="Slack Bot + Web Dashboard 형태의 내부 업무 관리 서비스",
    version="0.1.0",
    redirect_slashes=False  # trailing slash 리다이렉트 비활성화
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(tasks.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {
        "message": "Task Manager MVP API",
        "version": "0.1.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}

