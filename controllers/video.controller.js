import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { IoPrismSharp } from "react-icons/io5";
import { video } from "@cloudinary/url-gen/qualifiers/source";

const prisma = new PrismaClient();

const createVideo = asyncHandler(async(req, res) => {
    let { video_id, course_id, name, file_path } = req.body;

    if (
        [video_id, course_id].some((field) => !field)
        ||
        [name, file_path].some((field) => !field || field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existingFilePathVideo = await prisma.video.findUnique({
        where: {
            file_path
        }
    });

    if (existingFilePathVideo) {
        throw new ApiError(409, "There already exists a video at the given file path");
    }

    const video = await prisma.video.create({
        data: {
            id: video_id,
            course: {
                connect: {
                    id: course_id
                }
            },
            name,
            file_path
        }
    });

    if (!video) {
        throw new ApiError(500, "Failed to create video");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                video: video
            },
            "Successfully Created Video"
        )
    )
});

const findVideosByCourseId = asyncHandler(async(req, res) => {
    let { course_id } = req.query;

    if (!course_id) {
        throw new ApiError(400, "Course Id Undefined");
    }

    const videos = await prisma.video.findMany({
        where: {
            course_id
        }
    });

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                videos: videos
            },
            "Successfully Found Videos"
        )
    )
});

export {
    createVideo,
    findVideosByCourseId
}