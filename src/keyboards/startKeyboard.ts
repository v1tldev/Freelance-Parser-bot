import { Keyboard } from "grammy";
import { Hears } from "../consts/hears";

export const startKeyboard = new Keyboard()
    .text(Hears.CATEGORIES)
    .text(Hears.HELP)
    .resized()
    .persistent()