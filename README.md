# 성격유형 간이 검사 챗봇 - 티티봇 (TT: Test your personal Type)

## 프로젝트 계획 이유

> 작년에 처음으로 접했던 챗봇 개발에 대한 아쉬움이 남아있었다. 당시에는 우울증을 간단하게 진단하고 url로 연결된 웹 사이트에서 전문 센터에 예약하는 시뮬레이션을 할 수 있는 프로토타입 수준의 서비스를 만들었는데, 사실상 제대로 이해하고 사용한 것이 없는 상태에서 엉겁결에 완성(?)하게 되었다. 하자도 매우 많았고, 무엇보다 챗봇 개발을 경험했다고 말하기 민망한 수준의 경험이었어서 그 아쉬움을 만회하고 조금이라도 보완해보고자 문항수도 더 많고, 채점 방식도 좀 더 복잡한 **성격유형 간이 검사 챗봇**을 만들어 보기로 결심하였다.

## 시나리오

1. 사용자는 카카오톡 앱을 열어 플러스 친구 찾기를 통해 "티티봇"을 검색해 채팅하기를 누른다.
2. 사용자가 "시작하기" 버튼을 누르면 티티봇은 오프닝 블록 발화를 시작한다.
3. 사용자는 티티봇의 발화 하단에 위치한 버튼을 누르며 발화를 이어간다.
4. 오프닝 블록 발화를 모두 마치면, 티티봇은 사용자에게 총 36가지의 질문을 통해 성격유형 검사의 질문을 진행한다.
5. 사용자는 티티봇의 발화에 적인 질문에 대하여 자신과 가까운 답변을 발화 하단의 버튼을 눌러 응답한다.
6. 티티봇은 사용자가 입력하는 버튼을 식별하여 그에 맞는 성격 유형의 점수를 채점한다.
7. 총 36가지의 질문에 대한 응답이 완료되면, 티티봇은 사용자에게 결과지가 그려진 url을 제공한다.
8. 사용자는 티티봇이 제공한 url을 눌러 자신의 결과를 확인한다.

## 실행 설명

📌 카카오 챗봇은 외부 서버가 반드시 구축되어야 한다.

```js
// gcp - vm ssh
username@vmname:~/project_folder$ npm start
```

## 구조

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
