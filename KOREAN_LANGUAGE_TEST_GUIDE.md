# n8n 한국어 언어 지원 테스트 가이드

이 가이드는 n8n의 한국어 언어 지원 기능을 테스트하는 방법을 설명합니다.

## 📋 사전 요구사항

- **Node.js**: v20.x 이상
- **pnpm**: v8.x 이상 (없으면 `corepack enable`로 활성화)
- **메모리**: 최소 8GB RAM 권장
- **디스크 공간**: 최소 5GB 여유 공간
- **시간**: 초기 설치 및 빌드에 30-60분 소요

## 🚀 설치 및 실행

### 1단계: 저장소 클론

```bash
# 저장소 클론
git clone https://github.com/edumagiceco/n8n.git
cd n8n

# n8n-cjk 브랜치로 전환
git checkout n8n-cjk

# 현재 브랜치 확인
git branch
# 출력: * n8n-cjk
```

### 2단계: pnpm 설치 (필요한 경우)

```bash
# pnpm 버전 확인
pnpm --version

# 없으면 corepack으로 활성화
corepack enable
corepack prepare --activate

# 또는 npm으로 전역 설치
npm install -g pnpm
```

### 3단계: 의존성 설치

```bash
# 모든 패키지의 의존성 설치 (10-20분 소요)
pnpm install

# 설치 중 에러가 발생하면:
# - Node.js 버전 확인: node --version (v20.x 이상 필요)
# - 캐시 정리 후 재시도: pnpm store prune && pnpm install
```

### 4단계: 프로젝트 빌드

```bash
# 전체 프로젝트 빌드 (10-30분 소요)
# 출력을 파일로 저장하여 나중에 확인 가능
pnpm build > build.log 2>&1

# 빌드 진행 상황 확인 (다른 터미널에서)
tail -f build.log

# 빌드 완료 확인
tail -n 20 build.log
# 에러 없이 완료되면 OK
```

**리소스가 부족한 경우 (8GB 미만 RAM):**
```bash
# 프론트엔드만 빌드 (더 빠름, 5-10분)
cd packages/frontend/@n8n/i18n
pnpm build
cd ../../editor-ui
pnpm build
cd ../../../..
```

### 5단계: 개발 서버 실행

#### 옵션 A: 전체 개발 환경 (권장)
```bash
# 백엔드 + 프론트엔드 동시 실행
pnpm dev

# 또는 따로 실행 (리소스 절약)
# 터미널 1: 백엔드
pnpm dev:be

# 터미널 2: 프론트엔드
pnpm dev:fe
```

#### 옵션 B: 프론트엔드만 (더 빠름)
```bash
# 프론트엔드 개발 서버만 실행
cd packages/frontend/editor-ui
pnpm dev

# 접속: http://localhost:5173
```

서버가 시작되면 다음과 같은 메시지가 표시됩니다:
```
n8n ready on, port: 5678
Editor is now accessible via: http://localhost:5678/
```

## 🧪 테스트 시나리오

### 테스트 1: 초기 상태 확인 (영어)

1. **브라우저에서 접속**
   ```
   http://localhost:5678
   ```

2. **회원가입 또는 로그인**
   - 초기 실행 시 소유자 계정 설정 화면이 나타남
   - 이메일, 비밀번호, 이름 입력
   - "Continue" 버튼 클릭

3. **UI 언어 확인**
   - 기본 언어는 영어로 설정됨
   - 메뉴: "Workflows", "Credentials", "Executions" 등

### 테스트 2: 한국어로 전환

1. **언어 선택 메뉴 접근**
   - 좌측 하단 사용자 아바타(프로필 사진) 클릭
   - 팝업 메뉴 확인

2. **메뉴 구조 확인**
   ```
   ⚙️ Settings
   🌐 Language / 언어  ← 이것이 새로 추가된 항목
   🚪 Sign out
   ```

