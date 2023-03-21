import express from "express"
import jq from "node-jq"
import json2emap from "json2emap";
import {boolean} from "boolean";

const app = express()
app.use(express.json())
app.listen(3000, () => console.log("server running on port 3000"))

app.post("/v1/jq", async (req, res) => {
    const query = req.query.q
    const returnJson = boolean(req.query.json)
    const json = req.body

    try {
        const result = await jq.run(query, json, {input: 'json', output: 'json'})
        if (!returnJson) {
            if (typeof result === "string") {
                res.send(json2emap({
                    "result": result
                }))
                return
            }
            res.send(json2emap({
                "result": result
            }))
            return
        }
        if (typeof result === "string") {
            res.send({
                "result": result
            })
            return
        }
        res.send({
            "result": result
        })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})
