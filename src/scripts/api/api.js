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
    return cardsData;
  }
}

export { CardsApi };
