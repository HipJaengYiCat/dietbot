const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/users', function (req, res, next) {
  // 예를 들어, 여기서 데이터베이스에서 사용자 정보를 조회하고 응답을 보낼 수 있습니다.
  try {
    // 데이터베이스에서 사용자 목록을 조회하는 로직 가정
    const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    res.json(users);
  } catch (error) {
    next(error); // 에러 발생 시 에러 핸들링
  }
});

module.exports = router;

