# Plab Server

이 프로젝트는 FastAPI를 사용한 백엔드 서버와 PostgreSQL 데이터베이스로 구성되어 있습니다.

## 시작하기

### 사전 요구사항

- Docker
- Docker Compose

### 환경 설정

1. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

   ```
   DB_USER=plab_admin
   DB_PASSWORD=your_secure_password
   DB_NAME=plab_db
   ```

   주의: 실제 사용 시 안전한 비밀번호로 변경하세요.

### 서버 및 데이터베이스 실행

1. 프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 서버와 데이터베이스를 시작하세요:

   ```
   docker-compose up -d
   ```

   이 명령어는 Docker 컨테이너를 백그라운드에서 실행합니다.

2. 서버가 정상적으로 실행되었는지 확인하려면 다음 명령어로 로그를 확인할 수 있습니다:

   ```
   docker-compose logs -f
   ```

   로그 확인을 중단하려면 `Ctrl+C`를 누르세요.

3. 서버가 실행되면 `http://localhost:8000/docs`에서 API 문서를 확인할 수 있습니다.

### 서버 및 데이터베이스 중지

서버와 데이터베이스를 중지하려면 다음 명령어를 실행하세요:

```
docker-compose down
```

## 데이터베이스 접속

PostgreSQL 데이터베이스에 직접 접속하려면 다음 명령어를 사용하세요:

```
docker exec -it plab-server-db-1 psql -U plab_admin -d plab_db
```

## 문제 해결

- 포트 충돌이 발생하는 경우, `docker-compose.yml` 파일에서 포트 설정을 변경하세요.
- 데이터베이스 연결 오류가 발생하면 `.env` 파일의 설정을 확인하세요.

추가적인 도움이 필요하면 [이슈를 생성](https://github.com/Chungyezun/KaiPlab/issues)해 주세요.
