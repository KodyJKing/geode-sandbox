import Canvas from "geode/lib/graphics/Canvas";
import Color from "geode/lib/graphics/Color";

export default class Game {

    canvas: Canvas

    static instance: Game
    constructor() {
        Game.instance = this
        this.canvas = new Canvas( "canvas" )
        addEventListener( "keyup", e => this.keyup( e ) )
    }

    keyup( e: KeyboardEvent ) {
    }


    update() {
        this.render()
    }

    // ---- Rendering ----

    render() {
        let { canvas } = this
        canvas.fitWindow( 2 )
        canvas.smooth( false )
        canvas.background( Color.cornflowerblue )
        }
    }
}