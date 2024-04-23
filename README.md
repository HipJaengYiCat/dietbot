# 맞춤 다이어트 레시피 & 식단 추천 봇(dietbot: personal diet menu recommended chatbot)

## 프로젝트 계획 이유

> n년차 자취러이자 다이어터로서 다이어트 식단을 집에서 해먹는데 매일 닭&밥만 먹는건 너무 지겹고, 살이 빠지면서도 간단히 해먹을 수 있는 요리를 찾다보니 여러 다이어트 레시피 & 다이어트 식품에 대한 정보를 많이 알게 되었고 나의 이런 경험을 여러 사람들이 손쉽게 활용할 수 있는 서비스를 만들어보자는 생각에 챗봇이라는 서비스를 만들게 되었다. 다이어트의 성공은 자기 자신의 맞는 다이어트 방법과 다이어트 음식이므로 개인화 맞춤 서비스를 위해 몇 가지 질문을 통해 개인 식단 정보를 받고 그에 맞는 다이어트 식단과 레시피를 추천을 해준다


## 1차 시나리오(24.04.13)

1. 사용자는 카카오톡 앱을 열어 플러스 친구 찾기를 통해 "자취러의다이어트레시피추천"을 검색해 채팅하기를 누른다.
2. 사용자가 "시작하기" 버튼을 누르면 "다이어트봇"은 오프닝 블록 발화를 시작한다.
3. 사용자는 "다이어트봇"의 발화 하단에 위치한 "맞춤추천"을 누르며 발화를 이어간다.
4. 오프닝 블록 발화를 모두 마치면, "다이어트봇"은 사용자에게 총 몇가지의 질문을 통해 개인식단정보를 받는다.
5. 사용자는 "다이어트봇"의 발화에 적인 질문에 대하여 자신과 가까운 답변을 발화 하단의 버튼을 눌러 응답한다.
6. "다이어트봇"은 사용자가 입력하는 버튼을 식별하여 그에 맞는 다이어트 유형을 판별한다.
7. 총 몇가지의 질문에 대한 응답이 완료되면, 티티봇은 사용자에게 해당 유형에 맞는 5가지 레시피를 추천한다.
   7-1. 이때 생성형 AI를 활용해 해당 유형에 맞는 텍스트설명을 함께 제공한다
8. 사용자는 "다이어트봇"이 제공한 레시피 중 하나를 눌러 레시피와 재료정보를 받는다.
9. 사용자가 레시피 중 하나를 선택하면, 해당 레시피와 재료정보(with 재료 판매 링크)를 응답한다.
10. 사용자가 원하는 레시피가 없다면 "다른 레시피 찾아보기" 버튼을 눌러 응답한다.
11. 해당 사용자에 추천 점수에 기존 추천 레시피의 패널티 점수를 주고, 그 다음 순서 추천레시피를 제공한다.
   11-1 해당 사용자는 원하는 레시피를 찾을 때까지 해당 과정을 반복한다.
   11-2 2번 이상 다른 레시피 찾아보기를 누른다면 "사용자 이용 설문" 받는다


## 실행 설명

📌 카카오 챗봇은 외부 서버가 반드시 구축되어야 한다.

```js
// gcp - vm ssh
username@vmname:~/project_folder$ npm start
```

## 구조
- bin
   - www : 서버를 실행하는 스크립트, http모듈에 express 모듈 연결하고, 프로젝트 실행되는 포트 지정함
- data
- public
- routes
    - chat
        - blocks.js
        - responses.js
        - userManager.js
        - util.js
    - api.js : 챗봇과 관련된 API 라이터 설정, 챗봇의 사용자 상호작용을 통해 수집된 데이터를 기반으로 사용자 유형과 결과 분석하는 로직 포함함
    - index.js : 라우팅 처리, 웹의 홈페이지 경로를 설정함
    - result.js : result 경로의 요청을 처리
    - users.js : 사용자 목록을 제공하는 경로의 요청 처리
- views
- app.js
- pakage-lock.json
- package.json
- pull.sh
- utiles.js


### public

- 클라이언트

1. stylesheets
   - DOM 배치, 색깔 등 디자인 요소 입힘
2. src
   - 캐러셀
   - `carousel.js`에서 구현한 캐러셀을 `main.js`에서 호출

### app.js

- 서버

```js
app.use("/result", resultRouter); // 결과지를 보여주는 라우터
app.use("/api", apiRouter); // 챗봇을 실행하는 라우터
```

### routes/api.js

- 챗봇을 실행하는 라우터

```js
const apiRouter = express.Router(); // 라우터 등록
apiRouter.post("/", function (req, res) {
   // 1. req.body를 통해 요청 확인
   // 2. req.body에서 user.id, utterance로 사용자 아이디와 발화 응답 확인
   // 3. 발화 응답에 따라 챗봇의 발화 블록 설정하여 응답, 검사 채점
   // 4. 발화 응답의 index와 질문의 개수가 같으면 결과 응답
}
```

### routes/chat

- 챗봇 실행에 필요한 요소들을 모은 디렉토리

1. blocks.js
   - 카카오 i 오픈빌더에서 구축한 블록의 id들
   - 개별 블록에 작성될 질문들
   - 개별 질문의 하단에 위치될 답변 버튼들
   - 각 파트별 질문이 끝나면 던져줄 breakMesages에 대한 사용자의 응답으로 사용될 버튼들
2. responses.js
   - 실제 챗봇의 발화 응답
   - 카카오 챗봇 api에서 지정된 요청-응답 양식에 맞춰 작성
3. userManager.js
   - 사용자 정보 저장 및 채점을 위한 함수들
   - 사용자가 left, right 버튼을 누름에 따라 해당 성격유형의 점수가 집계됨
   - 사용자 저장 및 채점
     - users: Map으로 구현
     - users에 user.id가 key로 저장
     - 해당 key의 value값으로 initValue 객체가 저장
       - energy, information, deficion, lifestyle : 각 성격 유형
       - result : 각 부문별 검사가 완료되면 더 높은 유형이 push됨
       - index : 질문 블록의 index
       - totalQuestionIndex : 4가지 유형의 index
     - 사용자의 발화에 맞춰 해당 `index`, `totalQuestionIndex`를 계산해 어떤 유형의 값인지 판별한 후 `result`에 담아 결과 url에 반영
4. util.js
   - 서버 주소, 블록 사이즈, 4가지 유형 정보에 대한 객체

### routes/result.js

- 결과를 전달하는 라우터
- 채점 결과를 queryString 방식으로 url에 엮어 전달
- 해당 쿼리를 분석하여 이에 맞는 결과가 반영된 DOM을 보내줌

### views

- `routes/result.js`에서 전달하는 DOM을 그리는 템플레이팅 함수들

1. createBase
   - html skeleton
2. createGraph
   - 검사를 통해 집계된 각각의 점수로 그래프를 그리기 위한 DOM 생성
3. createResult
   - 검사 결과로 나온 성격유형의 json-data를 가지고 결과지를 그리기 위한 DOM 생성
