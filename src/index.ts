import Bloom from "./demos/Bloom"
import GJKVisualizer from "./demos/GJKVisualizer"
import { startGameLoop } from "geode/lib/IGame"
import GJKRaycastVisualizer from "./demos/GJKRaycastVisualizer"
import CollisionInfo from "./demos/CollisionInfo"

let search = window.location.search.slice(1)
let game = { Bloom, GJKVisualizer, GJKRaycastVisualizer, CollisionInfo }[search]
if (game)
    startGameLoop(game)