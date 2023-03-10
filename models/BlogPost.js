const BlogPost = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    timestamps: false,
  });

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User,
       { foreignKey: 'userId', as: 'user' });
  };

  return BlogPostTable;
};

module.exports = BlogPost;
