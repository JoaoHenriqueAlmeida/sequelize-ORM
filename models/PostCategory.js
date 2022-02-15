const PostCategory = (sequelize) => {
  const PostCategoryTable = sequelize.define('PostCategory', {}, { timestamps: false,
    tableName: 'PostsCategories',
  });

  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'Categories',
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategoryTable;
};

module.exports = PostCategory;