const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    try {
        // 기본 텍스트 응답 대신 JSON 응답을 보냄
        res.json({ message: "Hello World!" });
    } catch (error) {
        next(error); // 에러 핸들링을 위해 next() 호출
    }
});

module.exports = router;
