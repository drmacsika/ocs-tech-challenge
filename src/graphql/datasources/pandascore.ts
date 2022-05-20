import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { randomInteger } from '../../utils';

class PandascoreAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.pandascore.co/';
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.apiKey}`);
  }

  async getPlayers(limit = 10, page = 1) {
    return this.get(`players?page=${page}&per_page=${limit}`);
  }

  async getPlayerById(id: any) {
    return this.get(`players/${id}`);
  }

  // Get the data for a list of teams
  async getTeams() {
    return this.get('teams');
  }

  // Get data for a single team
  async getTeamById(id: any) {
    return this.get(`teams/${id}`);
  }

  // Get data for a list of video games
  async getVideoGames() {
    return this.get('videogames');
  }

  // Get data for a single video game
  async getVideoGameById(id: any) {
    return this.get(`videogames/${id}`);
  }

  // Get data for a list of featured participants
  async getFeatured() {
    const players = await this.get(`players?page=${randomInteger(1, 10)}&per_page=5`);
    const teams = await this.get(`teams?page=${randomInteger(1, 10)}&per_page=5`);
    return [...players, ...teams];
  }
}

export default PandascoreAPI;
