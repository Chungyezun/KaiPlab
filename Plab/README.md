# KaiPlab: KAIST 풋살 모집 앱 (프론트엔드)

KaiPlab은 KAIST 학생들을 위한 풋살 모임 모집 플랫폼입니다. 이 저장소는 React Native를 사용한 모바일 앱의 프론트엔드 코드를 포함하고 있습니다.

## 주요 기능

- 풋살 모임 생성 및 참여
- 실시간 모임 상태 업데이트
- 사용자 프로필 관리
- 모임 검색 및 필터링

## 기술 스택

- React Native
- TypeScript
- React Navigation
- Axios (API 통신)

## 시작하기

### 사전 요구사항

- Node.js (v14 이상)
- npm 또는 Yarn
- React Native 개발 환경 ([React Native 공식 문서](https://reactnative.dev/docs/environment-setup) 참조)

### 설치

1. 저장소 클론:
   ```
   git clone https://github.com/Chungyezun/KaiPlab.git
   cd KaiPlab/Plab
   ```

2. 의존성 설치:
   ```
   npm install
   # 또는
   yarn install
   ```

3. iOS의 경우 추가 설정:
   ```
   cd ios && pod install && cd ..
   ```

### 실행

- iOS 시뮬레이터에서 실행:
  ```
  npm run ios
  # 또는
  yarn ios
  ```

- Android 에뮬레이터에서 실행:
  ```
  npm run android
  # 또는
  yarn android
  ```

## 개발

- `src/` 디렉토리에 주요 소스 코드가 있습니다.
- `src/screens/` 디렉토리에 각 화면 컴포넌트가 있습니다.
- `src/api/` 디렉토리에 API 통신 관련 코드가 있습니다.
- `src/navigation/` 디렉토리에 네비게이션 설정이 있습니다.

## 빌드 및 배포

(여기에 앱 빌드 및 배포 과정에 대한 설명을 추가하세요)

## 문제 해결

개발 중 문제가 발생하면 다음을 시도해보세요:

1. 의존성을 다시 설치합니다: `npm install` 또는 `yarn install`
2. 캐시를 지웁니다: `npm start -- --reset-cache`
3. iOS의 경우 `Pods`를 다시 설치합니다: `cd ios && pod install && cd ..`

## 기여하기

1. 이 저장소를 포크합니다.
2. 새 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`).
5. Pull Request를 생성합니다.

## 연락처

정예준 - maple0729@kaist.ac.kr

프로젝트 링크: https://github.com/Chungyezun/KaiPlab
