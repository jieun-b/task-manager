# Task Manager MVP

Slack Bot + Web Dashboard 형태의 내부 업무 관리 서비스

## 프로젝트 구조

```
task-manager-mvp/
├── backend/          # FastAPI Backend
├── frontend/         # React Frontend
└── README.md
```

## 시작하기

### 방법 1: Docker Compose 사용 (권장)

가장 간단한 방법입니다. MySQL과 Backend를 함께 실행합니다.

```bash
# Docker Compose로 MySQL과 Backend 실행
docker-compose up -d mysql

# Backend는 로컬에서 실행 (개발 편의성)
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# .env 파일의 DATABASE_URL은 docker-compose.yml의 MySQL 설정과 일치해야 합니다

# 데이터베이스 테이블 생성 및 테스트 데이터 삽입
python scripts/seed_data.py

# 서버 실행
uvicorn app.main:app --reload --port 8000
```

또는 Backend도 Docker로 실행:

```bash
# 모든 서비스 실행
docker-compose up -d

# 데이터베이스 초기화 (컨테이너 내에서)
docker-compose exec backend python scripts/seed_data.py
```

### 방법 2: 로컬 MySQL 설치

```bash
# MySQL 설치 (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install mysql-server

# MySQL 서비스 시작
sudo systemctl start mysql
sudo systemctl enable mysql

# 데이터베이스 생성
sudo mysql -u root -p
CREATE DATABASE task_manager;
CREATE USER 'task_user'@'localhost' IDENTIFIED BY 'task_password';
GRANT ALL PRIVILEGES ON task_manager.* TO 'task_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2. Backend 설정

```bash
cd backend

# 가상환경 생성 및 활성화
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.example .env
# .env 파일을 열어서 DATABASE_URL을 수정하세요
# 로컬 MySQL: mysql+pymysql://task_user:task_password@localhost:3306/task_manager
# Docker MySQL: mysql+pymysql://task_user:task_password@localhost:3306/task_manager

# 데이터베이스 테이블 생성 및 테스트 데이터 삽입
python scripts/seed_data.py

# 서버 실행
uvicorn app.main:app --reload --port 8000
```

Backend API는 `http://localhost:8000`에서 실행됩니다.
API 문서는 `http://localhost:8000/docs`에서 확인할 수 있습니다.

### 3. Frontend 설정

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

Frontend는 `http://localhost:3000`에서 실행됩니다.

## 주요 기능

### Backend
- Task CRUD API
- 필터링 및 검색 기능
- 대시보드 통계 API
- MySQL 데이터베이스 연동

### Frontend
- Task 목록/상세 보기
- 리스트 뷰 / 칸반 보드 뷰
- 필터링 (카테고리, 상태, 중요도, 긴급도)
- 검색 기능
- 대시보드 통계 표시

## 테스트 데이터

`scripts/seed_data.py`를 실행하면 다음 테스트 데이터가 생성됩니다:

- 4명의 테스트 사용자
- 10개의 다양한 Task (업무, 요청, 공지, 질문, 논의)

## API 엔드포인트

### Tasks
- `GET /api/tasks` - Task 목록 조회 (필터링 지원)
- `GET /api/tasks/{id}` - Task 상세 조회
- `POST /api/tasks` - Task 생성
- `PUT /api/tasks/{id}` - Task 업데이트
- `DELETE /api/tasks/{id}` - Task 삭제

### Dashboard
- `GET /api/dashboard/stats` - 대시보드 통계

## 다음 단계

- [ ] Slack Bot 연동
- [ ] Agent AI 연동 (분류 및 우선순위 판단)
- [ ] WebSocket 실시간 업데이트
- [ ] 사용자 인증 및 권한 관리

