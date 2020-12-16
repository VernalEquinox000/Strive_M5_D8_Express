/*
     You are in charge of developing an EventBrite clone app, a very famous event management and ticketing website. 
     Since you work for a small company you have just a single event named "Diego's Birthday".
     //BACKEND
     You are in charge of building the Backend using NodeJS + Express. Today we want you to study the documentation of new npm modules by yourself.
     Those modules are: 
     - PDFMAKE (https://www.npmjs.com/package/pdfmake)
     - SendGrid (https://github.com/sendgrid/sendgrid-nodejs)
     
     The backend shall include at least the following routes:
     - POST /attendees/ => add a new participant to the event.  Attendees' data will include:
         - ID
         - First Name
         - Second Name
         - Email
         - Time of Arrival (a string is ok) 
         After successfully saving the participant in an attendees.json file on disk, backend will send an email to that participant's mail address
                       
     - GET /attendees/csv => this route must return full list of attendees exported as a CSV file (use stream from json2csv npm module)
     
     - POST /attendees/:id/createPDF => this route needs to generate a PDF document and save it to the disk. The document needs to contain data belonging 
         to the attendee with the specified id
     
     - EXTRA --> Email in the first route should include the ticket in form of a PDF file as an attachment
     //FRONTEND (EXTRA)
     A user goes on the main page and finds a simple form to insert his own personal data to book the tickets for the event
     You must configure your projects to use ENV VARS. Put api keys, port numbers and api url in an .env file
 */