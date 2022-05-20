/**
 * 
 * The context function is part of the ApolloServer constructor.
 * Provides configuration attributions that are accessible when the 
 * server runs.
 * 
 * @param {request}
 * @returns apiKey: string, userAgent: string
 */

require('dotenv').config()

const context = (req?: {req: any}): {apiKey: string, userAgent: string} => {  
  const apiKey = process.env.PANDASCORE_API_KEY
    return {
      apiKey: String(apiKey),
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36"
    }
  }

  export default context;