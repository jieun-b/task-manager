# 문제 해결 가이드

## 테스트 데이터가 보이지 않는 경우

### 1. 브라우저 개발자 도구 확인

**F12** 또는 **우클릭 > 검사**를 눌러 개발자 도구를 엽니다.

**Console 탭:**
- 빨간색 에러 메시지가 있는지 확인
- CORS 에러가 있는지 확인

**Network 탭:**
- `/api/tasks` 요청이 있는지 확인
- 요청 상태가 200인지 확인
- 응답 데이터가 있는지 확인

### 2. 서버 상태 확인

```bash
# Backend 확인
curl http://localhost:8000/health

# API 확인
curl http://localhost:8000/api/tasks/

# MySQL 확인
docker compose ps mysql
```

### 3. CORS 문제 해결

만약 CORS 에러가 보인다면:

1. `.env` 파일 확인:
```bash
cd backend
cat .env | grep CORS
# 다음이 포함되어야 함: ["http://localhost:3000","http://localhost:5173"]
```

2. Backend 재시작:
```bash
pkill -f "uvicorn app.main:app"
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

### 4. 데이터베이스 확인

```bash
# 테스트 데이터가 있는지 확인
docker compose exec mysql mysql -u task_user -ptask_password task_manager -e "SELECT COUNT(*) FROM tasks;"

# 데이터가 없다면 다시 생성
cd backend
source venv/bin/activate
python scripts/seed_data.py
```

### 5. Frontend 재시작

```bash
cd frontend
# Ctrl+C로 중지 후
npm run dev
```

### 6. 브라우저 캐시 클리어

- **Ctrl+Shift+R** (하드 리프레시)
- 또는 개발자 도구에서 "Disable cache" 체크

---

## 일반적인 문제

### 문제: "Network Error" 또는 CORS 에러
**해결:** Backend의 CORS 설정 확인 및 재시작

### 문제: "Empty state" 메시지
**해결:** 
1. Network 탭에서 API 응답 확인
2. 데이터베이스에 데이터가 있는지 확인
3. `seed_data.py` 실행

### 문제: 통계만 보이고 Task 목록이 안 보임
**해결:**
1. 브라우저 콘솔 확인
2. API 응답 형식 확인
3. Frontend 코드의 데이터 파싱 확인

