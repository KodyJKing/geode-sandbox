import Canvas from "geode/lib/graphics/Canvas";
import Color, { rgba, rgb } from "geode/lib/graphics/Color";
import { getImage } from "geode/lib/assets";

export default class Bloom {

    canvas: Canvas

    static instance: Bloom
    constructor() {
        Bloom.instance = this
        this.canvas = new Canvas( "canvas" )
        addEventListener( "keyup", e => this.keyup( e ) )
    }

    keyup( e: KeyboardEvent ) {
    }


    update() {
        this.render()
    }

    // ---- Rendering ----

    background( forground: CanvasImageSource ) {
        let innerCanvas = new OffscreenCanvas( 0, 0 )
        let canvas = new Canvas( innerCanvas )
        canvas.fitWindow().smooth( false )
        canvas.background( "#262838" )
        canvas.circle(100, 100, 50).fillStyle(Color.white).fill()
        canvas.composition( "destination-out" ).image( forground )
        return innerCanvas.transferToImageBitmap()
    }

    foreground() {
        let innerCanvas = new OffscreenCanvas( 0, 0 )
        let canvas = new Canvas( innerCanvas )
        canvas.fitWindow().smooth( false )

        let height = canvas.dimensions.y
        let width = canvas.dimensions.x
        let grassHeight = height / 3
        canvas.rect(
            0, height - grassHeight, width, grassHeight
        ).fillStyle("#0e260b").fill()

        canvas.translate( width / 2, height - grassHeight ).scale( 10, 10 )
        for (let i = -5; i <= 5; i++) {
                canvas.push()
                .translate(1 - i * 20, Math.sin(i) * 2 - 10)
                .filter({ brightness: 0.25 + Math.sin(i) / 16, hueRotate: (1 + Math.sin(i)) / 16 })
                .image( getImage( "AutumnTree" ), 0, 0, 0, 0, true )
                .pop()
        }

        return innerCanvas.transferToImageBitmap()
    }

    render() {
        let { canvas } = this
        canvas.fitWindow( 1 / 5 ).smooth( false )

        let foreground = this.foreground()
        let background = this.background( foreground )

        canvas.push()
        // canvas.image( foreground ).shadow( 6, "#ecf279" ).image( background )
        canvas.image( foreground ).shadow( 6, rgba(255, 255, 255, 0.25) ).image( background )
        canvas.pop()

    }
}