# Learn Claude Code — Interactive Playground

Claude Code 사용법을 인터랙티브하게 익히는 웹 기반 학습 플레이그라운드입니다.

## 특징

- **30개 학습 시나리오**: 설치부터 에이전트 활용까지 9개 챕터
- **터미널 시뮬레이터**: 타이핑 애니메이션과 버튼 선택식 인터랙션
- **다크/라이트 테마**: 시스템 설정 자동 감지 + 수동 전환
- **진행 상태 저장**: localStorage 기반 학습 진도 관리
- **반응형 디자인**: 데스크톱/태블릿/모바일 지원
- **의존성 없음**: Vanilla HTML/CSS/JS, 빌드 스텝 불필요

## 대상

- **개발자**: Claude Code의 개발 워크플로우, 고급 기능, 에이전트 활용
- **비개발자**: 문서 작성, 데이터 분석, 비즈니스 자동화, 프레젠테이션

## 로컬 실행

```bash
# 방법 1: npx serve
npx serve .

# 방법 2: Python
python3 -m http.server 8080

# 방법 3: 브라우저에서 직접 열기 (일부 기능 제한)
open index.html
```

## 커리큘럼

| 챕터 | 주제 | 시나리오 수 |
|------|------|------------|
| 1 | 시작하기 | 3 |
| 2 | 도구 시스템 이해 | 3 |
| 3 | 커스터마이징 | 4 |
| 4 | 실전 개발 워크플로우 | 4 |
| 5 | 고급 기능 | 3 |
| 6 | MCP & 확장 | 3 |
| 7 | Git & 코드 리뷰 | 2 |
| 8 | 에이전트 활용 | 4 |
| 9 | 비개발자 활용 | 4 |

## 기술 스택

- HTML5 / CSS3 (Custom Properties) / ES Modules
- Hash-based SPA routing
- localStorage for progress persistence
- GitHub Pages deployment
