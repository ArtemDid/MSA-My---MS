const express = require("express");
const bodyParser = require("body-parser");

const server = new express();
server.use(bodyParser.json());
const SERVER_PORT = 5000;

//Инициализация подключения к MSSQL
//Клиент для подключения к СУБД
const mssql = require("mssql");
const connString = require("./db-connection");

server.get("/", (req, res) => {


    mssql.connect(connString.connString, (err) => {

        const request = new mssql.Request();

        request.query("SELECT * FROM Users", (err, result) => {

            res.json(result.recordset);
            res.end();

        });

    });

});

server.get("/:id", (req, res) => {

    mssql.connect(connString.connString, (err) => {

        const request = new mssql.Request();

        dbConnection.query(`SELECT * FROM public.employee WHERE id = ${req.params.id}`, (err, result) => {

            res.json(result.recordset);
            res.end();

        });
    });
})

server.delete("/employee/:id", (req, res) => {

    mssql.connect(connString.connString, (err) => {

        const request = new mssql.Request();

        dbConnection.query(`DELETE FROM public.employee WHERE  public.employee.id=${req.params.id}`, (err, data) => {

            res.json({ "resulte": true })
            res.end();
        });

    });


})

server.post("/employee", (req, res) => {


    mssql.connect(connString.connString, (err) => {

        const request = new mssql.Request();

        let newUser = req.body;

        dbConnection.query(`INSERT INTO public.employee("firstName", "lastName", email, "birthDate")
            VALUES ('${newUser.firstName}', '${newUser.lastName}', '${newUser.email}', '${newUser.birthDate}')`, (err, data) => {


            if (!err) {
                res.json({ "resulte": true })
            }
            res.end();
        });

    });
})

server.put("/employee", (req, res) => {

    mssql.connect(connString.connString, (err) => {

        const request = new mssql.Request();

        let updUser = req.body;

        dbConnection.query(`UPDATE public.employee
	SET "firstName"='${updUser.firstName}', "lastName"='${updUser.lastName}', email='${updUser.email}', "birthDate"='${updUser.birthDate}'
	WHERE id=${updUser.id};`, (err, data) => {


            if (!err) {
                res.json({ "resulte": true })
            }
            res.end();
        });

    });
})


const startupCallback = function () {

    console.log(`Server started  at: http://localhost:${service.address().port}`);

};

const service = server.listen(SERVER_PORT, startupCallback);