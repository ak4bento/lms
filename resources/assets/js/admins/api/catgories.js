import Api from './Api';

class Categories extends Api {
  constructor() {
    super('/api/categories');
  }
}

export default new Categories;