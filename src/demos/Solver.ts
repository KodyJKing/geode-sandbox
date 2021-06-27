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
import IBody from "geode/src/math/collision/IBody"
import { collisionInfo } from "geode/src/math/collision/collision"

function supportPath(canvas: Canvas, support: (v: Vector2) => Vector2, steps = 100) {
    let points: Vector2[] = []
    for (let i = 0; i < steps; i++) {
        let theta = Math.PI * 2 * i / steps
        let heading = Vector2.polar(theta, 1)
        points.push(support(heading))
    }
    canvas.vpath(points)
    canvas.context.closePath()
}

export default class Solver {

    canvas: Canvas
    a: Body
    b: Body

    constructor() {
        this.canvas = new Canvas("canvas")
        let aRadius = 40
        let bRadius = 40
        this.a = new Body(6, 100 - aRadius, vector(-300, 0), vector(20, 0), aRadius)
        this.b = new Body(8, 100 - bRadius, vector(300, 0), vector(-20, 0), bRadius)
    }

    update() {
        this.render()
    }

    polyPos = vector(400, 0)
    render() {
        let { canvas, a, b } = this
        canvas.fitWindow(2)

        // let fps = 1000 / GameClock.dt
        // console.log( fps )
        // canvas.fillStyle( Colors.white ).text( "FPS: " + fps.toFixed( 2 ), 0, 20, 200, "30px courier" )

        canvas.translateToCenter()

        let mouse = Input.mouse.subtract(canvas.dimensions.half())
        if (Input.buttons.Mouse0)
            b.position = mouse

        // let mdSupport = (p: Vector2) => a.support(p).subtract(b.support(p.negate))
        // supportPath(canvas, mdSupport)
        // canvas.strokeStyle(Colors.gray).stroke()

        // a.velocity = Vector2.polar(Math.sin(performance.now() / 2000), 20)
        b.position = new Vector2(b.position.x, 180 * Math.sin(performance.now() / 1000))

        a.draw(canvas)
        b.draw(canvas)

        let info = collisionInfo(a, b)
        if (info) {
            let [c1, c2] = info.contact
            let pos = c1.add(c2).multiply(0.5)
            canvas.vline(pos, pos.add(info.normal.multiply(20))).strokeStyle(Colors.blue).stroke()
            canvas.vcircle(c1, 3).fillStyle(Colors.red).fill()
            canvas.vcircle(c2, 3).fillStyle(Colors.red).fill()

            canvas.strokeStyle(Colors.gray)
            a.drawOutline(canvas, info.time)
            b.drawOutline(canvas, info.time)
        }

    }
}

class Body implements IBody {
    position: Vector2
    velocity: Vector2
    shape: Polygon
    roundingRadius: number

    constructor(sides, radius, position, velocity, roundingRadius = 0) {
        this.shape = Polygon.regular(sides, radius)
        this.position = position
        this.velocity = velocity
        this.roundingRadius = roundingRadius
    }

    support(position: Vector2) {
        return this.shape.support(position).add(this.position).add(position.unit().multiply(this.roundingRadius))
    }

    draw(canvas: Canvas) {
        canvas.strokeStyle(Colors.white)
        this.drawOutline(canvas, 0)
        canvas.vline(this.position, this.position.add(this.velocity)).strokeStyle(Colors.green).stroke()
        canvas.vcircle(this.position, 3).fillStyle(Colors.white).fill()
    }

    drawOutline(canvas: Canvas, dt = 0) {
        supportPath(canvas, p => this.support(p).add(this.velocity.multiply(dt)))
        canvas.stroke()
    }
}