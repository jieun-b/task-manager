from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# MySQL 연결 시 charset 설정 (한글 지원)
if "mysql" in settings.database_url:
    # URL에 charset 파라미터 추가
    if "charset" not in settings.database_url:
        separator = "&" if "?" in settings.database_url else "?"
        settings.database_url = f"{settings.database_url}{separator}charset=utf8mb4"
    
    engine = create_engine(
        settings.database_url,
        connect_args={"charset": "utf8mb4", "use_unicode": True},
        pool_pre_ping=True
    )
    
    # 연결 시 charset 명시적으로 설정
    @event.listens_for(engine, "connect", insert=True)
    def set_charset(dbapi_conn, connection_record):
        cursor = dbapi_conn.cursor()
        cursor.execute("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci")
        cursor.close()
else:
    engine = create_engine(settings.database_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency for getting database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

