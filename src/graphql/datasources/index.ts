import PandascoreAPI from './pandascore';
import WikipediaAPI from './wikipedia';

const dataSources: any = () => {
  return {
    pandascoreAPI: new PandascoreAPI(),
    wikipediaAPI: new WikipediaAPI(),
  };
};

export default dataSources;
