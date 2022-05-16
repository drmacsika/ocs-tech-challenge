import {RESTDataSource} from 'apollo-datasource-rest';

class PandascoreAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.pandascore.co/';
    }

    async getPlayerById(id) {
        return this.get(`players/${id}`);
    }

    async getTeamById(id) {
        return this.get(`teams/${id}`);
    }

    async getVideogameById(id) {
        return this.get(`videogames/${id}`);
    }
}

export default PandascoreAPI;