3. **한국어 선택**
   - "Language / 언어" 메뉴 클릭
   - 서브메뉴 확인:
     - English
     - 한국어
   - "한국어" 클릭

4. **즉시 변경 확인**
   - 페이지 리로드 없이 즉시 UI가 한국어로 변경
   - 좌측 메뉴바 확인:
     - "Workflows" → "워크플로우"
     - "Credentials" → "인증 정보"
     - "Executions" → "실행"
     - "Templates" → "템플릿"
     - "Help" → "도움말"
     - "Settings" → "설정"

### 테스트 3: 주요 기능별 한국어 확인

#### 3-1. 워크플로우 화면
```
1. 좌측 메뉴에서 "워크플로우" 클릭
2. 확인 사항:
   - "새 워크플로우" 버튼
   - "검색..." 입력창
   - 상태: "활성화", "비활성화"
```

#### 3-2. 노드 추가
```
1. 워크플로우 캔버스에서 "+" 버튼 클릭
2. 확인 사항:
   - "노드 추가" 제목
   - "노드 검색..." 입력창
   - 검색 결과 표시
```

#### 3-3. 실행 목록
```
1. 좌측 메뉴에서 "실행" 클릭
2. 확인 사항:
   - 상태: "실행 중", "성공", "실패", "대기 중"
   - 필터: "모든 워크플로우", "모든 상태"
   - 버튼: "새로고침", "자동 새로고침"
```

#### 3-4. 인증 정보
```
1. 좌측 메뉴에서 "인증 정보" 클릭
2. 확인 사항:
   - "새로 추가" 버튼
   - "인증 정보 검색..." 입력창
   - 정렬: "마지막 업데이트순 정렬"
```

### 테스트 4: 언어 지속성 확인

1. **브라우저 새로고침 (F5)**
   - UI가 여전히 한국어로 표시되는지 확인

2. **브라우저 완전히 닫고 재접속**
   - 브라우저 종료
   - 다시 http://localhost:5678 접속
   - 자동으로 한국어로 표시되는지 확인

3. **LocalStorage 확인 (개발자 도구)**
   ```
   F12 → Console 탭
   localStorage.getItem('n8n-language')
   // 출력: "ko"
   ```

### 테스트 5: 영어로 다시 전환

1. **영어 선택**
   - 사용자 메뉴 → "Language / 언어" → "English"

2. **변경 확인**
   - 즉시 영어로 변경
   - 메뉴: "Workflows", "Credentials" 등

3. **LocalStorage 확인**
   ```javascript
   localStorage.getItem('n8n-language')
   // 출력: "en"
   ```

## ✅ 테스트 체크리스트

### 기본 기능
- [ ] 브라우저에서 n8n 접속 성공
- [ ] 로그인/회원가입 완료
- [ ] 사용자 메뉴 열림
- [ ] "Language / 언어" 메뉴 항목 표시
- [ ] 언어 서브메뉴 표시 (English, 한국어)

### 한국어 전환
- [ ] "한국어" 클릭 시 즉시 변경
- [ ] 좌측 메뉴가 한국어로 표시
- [ ] 버튼 텍스트가 한국어로 표시
- [ ] 워크플로우 화면 한국어 표시
- [ ] 실행 목록 한국어 표시
- [ ] 인증 정보 화면 한국어 표시

### 언어 지속성
- [ ] 새로고침 후에도 한국어 유지
- [ ] 브라우저 재시작 후에도 한국어 유지
- [ ] localStorage에 'n8n-language': 'ko' 저장됨

### 영어 전환
- [ ] "English" 클릭 시 즉시 영어로 변경
- [ ] localStorage에 'n8n-language': 'en' 저장됨

## 🐛 문제 해결

### 빌드 에러

**증상**: `pnpm build` 중 에러 발생

