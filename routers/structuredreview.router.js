import { Router } from "express";
import { 
    createStructuredReview,
    findStructuredReviewsBySongId
} from "../controllers/structuredreview.controller";

const router = Router();
router.route("/createStructuredReview").post(createStructuredReview);
router.route("/findStructuredReviewsBySongId").get(findStructuredReviewsBySongId);

export { router as structuredReviewRouter }