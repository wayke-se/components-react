import { Tree } from '../../@types/vehicle-properties';
import compareCategories from './compare-categories';
import compareBasicProperties from './compare-basic-properties';
import compareProperties from './compare-properties';

const sort = (tree: Tree) => {
  tree.categories.sort(compareCategories);
  tree.categories.forEach((category) => {
    if (category.id === 1000) {
      category.properties.sort(compareBasicProperties);
    } else {
      category.properties.sort(compareProperties);
      category.subCategories.forEach((subCategory) => {
        subCategory.properties.sort(compareProperties);
      });
    }
  });
};

export default sort;