**해결 방법**:
```bash
# 1. Node.js 버전 확인 (v20.x 이상 필요)
node --version

# 2. 캐시 정리
pnpm store prune

# 3. node_modules 삭제 후 재설치
rm -rf node_modules
pnpm install

# 4. 다시 빌드
pnpm build
```

### 메모리 부족

**증상**: 빌드 중 "JavaScript heap out of memory" 에러

**해결 방법**:
```bash
# Node.js 메모리 제한 늘리기
export NODE_OPTIONS="--max-old-space-size=8192"
pnpm build
```

### 포트 충돌

**증상**: "Port 5678 is already in use"

**해결 방법**:
```bash
# 1. 사용 중인 프로세스 종료
lsof -ti:5678 | xargs kill -9

# 2. 또는 다른 포트 사용
N8N_PORT=5679 pnpm dev
```

### 언어 메뉴가 안 보임

**증상**: 사용자 메뉴에 "Language / 언어" 항목이 없음

**확인 사항**:
```bash
# 1. n8n-cjk 브랜치인지 확인
git branch
# * n8n-cjk 표시되어야 함

# 2. 최신 변경사항 pull
git pull origin n8n-cjk

# 3. 프론트엔드 재빌드
cd packages/frontend/editor-ui
pnpm build
cd ../../..
pnpm dev
```

### 한국어가 표시 안 됨

**증상**: 언어를 한국어로 선택했는데 영어로 표시

**확인 사항**:
```bash
# 1. ko.json 파일 존재 확인
ls -la packages/frontend/@n8n/i18n/src/locales/ko.json

# 2. i18n 패키지 재빌드
cd packages/frontend/@n8n/i18n
pnpm build
cd ../../..
pnpm dev
```

## 📸 예상 스크린샷

### 1. 언어 선택 메뉴 (영어)
```
👤 [사용자 이름]
   ├─ ⚙️ Settings
   ├─ 🌐 Language / 언어
   │   ├─ ✓ English
   │   └─ 한국어
   └─ 🚪 Sign out
```

### 2. 좌측 메뉴 (한국어)
```
📊 워크플로우
🔑 인증 정보
📋 실행
📄 템플릿
❓ 도움말
⚙️ 설정
```

### 3. 워크플로우 화면 (한국어)
```
[+ 새 워크플로우]  [🔍 검색...]

워크플로우 목록:
- My Workflow (비활성화)
- Test Flow (활성화)
```

## 📊 번역 커버리지

현재 번역된 항목: **414개 키 (전체의 10.7%)**

### 완전 번역 영역 (100%)
- ✅ 메인 네비게이션
- ✅ 기본 버튼 (저장, 취소, 삭제, 확인)
- ✅ 로그인/인증
- ✅ 워크플로우 기본 작업
- ✅ 실행 관리
- ✅ 인증 정보 관리

### 부분 번역 영역 (10-50%)
- ⏳ 노드 설정 상세
- ⏳ AI 기능
- ⏳ 고급 설정
- ⏳ 에러 메시지 상세

### 미번역 영역 (영어 fallback)
- 일부 노드별 고급 옵션
- 코드 편집기 상세 설명
- 특수 기능 도움말

## 🎯 다음 단계

테스트 완료 후:

1. **피드백 제공**
   - 번역이 어색한 부분
   - 레이아웃이 깨지는 화면
   - 추가로 번역이 필요한 부분

2. **추가 개발**
   - 남은 3,400+ 키 번역
   - 중국어(zh), 일본어(ja) 추가
   - 노드별 상세 번역

3. **배포 준비**
   - 프로덕션 빌드
   - Docker 이미지
   - 문서화

## 📞 지원

문제가 발생하거나 질문이 있으시면:
- GitHub Issues: https://github.com/edumagiceco/n8n/issues
- 이 문서 업데이트: Pull Request 환영

---

**마지막 업데이트**: 2025-11-09
**테스트 환경**: n8n-cjk 브랜치
**작성자**: Claude Code
