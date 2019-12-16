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
import IBody from "geode/lib/math/collision/IBody"
import { collisionInfo } from "geode/lib/math/collision/collision"

function supportPath(canvas: Canvas, support: (v: Vector) => Vector, steps = 100) {
    let points: Vector[] = []
    for (let i = 0; i < steps; i++) {
        let theta = Math.PI * 2 * i / steps
        let heading = Vector.polar(theta, 1)
        points.push(support(heading))
    }
    canvas.vpath(points)
    canvas.context.closePath()
}

export default class CollisionInfo {

    canvas: Canvas
    a: Body
    b: Body

    constructor() {
        this.canvas = new Canvas("canvas")
        this.a = new Body(6, 100, vector(-300, 0), vector(20, 0))
        this.b = new Body(8, 100, vector(300, 0), vector(-20, 0))
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
        // canvas.fillStyle( Color.white ).text( "FPS: " + fps.toFixed( 2 ), 0, 20, 200, "30px courier" )

        canvas.translateToCenter()

        let mouse = Input.mouse.subtract(canvas.dimensions.half)
        if (Input.buttons.Mouse0)
            b.position = mouse

        // let mdSupport = (p: Vector) => a.support(p).subtract(b.support(p.negate))
        // supportPath(canvas, mdSupport)
        // canvas.strokeStyle(Color.gray).stroke()

        // a.velocity = Vector.polar(Math.sin(performance.now() / 2000), 20)
        {
            (b.position as any).y = 180 * Math.sin(performance.now() / 1000)
        }

        a.draw(canvas)
        b.draw(canvas)

        let info = collisionInfo(a, b)
        if (info) {
            let pos = info.contact.a.high.add(info.contact.a.low).multiply(0.5).add(a.velocity.multiply(info.time))
            canvas.vline(pos, pos.add(info.normal.multiply(20))).strokeStyle(Color.blue).stroke()

            // let ca = info.contact.a
            // let cb = info.contact.b
            // let pts = [ca.high, ca.low, cb.high, cb.low]
            // for (let pt of pts)
            //     canvas.vcircle(pt, 3).fillStyle(Color.red).fill()

            canvas.vcircle(info.contact.a.high.add(a.velocity.multiply(info.time)), 3).fillStyle(Color.red).fill()
            canvas.vcircle(info.contact.a.low.add(a.velocity.multiply(info.time)), 3).fillStyle(Color.red).fill()
            canvas.vcircle(info.contact.b.high.add(b.velocity.multiply(info.time)), 3).fillStyle(Color.red).fill()
            canvas.vcircle(info.contact.b.low.add(b.velocity.multiply(info.time)), 3).fillStyle(Color.red).fill()

            canvas.strokeStyle(Color.gray)
            a.drawOutline(canvas, info.time)
            b.drawOutline(canvas, info.time)
        }

    }
}

class Body implements IBody {
    position: Vector
    velocity: Vector
    shape: Polygon

    constructor(sides, radius, position, velocity) {
        this.shape = Polygon.regular(sides, radius)
        this.position = position
        this.velocity = velocity
    }

    support(position: Vector) {
        return this.shape.support(position).add(this.position)
    }

    draw(canvas: Canvas) {
        canvas.strokeStyle(Color.white)
        this.drawOutline(canvas, 0)
        canvas.vline(this.position, this.position.add(this.velocity)).strokeStyle(Color.green).stroke()
        canvas.vcircle(this.position, 3).fillStyle(Color.white).fill()
    }

    drawOutline(canvas: Canvas, dt = 0) {
        supportPath(canvas, p => this.support(p).add(this.velocity.multiply(dt)))
        canvas.stroke()
    }
}