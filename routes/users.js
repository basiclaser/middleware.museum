import Router from 'express';

const userRouter = Router();

userRouter
    .route("/")
    .get((req, res) => {
        res.send("get all users");
    })
    .post((req, res) => {
        res.send("create new user");
    })

userRouter
    .route("/:id")
    .get((req, res) => {
        res.send("get one user with id " + req.params.id)
    })

export default userRouter;