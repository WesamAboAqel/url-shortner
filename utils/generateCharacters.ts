// @param
// @returns    url - 8 characters
// @notes      this function generates 8 characters for shortened urls
export const generateCharacters = (): string => {
    let outputString = "";

    const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 8; i++) {
        const index = Math.floor(Math.random() * 62);
        outputString += characters[index];
    }

    return outputString;
};
