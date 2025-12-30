# Task Manager MVP

Slack Bot + Web Dashboard 형태의 내부 업무 관리 서비스

## 프로젝트 구조

```
task-manager-mvp/
├── backend/          # FastAPI Backend
├── frontend/         # React Frontend (Vite)
├── docker-compose.yml
└── README.md
```

## 현재 상태

### ✅ 완료된 작업
- [x] Git 리포지토리 초기화 및 GitHub 연동
- [x] PostgreSQL → MySQL 전환
- [x] Docker Compose 설정 (MySQL)
- [x] Backend API 구현 (Task CRUD, Dashboard 통계)
- [x] MySQL 한국어(UTF-8) 지원
- [x] 테스트 데이터 생성 (4명 사용자, 10개 Task)
- [x] Backend 서버 실행 중 (http://localhost:8000)

### ✅ 최근 완료
- [x] Node.js 업그레이드 완료 (nvm으로 v20.19.6 설치)
- [x] Frontend 서버 실행 성공 (http://localhost:5173)
- [x] Dashboard 기능 완성 (Task 목록 표시, 필터링, 통계)
- [x] Dashboard stats 카드 클릭 기능 (상태별 필터링)
- [x] 코드 정리 (디버깅 로그 제거)

### 📋 다음 단계
- [ ] Slack Bot 연동
- [ ] Agent AI 연동 (분류 및 우선순위 판단)
- [ ] WebSocket 실시간 업데이트
- [ ] 사용자 인증 및 권한 관리
- [ ] Task 생성/수정/삭제 UI 구현

---

## 서버 관리 방법

### 1. 데이터베이스 (MySQL)

**Docker Compose 사용 (권장):**

```bash
# MySQL 시작
docker compose up -d mysql

# MySQL 중지
docker compose down mysql

# MySQL 상태 확인
docker compose ps mysql

# MySQL 로그 확인
docker compose logs mysql
```

**포트:** 3306

**연결 정보:**
- Host: localhost
- Database: task_manager
- User: task_user
- Password: task_password

---

### 2. Backend 서버 (FastAPI)

**로컬 실행 (개발용):**

```bash
cd backend

# 가상환경 활성화
source venv/bin/activate

# 서버 실행
uvicorn app.main:app --reload --port 8000
```

**포트:** 8000

**주요 엔드포인트:**
- API 문서: http://localhost:8000/docs
- Health Check: http://localhost:8000/health
- Tasks API: http://localhost:8000/api/tasks
- Dashboard API: http://localhost:8000/api/dashboard/stats

**환경 변수:**
- `.env` 파일 필요 (`.env.example` 참고)
- `DATABASE_URL`: MySQL 연결 정보

**데이터베이스 초기화:**
```bash
cd backend
source venv/bin/activate
python scripts/seed_data.py
```

---

### 3. Frontend 서버 (React + Vite)

**요구사항:**
- Node.js v18 이상 (현재: v20.19.6 via nvm)
- npm 9 이상 (현재: v10.8.2)

**nvm 사용 (이미 설치되어 있음):**

새 터미널을 열 때마다 nvm이 자동으로 로드됩니다 (`.bashrc`에 설정됨).
만약 수동으로 활성화해야 한다면:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20
```

**설치 및 실행:**

```bash
cd frontend

# Node.js 버전 확인 (v20.19.6이어야 함)
node --version

# 의존성 설치 (처음 한 번만)
npm install

# 개발 서버 실행
npm run dev
```

**포트:** 5173

**접속:** http://localhost:5173

---

## 전체 실행 순서

### 처음 시작하는 경우

1. **MySQL 시작**
   ```bash
   docker compose up -d mysql
   ```

2. **Backend 설정 및 실행**
   ```bash
   cd backend
   source venv/bin/activate
   pip install -r requirements.txt  # 처음만
   cp .env.example .env
   python scripts/seed_data.py  # 테스트 데이터 생성
   uvicorn app.main:app --reload --port 8000
   ```

3. **Frontend 설정 및 실행**
   ```bash
   cd frontend
   npm install  # 처음만
   npm run dev
   ```

4. **브라우저 접속**
   - Frontend: http://localhost:5173
   - Backend API 문서: http://localhost:8000/docs

---

## 주요 기능

### Backend
- Task CRUD API
- 필터링 및 검색 기능
- 대시보드 통계 API
- MySQL 데이터베이스 연동 (UTF-8 지원)

### Frontend
- Task 목록/상세 보기
- 리스트 뷰 / 칸반 보드 뷰
- 필터링 (카테고리, 상태, 중요도, 긴급도)
- 검색 기능
- 대시보드 통계 표시

---

## API 엔드포인트

### Tasks
- `GET /api/tasks` - Task 목록 조회 (필터링 지원)
- `GET /api/tasks/{id}` - Task 상세 조회
- `POST /api/tasks` - Task 생성
- `PUT /api/tasks/{id}` - Task 업데이트
- `DELETE /api/tasks/{id}` - Task 삭제

### Dashboard
- `GET /api/dashboard/stats` - 대시보드 통계

---

## 테스트 데이터

`scripts/seed_data.py`를 실행하면 다음 테스트 데이터가 생성됩니다:
- 4명의 테스트 사용자
- 10개의 다양한 Task (업무, 요청, 공지, 질문, 논의)

---

## 기술 스택

- **Backend:** FastAPI, SQLAlchemy, MySQL, Python 3.9+
- **Frontend:** React, Vite, Zustand, Axios
- **Database:** MySQL 8.0 (Docker)
- **DevOps:** Docker Compose
