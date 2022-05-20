import axios from 'axios';
import context from '../graphql/context';
import { randomInteger } from '../utils';
require('dotenv').config()

/**
 * This is a test file to test the 
 * important utility functions we have in place
 * as well as other house keeping requirements
 */

describe("Pandascore API KEY", () => {
    const pandascoreApiKey = process.env.PANDASCORE_API_KEY;
    
    test("Check if Pandascore API KEY is set", () => {
        expect(pandascoreApiKey).toBeDefined();
    })
    test("Check if Pandascore API KEY is a proper value", () => {
        expect(pandascoreApiKey).not.toBe("");
        expect(pandascoreApiKey).not.toBe(" ");
        expect(pandascoreApiKey).not.toBe(null);
        expect(pandascoreApiKey).not.toBe(undefined);
        expect(typeof pandascoreApiKey).toBe("string");
    })
    test("Check if Pandascore API KEY is valid", async () => {
        const response = await axios.get(`https://api.pandascore.co/players`, {
            headers: {
                'Authorization': `Bearer ${pandascoreApiKey}`
            }
        });
        const status = await response.status;
        expect(status).toBe(200);
    })
})

describe("Check User Agent", () => {
    test("Check is custom user agent is set", () => {
        const context_data = context();
        expect(context_data.userAgent).toBeDefined();
    })
})

describe("Random value test", () => {
    test("Check if value is random", () => {
        const random_value = randomInteger(1, 10);
        const random_value1 = randomInteger(1, 10);
        expect(random_value).toBeGreaterThan(0);
        expect(random_value).toBeLessThan(11);
        expect(typeof random_value).toBe("number");
        expect(random_value).not.toBe(random_value1);
    });
});