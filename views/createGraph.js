const types = ["E", "I", "S", "N", "T", "F", "J", "P"];
const typekinds = ["energy", "information", "decision", "lifestyle"];

const createType = (scores) => {
  return scores.reduce((acc, val, idx) => {
    const oddTemplate = `<span class="type__result"><div class="bar width_${val} ${types[idx]}"></div></span><span class="type__name type__right">${types[idx]}</span>`;
    const evenTemplate = `<span class="type__name type__left">${types[idx]}</span><span class="type__result"><div class="bar width_${val} ${types[idx]}"></div></span>`;
    const template = /*html*/ `
    <div class="type__direction ${idx % 2 === 0 ? "left" : "right"}">
      ${idx % 2 === 0 ? evenTemplate : oddTemplate}
    </div>`;
    acc += idx % 2 === 0 ? `<div class="type ${typekinds[Math.floor(idx / 2)]}">${template}` : `${template}</div>`;
    return acc;
  }, `<h2 class="graph__title">검사 결과</h2>`);
};

const createGraph = (scores) => {
  return /*html*/ `
    <div class="graph">
        ${createType(scores.split(""))}
    </div> 
    `;
};

module.exports = createGraph;
