import Bloom from "./demos/Bloom"
import GJKVisualizer from "./demos/GJKVisualizer"
import { startGameLoop } from "geode/lib/IGame"
import GJKRaycastVisualizer from "./demos/GJKRaycastVisualizer"

let search = window.location.search.slice(1)
let game = { Bloom, GJKVisualizer, GJKRaycastVisualizer }[search]
if (game)
    startGameLoop( game )