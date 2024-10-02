# KaiPlab: KAIST 풋살 모집 앱 (개발 중)

KaiPlab은 KAIST 학생들을 위한 풋살 모임 모집 플랫폼입니다. 이 앱을 통해 사용자들은 쉽게 풋살 모임을 만들고 참여할 수 있습니다.

## 주요 기능

- 풋살 모임 생성 및 관리
- 실시간 모임 참여 및 취소
- 사용자 프로필 관리
- 모임 검색 및 필터링

## 기술 스택

### 프론트엔드
- React Native
- TypeScript
- Expo (선택적)

### 백엔드
- FastAPI (Python)
- PostgreSQL

### 인프라
- Docker
- Docker Compose

## 시작하기

### 사전 요구사항

- Node.js 및 npm (또는 yarn)
- Python 3.8+
- Docker 및 Docker Compose

### 환경 설정

1. 저장소를 클론합니다:
   ```
   git clone https://github.com/Chungyezun/KaiPlab.git
   cd KaiPlab
   ```

2. 프론트엔드 설정:
   ```
   cd Plab
   npm install
   ```

3. 백엔드 설정:
   ```
   cd ../plab-server
   pip install -r requirements.txt
   ```

4. `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다.

### 실행 방법

1. 백엔드 서버 실행:
   ```
   cd plab-server
   docker-compose up -d
   ```

2. 프론트엔드 앱 실행:
   ```
   cd ../Plab
   npm start
   ```

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`).
5. Pull Request를 생성합니다.

## 연락처

정예준 - chungyezun@kaist.ac.kr

프로젝트 링크: https://github.com/Chungyezun/KaiPlab
