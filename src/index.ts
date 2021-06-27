import Bloom from "./demos/Bloom"
import GJKVisualizer from "./demos/GJKVisualizer"
import { startGameLoop } from "geode/src/IGame"
import GJKRaycastVisualizer from "./demos/GJKRaycastVisualizer"
import CollisionInfo from "./demos/CollisionInfo"
import Solver from "./demos/Solver"

let search = window.location.search.slice(1)
let game = { Bloom, GJKVisualizer, GJKRaycastVisualizer, CollisionInfo, Solver }[search]
if (game)
    startGameLoop(game)