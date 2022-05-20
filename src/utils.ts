/**
 * Takes a data object from the Wikipedia API and returns a description
 * object with the title and text.
 * @param data
 * @returns {{title: string, text: string}}
 */
export const resolveDescription = async (data: any): Promise<any> => {
    let descriptionPage;
    try {
        descriptionPage = await String(Object.keys(data.query.pages)[0]);
    }
    catch (err) {
        return {title: null, text: null};
    }
    const title = await data.query.pages[descriptionPage].title;
    const text = await data.query.pages[descriptionPage].extract
     ? data.query.pages[descriptionPage].extract :
      "No wikipedia text found for this title.";
    return {title, text};
}

/**
 * Returns an integer random number between 
 * min (included) and max (included)
 * @param min: number representing the minimum value
 * @param max: number representing the maximum value
 * @returns {number}
 */
export const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
