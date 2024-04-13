const _ = {
  search: (target = location) => target.search,
  local: "http://localhost:3000/result?type=ESFJ&scores=90909090", // for test
  $: (selector, target = document) => target.querySelector(selector),
  $$: (selector, target = document) => target.querySelectorAll(selector),
};

export { _ };
