const createSummary = (summary) => {
  return summary.reduce((acc, val) => {
    const { quote, text, author } = val;
    acc += `<div class="summary__quote"><p class="quote__content">${quote}</p>${author ? `<span class="quote__author">${author}</span>` : ""}</div><p class="summary__text">${text}</p>`;
    return acc;
  }, ``);
};

const setBody = (body) => {
  return body.reduce((acc, val) => {
    acc += `<p class="body__content">${val}</p>`;
    return acc;
  }, ``);
};

const createDetail = (detail) => {
  return detail.reduce((acc, val) => {
    const { head, body } = val;
    const newBody = setBody(body);
    acc += `<span class="detail__head">${head}</span><span class="detail__body">${newBody}</span>`;
    return acc;
  }, ``);
};

const createPeople = (people, type) => {
  const carouselButton = /*html*/ `
  <div class="people__button">
    <button type="button" class="btn__prev">이전</button>
    <button type="button" class="btn__next">다음</button>
  </div>`;
  return (
    people.reduce((acc, val) => {
      const { name, imageUrl } = val;
      acc += `<div class="people__card"><span class="people__name">${name}</span><img class="people__image" src="${imageUrl}"></div>`;
      return acc;
    }, `<span class="people__info"><h2 class="people__title">${type}에 해당하는 인물</h2><div class="people__wrap"><div class="people__box"><div class="people__list">`) + `</div></div>${carouselButton}</span>`
  );
};

const createResult = (jsonData) => {
  const { type, content } = jsonData;
  const { title, summary, detail, people } = content;
  return /*html*/ `
    <div class="full__content">
        <strong class="title"><span class="title__type">${type}:</span><span class="title__title">${title}</span></strong>
        <div class="summary">
            ${createSummary(summary)}
        </div>
        <div class="detail">
             ${createDetail(detail)}
        </div>
        <div class="people">
            ${createPeople(people, type)}
        </div>
    </div>
    `;
};

module.exports = createResult;
