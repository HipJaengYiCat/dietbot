window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const result = params.get('result');
    document.getElementById('result-text').textContent = '당신의 결과: ' + result;
}
