import express from "express";
import bodyParser from "body-parser"


export function startListening() {
    
    
    
    const router = express.Router();
    const app = express();


    const port = 3001
    console.log("here")
    
    app.get('/', (req, res) => {
    res.send('Hello World!')
    })

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })

    /**
     * 
    
    // add router in express app
    app.use("/",router);

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    router.get('/',(req, res) => {
        res.sendFile("index.html");
    });

    router.post('/login',(req, res) => {
        var user_name = req.body.user;
        var password = req.body.password;
        console.log("User name = "+user_name+", password is "+password);
        res.end("yes");
    });

    app.listen(3000,() => {
        console.log("now listening");
    })
     */


}


export {}




