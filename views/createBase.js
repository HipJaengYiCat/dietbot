const createStyleHref = (style_hrefs) => {
  return style_hrefs.reduce((acc, val) => {
    acc += `<link rel="stylesheet" href="${val}">`;
    return acc;
  }, ``);
};

const createSrcs = (srcs) => {
  return srcs.reduce((acc, val) => {
    acc += `<script defer type="module" src="${val}"></script>`;
    return acc;
  }, ``);
};

const createBase = (type, style_hrefs, srcs, result, graph) => {
  return /*html*/ `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${createStyleHref(style_hrefs)}
        ${createSrcs(srcs)}
        <title>당신은 바로바로 ${type}!</title>
      </head> 
      <body>
        <section class="content">
          ${graph}
          ${result}
        </section>
      </body>
    </html>
    `;
};

module.exports = createBase;
