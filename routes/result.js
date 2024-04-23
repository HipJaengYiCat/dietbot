const express = require("express");
const router = express.Router();
const fs = require("fs"); //node.js 파일 시스템 관련 기능 사용

// Import function to create page
const createBase = require("../views/createBase.js");
const createResult = require("../views/createResult.js");
const { style_hrefs, srcs } = require("../utils.js");

// const srcs = require("../utils.js")
const createGraph = require("../views/createGraph.js");

// Set JSON parser : JSON 형식 입력 데이터 파싱
router.use(express.json());

// Set router : 루트 경로 ('/result")에 대한 GET 요청 처리
router.get("", function (req, res, next) {
  const type = req.query.type;
  const scores = req.query.scores;

  //readFile -> 비동기식 파일 읽기
  fs.readFile("./data/personalities.json", (err, data) => {
    if (err) {
      return next(err); // 에러 핸들링
    }

    try {
      const jsonData = JSON.parse(data);
      const result = createResult(jsonData[type]); // 결과데이터 생성
      const graph = createGraph(scores); // 점수 기반 그래프 생성
      res.send(createBase(type, style_hrefs, srcs, result, graph)); // 생성페이지 클라이언트 전송
    } catch (error) {
      next(error); // JSON 파싱 에러 처리
    }
  });
});

module.exports = router;
