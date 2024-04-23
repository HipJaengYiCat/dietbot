import { _ } from "./utils.js";
import { carouselInit } from "./carousel.js";

// carousel
const button = _.$(".people__button");
const peopleList = _.$(".people__list");
const peopleCards = _.$$(".people__card");

carouselInit({ button, peopleList, peopleCards });


document.getElementById('chat-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    input.value = ''; // 입력창 초기화
    const chatList = document.getElementById('chat-list');
    const li = document.createElement('li');
    li.textContent = '당신: ' + message;
    chatList.appendChild(li);
    fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
        .then(response => response.json())
        .then(data => {
            const replyLi = document.createElement('li');
            replyLi.textContent = '챗봇: ' + data.response;
            chatList.appendChild(replyLi);
        })
        .catch(error => console.error('Error:', error));
}
