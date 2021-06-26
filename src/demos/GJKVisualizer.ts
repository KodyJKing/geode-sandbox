import Canvas from "geode/lib/graphics/Canvas"
import Color, { rgba, rgb } from "geode/lib/graphics/Color"
import Vector2, { vector } from "geode/lib/math/Vector2"
import GJK from "geode/lib/math/collision/GJK"
import Input from "geode/lib/Input"
import { argmax } from "geode/lib/util"

export default class GJKVisualizer {

    canvas: Canvas

    constructor() {
        this.canvas = new Canvas( "canvas" )
    }


    update() {
        this.render()
    }

    // ---- Rendering ----

    supportPath( canvas: Canvas, support: ( v: Vector2 ) => Vector2, steps = 100 ) {
        let points: Vector2[] = []
        for ( let i = 0; i < steps; i++ ) {
            let theta = Math.PI * 2 * i / steps
            let heading = Vector2.polar( theta, 1 )
            points.push( support( heading ) )
        }
        canvas.vpath( points )
        canvas.context.closePath()
    }

    ellipseSupport( a: number, b: number, d: Vector2 ) {
        let a2 = a * d.x
        let b2 = b * d.y
        let p = Math.atan2( b2, a2 )
        return Vector2.polar( p, 1 ).stretch( a, b )
    }

    regularPolygon( sides = 3, radius = 100 ) {
        let vertices: Vector2[] = []
        for ( let i = 0; i < sides; i++ )
            vertices.push( Vector2.polar( Math.PI * 2 / sides * i, 1 ).multiply( radius ) )
        return vertices
    }

    polygonSupport( vertices: Vector2[], d: Vector2 ) {
        return argmax( vertices, v => v.dot( d ) ).bestArg
    }

    render() {
        let { canvas } = this
        canvas.fitWindow( 2 ).translateToCenter().strokeStyle( Color.white ).lineWidth( 1 )

        let vertices = this.regularPolygon( 6, 100 )

        let support = ( d: Vector2 ) => {
            let squareSupport = this.polygonSupport( vertices, d )
            let circleSupport = this.ellipseSupport( 50, 50, d )
            return squareSupport.add( circleSupport ).add( Input.mouse ).subtract( canvas.dimensions.half() )
        }

        let simplices: Vector2[][] = []
        let c = GJK( support, simplices )

        let i = 0
        for ( let simplex of simplices ) {
            if ( simplex.length != 3 )
                continue
            let brightness = ( ( i++ % 2 ) == 0 ? 1 : 0.5 )
            let g = 255 * brightness
            let b = 255 * brightness
            canvas.fillStyle( rgba( 0, g, b, 0.5 ) )
            canvas.vpath( simplex )
            canvas.context.closePath()
            canvas.fill()
        }

        this.supportPath( canvas, support )
        canvas.stroke()

        if ( c )
            canvas.circle( 0, 0, 2 ).fillStyle( Color.cyan ).fill()
        else
            canvas.circle( 0, 0, 2 ).fillStyle( Color.red ).fill()
    }
}