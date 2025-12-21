

// @desc    sends hello world to user
// @route   GET /api/hello

import { Request, Response } from "express";

// @access  Public
export const helloWorld = async (
    request: Request,
    response: Response
): Promise<void> => {
    console.log("Hello World!");

    response.status(200).json({ msg: "Hello World!" });
    return;
};
