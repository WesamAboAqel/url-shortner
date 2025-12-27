import { Request, Response } from "express";
import { generateCharacters } from "../utils/generateCharacters.js";
import {
    changeOriginalUrl,
    getUrl,
    insertUrl,
    removeUrl,
} from "../repositories/url.repo.js";
import { getModeForUsageLocation } from "typescript";

// @desc    Create short urls
// @route   POST /api/url/add
// @access  Public
export const createUrl = async (
    request: Request,
    response: Response
): Promise<void> => {
    const data = {
        short_url: `${generateCharacters()}`,
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

    // console.log(url.visit_count);

    response.redirect(url.original_url);
};

// @desc    change original url
// @route   PUT /api/url
// @access  Public
export const updateUrl = async (
    request: Request,
    response: Response
): Promise<void> => {
    const data = {
        short_url: request.body.short_url,
        original_url: request.body.original_url,
    };
    // console.log(data);
    const newUrl = await changeOriginalUrl(data);
    // console.log(newUrl);
    response.status(200).json(newUrl);
};

// @desc    delete url entry
// @route   DELETE /api/url/
// @access  Public
export const deleteUrl = async (
    request: Request,
    response: Response
): Promise<void> => {
    try {
        const url = await removeUrl(request.body.short_url);
        if (!url) throw new Error();
        response.status(202).json({ msg: "deleted successfully" });
    } catch (error) {
        response.status(404).json({ msg: "not found" });
    }
};
