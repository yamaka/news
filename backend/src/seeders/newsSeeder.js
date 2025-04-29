import News from '../modules/news/models/news.js';
import Category from '../modules/categories/models/category.js';

const seedNews = async () => {
  try {
    // Fetch categories to associate with news
    const categories = await Category.findAll();

    if (categories.length === 0) {
      console.error('No categories found. Please seed categories first.');
      return;
    }

    const newsPosts = [
      {
        title: 'Avances en Inteligencia Artificial',
        content: 'La inteligencia artificial está revolucionando la tecnología.',
        datePost: new Date(),
        creator: 'John Doe',
        categoryId: categories[0].id, // Associate with the first category
      },
      {
        title: 'Resultados de la Copa Mundial',
        content: 'El equipo nacional logró una victoria histórica.',
        datePost: new Date(),
        creator: 'Jane Smith',
        categoryId: categories[1].id, // Associate with the second category
      },
      {
        title: 'Economía Global en 2025',
        content: 'Un análisis de las tendencias económicas globales.',
        datePost: new Date(),
        creator: 'Alice Johnson',
        categoryId: categories[2].id, // Associate with the third category
      },
    ];

    for (const news of newsPosts) {
      await News.findOrCreate({
        where: { title: news.title },
        defaults: news,
      });
    }

    console.log('News posts seeded successfully.');
  } catch (error) {
    console.error('Error seeding news posts:', error.message);
  }
};

export default seedNews;