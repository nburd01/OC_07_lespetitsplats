// Define cardsApi class with Api
class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    try {
      const res = await fetch(this._url);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      return res.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to be caught in the calling code
    }
  }
}
class CardsApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  // Get Medias data
  async getCards() {
    const response = await this.get();
    const cardsData = response.recipes;
    cardsData.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    console.log(cardsData);
    return cardsData;
  }
}

export { CardsApi };
