"""
테스트 데이터 생성 스크립트
"""
import sys
from pathlib import Path

# 프로젝트 루트를 Python 경로에 추가
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from sqlalchemy.orm import Session
from app.database.base import SessionLocal, engine, Base
from app.models.user import User
from app.models.task import Task, TaskCategory, TaskStatus, Importance, Urgency
from datetime import datetime, timedelta


def create_test_users(db: Session):
    """테스트 사용자 생성"""
    users_data = [
        {
            "display_name": "김철수",
            "slack_username": "kimcs",
            "email": "kimcs@example.com"
        },
        {
            "display_name": "이영희",
            "slack_username": "leeyh",
            "email": "leeyh@example.com"
        },
        {
            "display_name": "박민수",
            "slack_username": "parkms",
            "email": "parkms@example.com"
        },
        {
            "display_name": "정수진",
            "slack_username": "jeongsj",
            "email": "jeongsj@example.com"
        }
    ]
    
    users = []
    for user_data in users_data:
        existing = db.query(User).filter(User.slack_username == user_data["slack_username"]).first()
        if not existing:
            user = User(**user_data)
            db.add(user)
            users.append(user)
        else:
            users.append(existing)
    
    db.commit()
    return users


def create_test_tasks(db: Session, users: list):
    """테스트 Task 생성"""
    now = datetime.utcnow()
    
    tasks_data = [
        {
            "title": "API 문서 작성",
            "description": "REST API 문서를 작성하고 Swagger에 업데이트해야 합니다.",
            "category": TaskCategory.TASK,
            "status": TaskStatus.IN_PROGRESS,
            "importance": Importance.HIGH,
            "urgency": Urgency.URGENT,
            "assignee_id": users[0].id if users else None,
            "tags": "API,문서화,Swagger",
            "due_date": now + timedelta(days=1)
        },
        {
            "title": "데이터베이스 마이그레이션",
            "description": "PostgreSQL 스키마 변경 및 마이그레이션 스크립트 작성",
            "category": TaskCategory.TASK,
            "status": TaskStatus.TODO,
            "importance": Importance.HIGH,
            "urgency": Urgency.NORMAL,
            "assignee_id": users[1].id if users else None,
            "tags": "Database,PostgreSQL,마이그레이션",
            "due_date": now + timedelta(days=3)
        },
        {
            "title": "프론트엔드 대시보드 UI 개선",
            "description": "Task 카드 디자인 개선 및 필터 기능 추가",
            "category": TaskCategory.TASK,
            "status": TaskStatus.TODO,
            "importance": Importance.MEDIUM,
            "urgency": Urgency.NORMAL,
            "assignee_id": users[2].id if users else None,
            "tags": "Frontend,UI,React",
            "due_date": now + timedelta(days=5)
        },
        {
            "title": "Slack Bot 연동 테스트",
            "description": "Slack Events API 연동 및 메시지 수신 테스트",
            "category": TaskCategory.TASK,
            "status": TaskStatus.BLOCKED,
            "importance": Importance.MEDIUM,
            "urgency": Urgency.LOW,
            "assignee_id": users[0].id if users else None,
            "tags": "Slack,Bot,Integration",
            "due_date": now + timedelta(days=7)
        },
        {
            "title": "코드 리뷰 요청",
            "description": "PR #123 코드 리뷰 부탁드립니다.",
            "category": TaskCategory.REQUEST,
            "status": TaskStatus.TODO,
            "importance": Importance.MEDIUM,
            "urgency": Urgency.URGENT,
            "assignee_id": users[1].id if users else None,
            "tags": "코드리뷰,PR",
            "due_date": now + timedelta(days=1)
        },
        {
            "title": "주간 회의 안내",
            "description": "이번 주 금요일 오후 3시 주간 회의가 있습니다.",
            "category": TaskCategory.ANNOUNCEMENT,
            "status": TaskStatus.TODO,
            "importance": Importance.LOW,
            "urgency": Urgency.NORMAL,
            "assignee_id": None,
            "tags": "회의,공지",
            "due_date": now + timedelta(days=2)
        },
        {
            "title": "Agent AI 프롬프트 최적화 방법",
            "description": "Agent AI의 분류 정확도를 높이기 위한 프롬프트 개선 방안에 대해 논의하고 싶습니다.",
            "category": TaskCategory.DISCUSSION,
            "status": TaskStatus.TODO,
            "importance": Importance.MEDIUM,
            "urgency": Urgency.LOW,
            "assignee_id": users[3].id if users else None,
            "tags": "AI,프롬프트,논의",
            "due_date": None
        },
        {
            "title": "배포 프로세스 질문",
            "description": "프로덕션 배포 시 환경변수 설정 방법을 알려주세요.",
            "category": TaskCategory.QUESTION,
            "status": TaskStatus.TODO,
            "importance": Importance.LOW,
            "urgency": Urgency.URGENT,
            "assignee_id": users[1].id if users else None,
            "tags": "배포,질문",
            "due_date": now + timedelta(hours=12)
        },
        {
            "title": "성능 최적화 작업",
            "description": "데이터베이스 쿼리 최적화 및 인덱스 추가",
            "category": TaskCategory.TASK,
            "status": TaskStatus.DONE,
            "importance": Importance.HIGH,
            "urgency": Urgency.NORMAL,
            "assignee_id": users[2].id if users else None,
            "tags": "성능,최적화,Database",
            "due_date": now - timedelta(days=1)
        },
        {
            "title": "테스트 코드 작성",
            "description": "핵심 기능에 대한 단위 테스트 및 통합 테스트 작성",
            "category": TaskCategory.TASK,
            "status": TaskStatus.IN_PROGRESS,
            "importance": Importance.HIGH,
            "urgency": Urgency.NORMAL,
            "assignee_id": users[3].id if users else None,
            "tags": "테스트,QA",
            "due_date": now + timedelta(days=4)
        }
    ]
    
    tasks = []
    for task_data in tasks_data:
        existing = db.query(Task).filter(Task.title == task_data["title"]).first()
        if not existing:
            task = Task(**task_data)
            db.add(task)
            tasks.append(task)
        else:
            tasks.append(existing)
    
    db.commit()
    return tasks


def seed_database():
    """데이터베이스에 테스트 데이터 생성"""
    # 테이블 생성
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        print("Creating test users...")
        users = create_test_users(db)
        print(f"Created {len(users)} users")
        
        print("Creating test tasks...")
        tasks = create_test_tasks(db, users)
        print(f"Created {len(tasks)} tasks")
        
        print("✅ Database seeded successfully!")
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

