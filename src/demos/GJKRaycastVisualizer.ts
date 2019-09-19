import Canvas from "geode/lib/graphics/Canvas"
import Color, { rgba, rgb } from "geode/lib/graphics/Color"
import Vector, { vector } from "geode/lib/math/Vector"
import GJK from "geode/lib/collision/GJK"
import Input from "geode/lib/Input"
import { argmax } from "geode/lib/util"
import Polygon from "geode/lib/math/geometry/Polygon"
import Ray from "geode/lib/math/geometry/Ray"
import GJKRaycast from "geode/lib/math/collision/GJKRaycast"
import { GameClock } from "geode/lib/Clock"
import GMath from "geode/lib/math/GMath"

export default class GJKRaycastVisualizer {

    canvas: Canvas

    constructor() {
        this.canvas = new Canvas( "canvas" )
    }

    update() {
        this.render()
    }

    supportPath( canvas: Canvas, support: ( v: Vector ) => Vector, steps = 100 ) {
        let points: Vector[] = []
        for ( let i = 0; i < steps; i++ ) {
            let theta = Math.PI * 2 * i / steps
            let heading = Vector.polar( theta, 1 )
            points.push( support( heading ) )
        }
        canvas.vpath( points )
        canvas.context.closePath()
    }

    polyPos = vector(400, 0)
    render() {
        let { canvas } = this
        canvas.fitWindow( 2 )

        // let fps = 1000 / GameClock.dt
        // console.log( fps )
        // canvas.fillStyle( Color.white ).text( "FPS: " + fps.toFixed( 2 ), 0, 20, 200, "30px courier" )

        canvas.translateToCenter()

        let mouse = Input.mouse.subtract( canvas.dimensions.half )
        if ( Input.buttons.Mouse0 )
            this.polyPos = mouse

        let polygon = Polygon.regular( 3, 100 )
        polygon.position = this.polyPos
        let support = ( v ) => polygon.support( v ).add( v.unit.multiply( 100 ) )
        this.supportPath( canvas, support )
        canvas.strokeStyle( Color.white ).stroke()

        let angle = 0 //Math.sin( performance.now() / 2000 ) + GMath.TAU / 8
        let ray = new Ray( Vector.ZERO, Vector.polar( angle, 1 ) )
        let rayLength = 2000

        let line = GJKRaycast( support, ray.heading, 10 )
        if ( line ) {
            let time = line.rayCast( ray )
            if ( time > 0 ) {
                rayLength = time
                let hitPoint = ray.pointAt( time )
                // canvas.vline( line.a, line.b ).strokeStyle( Color.green ).stroke()
                let normal = line.leftNormal.unit
                canvas.vline( hitPoint, hitPoint.add( normal.multiply( 40 ) ) ).strokeStyle( Color.green ).stroke()
            }
        }

        canvas.vline( ray.point, ray.pointAt( rayLength ) ).strokeStyle( Color.red ).stroke()
        canvas.vcircle( ray.pointAt( rayLength ), 2 ).fillStyle( Color.red ).fill()

        canvas.circle( 0, 0, 2 ).fillStyle( Color.white ).fill()
        canvas.vcircle( this.polyPos, 2 ).fillStyle( Color.white ).fill()
    }
}