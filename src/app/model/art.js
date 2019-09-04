// const path = require('path');
const { Music, Movie, Sentence } = require('./classic');

class Art {
  static async getData(art_id, type, useScope = true) {
    let art = null;
    const finder = {
      where: {
        id: art_id
      }
    };
    const scope = useScope ? 'bh' : null;
    switch (type) {
      case 100:
        art = await Movie.scope(scope).findOne(finder);
        break;
      case 200:
        art = await Music.scope(scope).findOne(finder);
        break;
      case 300:
        art = await Sentence.scope(scope).findOne(finder);
        break;
      case 400: {
        const Book = require('./book');
        art = await Book.scope(scope).findOne(finder);
        if (!art) {
          art = await Book.create({
            id: art_id
          });
        }
        break;
      }
      default:
    }
    return art;
  }

  // static async increment(art_id, type) {
  //   const art = await Art.findOne({ where: { art_id, type } });
  //   return art.increment('fav_nums', { by: 1 });
  // }

  // static async decrement(art_id, type) {
  //   const art = await Art.findOne({ where: { art_id, type } });
  //   return art.decrement('fav_nums', { by: 1 });
  // }
}

module.exports = Art;
