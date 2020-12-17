const express = require("express")
const uniqid = require("uniqid")
const { getAttendees, writeAttendees } = require("../../fsUtilities")

const { check, validationResult } = require("express-validator")
const attendeesValidation = [
    check("Email").exists().withMessage("Email is required!"),
]

const { pipeline } = require("stream")
const { Transform } = require("json2csv")
const { join } = require("path")
const { createReadStream } = require("fs-extra")

const sgMail = require('@sendgrid/mail');


const attendeesRouter = express.Router()

attendeesRouter.get("/", async (req, res, next) => {
    try {
        const attendees = await getAttendees()
        res.send(attendees)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

attendeesRouter.post("/", attendeesValidation, async (req, res, next) => {
    try {
        const validationErrors= validationResult(req)
        if (!validationErrors.isEmpty()) {
            const error = new Error()
            error.httpStatusCode = 400
            error.message = validationErrors
            next(error)
        } else {
            const attendees = await getAttendees()

            attendees.push({
        ...req.body,
        ID: uniqid(),
      })
      await writeAttendees(attendees)
      res.status(201).send()
    }
        
    } catch (error) {
        console.log(error)
        const err = new Error("an error occured while reading from the file")
        next (err)
        }
})
    

//ATTENDEES GET/CSV
attendeesRouter.get("/export/csv", (req, res, next) => {
  try {
    const path = join(__dirname, "attendees.json")
    const jsonReadableStream = createReadStream(path)

    const json2csv = new Transform({
      fields: ["ID","First name", "Second name", "Email", "Time of Arrival"],
    })

    res.setHeader("Content-Disposition", "attachment; filename=export.csv")
    pipeline(jsonReadableStream, json2csv, res, err => {
      if (err) {
        console.log(err)
        next(err)
      } else {
        console.log("Done")
      }
    })
  } catch (error) {
    next(error)
  }
})

//POST e-mail

attendeesRouter.post("/sendEmail", async (req, res, next) => {
    
    try{sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'pieroapruzzese@tiscali.it',
        from: 'pieroapruzzese@gmail.com', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    
        await sgMail.send(msg)
        res.send("SENT")
    } catch (error) {
        next(error)
    }
})



module.exports=attendeesRouter