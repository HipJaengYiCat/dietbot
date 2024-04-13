const { hostNumber } = require("./util.js");

const createResponseBody = (questions, index, blockIds, answers) => {
  if (index < questions.length) {
    return {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: questions[index],
            },
          },
        ],
        quickReplies: [
          {
            messageText: answers[index].left,
            action: "block",
            blockId: blockIds[index],
            label: answers[index].left,
          },
          {
            messageText: answers[index].right,
            action: "block",
            blockId: blockIds[index],
            label: answers[index].right,
          },
        ],
      },
    };
  }
};

const createResultBody = (result, scores) => {
  const url = `http://${hostNumber}/result?type=${result}&scores=${scores}`;
  return {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `결과를 확인하세요!\n${url}`,
          },
        },
      ],
    },
  };
};

const createBreakMessage = (blockIds, selectedMsg, startUtterances, userState) => {
  const { users, userId } = userState;
  return {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: selectedMsg,
          },
        },
      ],
      quickReplies: [
        {
          messageText: startUtterances[users.get(userId).totalQuestionIndex],
          action: "block",
          blockId: blockIds[++users.get(userId).index],
          label: startUtterances[users.get(userId).totalQuestionIndex],
        },
      ],
    },
  };
};

module.exports = { createResponseBody, createResultBody, createBreakMessage };
