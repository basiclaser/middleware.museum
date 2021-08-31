import Router from 'express';

const emailRouter = Router();

emailRouter
    .route("/")
    .get((req, res) => {
        res.send("get all emails");
    })
    .post((req, res) => {
        res.send("create new email");
    })

emailRouter
    .route("/:id")
    .get((req, res) => {
        res.send("get one email with id " + req.params.id)
    })

export default emailRouter;