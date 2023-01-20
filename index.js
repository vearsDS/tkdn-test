import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http, { STATUS_CODES } from 'http'
import path from 'path'
import { walkSync } from "./helper/readFile.js"
import { database } from "./settings/db.js"

const port = process.env.PORT || 3000
const app = express()
const server = http.Server(app)
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 100000 }));
app.use(bodyParser.json({ limit: '100mb' }));

//initialing CORS
app.use(
    cors({
        origin: '*'
    })
)
//connect to database
database.connect().then(status => {
    //check if successfully connect to database
    status.query('SELECT NOW()').then(result => {
        console.log("Success Connect To Database")
        status.release()
    }).catch(err => {
        status.release()
        console.log("Failed Connect To Database")
    })
})
const routes = walkSync('./routes')
const arrayRoutes = []

//itterate through all routes folder
for (const file of routes) {
    const paths = path.parse(file).name;
    if (paths.includes('.')) break;
    let routePath = file
        .split(path.sep)
        .slice(1, -1)
        .join(path.sep);
    routePath = `/${routePath}/${path.parse(file).name}`;
    const routeFile = await import(`./${file}`).then(obj => obj.default)
    app.use(routePath, routeFile);
    arrayRoutes.push(routePath);
};

server.listen(port, () => {
    arrayRoutes.map(route => console.log(route))
    console.log(`Server Running with ${arrayRoutes.length} url(s) on PORT ${port}`)
})