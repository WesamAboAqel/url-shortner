import { Request, Response } from "express";
import { generateCharacters } from "../utils/generateCharacters.js";
import { getUrl, insertUrl } from "../repositories/url.repo.js";
import { getModeForUsageLocation } from "typescript";

// @desc    Create short urls
// @route   POST /api/url/add
// @access  Public
export const createUrl = async (
    request: Request,
    response: Response
): Promise<void> => {
    const data = {
        short_url: generateCharacters(),
        original_url: request.body.original_url,
    };

    let newUrl = await insertUrl(data);

    while (!newUrl) {
        newUrl = await insertUrl(data);
    }

    response.status(200).json(newUrl);
    return;
};

// @desc    redirects user to the original url
// @route   GET /api/url/:short_url
// @access  Public
export const getOriginal = async (
    request: Request,
    response: Response
): Promise<void> => {
    const url = await getUrl(request.params.short_url!);

    if (!url) {
        response
            .status(404)
            .json({ msg: "The url you requested does not exist" });
    }

    response.redirect(url.original_url);
};
