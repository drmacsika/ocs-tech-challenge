import {RESTDataSource, RequestOptions} from 'apollo-datasource-rest';

class WikipediaAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://en.wikipedia.org/w/api.php';
    }

    willSendRequest(request: RequestOptions) {
        request.headers.set('User-Agent', this.context.userAgent);
    }

    async getDescription(title: any) {
        return await this.get(`?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${title}`);
    }

}

export default WikipediaAPI;