import { _ } from "./utils.js";
import { carouselInit } from "./carousel.js";

// carousel
const button = _.$(".people__button");
const peopleList = _.$(".people__list");
const peopleCards = _.$$(".people__card");

carouselInit({ button, peopleList, peopleCards });
