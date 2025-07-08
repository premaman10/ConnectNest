import{Router} from "express";
import { register } from "../controllers/user.controller.js";
import { login } from '../controllers/user.controller.js';


const router = Router();
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post((req, res) => {
    // TODO: Implement add to activity functionality
    res.status(501).json({message: "Not implemented yet"});
});
router.route("/get_all_activity").get((req, res) => {
    // TODO: Implement get all activity functionality
    res.status(501).json({message: "Not implemented yet"});
});


export default router;