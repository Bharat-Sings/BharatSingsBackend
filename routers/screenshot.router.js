import { Router } from "express";
import { 
    createScreenshot 
} from "../controllers/screenshot.controller";

const router = Router();
router.route("/createScreenshot").post(createScreenshot);

export { router as screenshotRouter }