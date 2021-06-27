import Canvas from "geode/src/graphics/Canvas"
import Color, { rgba, rgb, Colors } from "geode/src/graphics/Color"
import Vector2, { vector } from "geode/src/math/Vector2"
import GJK from "geode/src/math/collision/GJK"
import Input from "geode/src/Input"
import { argmax } from "geode/src/util"
import Polygon from "geode/src/math/geometry/Polygon"
import Ray from "geode/src/math/geometry/Ray"
import GJKRaycast from "geode/src/math/collision/GJKRaycast"
import { GameClock } from "geode/src/Clock"
import GMath from "geode/src/math/GMath"

export default class GJKRaycastVisualizer {

    canvas: Canvas

    constructor() {
        this.canvas = new Canvas("canvas")
    }

    update() {
        this.render()
    }

    supportPath(canvas: Canvas, support: (v: Vector2) => Vector2, steps = 100) {
        let points: Vector2[] = []
        for (let i = 0; i < steps; i++) {
            let theta = Math.PI * 2 * i / steps
            let heading = Vector2.polar(theta, 1)
            points.push(support(heading))
        }
        canvas.vpath(points)
        canvas.context.closePath()
    }

    polyPos = vector(400, 0)
    render() {
        let { canvas } = this
        canvas.fitWindow(2)

        // let fps = 1000 / GameClock.dt
        // console.log( fps )
        // canvas.fillStyle( Colors.white ).text( "FPS: " + fps.toFixed( 2 ), 0, 20, 200, "30px courier" )

        canvas.translateToCenter()

        let mouse = Input.mouse.subtract(canvas.dimensions.half())
        if (Input.buttons.Mouse0)
            this.polyPos = mouse

        let polygon = Polygon.regular(6, 100)
        polygon.position = this.polyPos
        let support = (v) => polygon.support(v).add(v.unit().multiply(100))
        this.supportPath(canvas, support)
        canvas.strokeStyle(Colors.white).stroke()

        let angle = Math.sin(performance.now() / 2000) + GMath.TAU / 8
        let ray = new Ray(Vector2.ZERO, Vector2.polar(angle, 1))
        let rayLength = 2000

        let line = GJKRaycast(support, ray.heading, 10)
        if (line) {
            let time = line.rayCast(ray)
            if (time > 0) {
                rayLength = time
                let hitPoint = ray.pointAt(time)
                // canvas.vline( line.a, line.b ).strokeStyle( Colors.green ).stroke()
                let normal = line.leftNormal.unit()
                canvas.vline(hitPoint, hitPoint.add(normal.multiply(40))).strokeStyle(Colors.green).stroke()
            }
        }

        canvas.vline(ray.point, ray.pointAt(rayLength)).strokeStyle(Colors.red).stroke()
        canvas.vcircle(ray.pointAt(rayLength), 2).fillStyle(Colors.red).fill()

        canvas.circle(0, 0, 2).fillStyle(Colors.white).fill()
        canvas.vcircle(this.polyPos, 2).fillStyle(Colors.white).fill()
    }
}