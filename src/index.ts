import Bloom from "./demos/Bloom";
import GJKVisualizer from "./demos/GJKVisualizer";
import { startGameLoop } from "geode/lib/IGame";

let search = window.location.search.slice(1)
console.log(search)
let game = { Bloom, GJKVisualizer }[search]
if (game)
    startGameLoop( game )