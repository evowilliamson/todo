import sequelize from '../config/database.js';
import { User, Todo, Category, Tag } from '../models/index.js';

const seed = async () => {
  try {
    console.log('Starting database seeding...');

    // Create demo user
    const demoUser = await User.create({
      email: 'demo@example.com',
      password: 'Demo123!@#',
      name: 'Demo User',
    });
    console.log('✓ Demo user created (email: demo@example.com, password: Demo123!@#)');

    // Create categories
    const categories = await Category.bulkCreate([
      { name: 'Work', color: '#3B82F6', userId: demoUser.id },
      { name: 'Personal', color: '#10B981', userId: demoUser.id },
      { name: 'Shopping', color: '#F59E0B', userId: demoUser.id },
      { name: 'Health', color: '#EF4444', userId: demoUser.id },
    ]);
    console.log('✓ Categories created');

    // Create tags
    const tags = await Tag.bulkCreate([
      { name: 'urgent', userId: demoUser.id },
      { name: 'important', userId: demoUser.id },
      { name: 'meeting', userId: demoUser.id },
      { name: 'review', userId: demoUser.id },
    ]);
    console.log('✓ Tags created');

    // Create sample todos
    const todos = await Todo.bulkCreate([
      {
        title: 'Complete project proposal',
        description: 'Finish the Q1 project proposal and send it to the team for review',
        status: 'in_progress',
        priority: 'high',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        categoryId: categories[0].id,
        userId: demoUser.id,
      },
      {
        title: 'Team meeting',
        description: 'Weekly sync with the development team',
        status: 'to_do',
        priority: 'medium',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        categoryId: categories[0].id,
        userId: demoUser.id,
      },
      {
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, vegetables',
        status: 'to_do',
        priority: 'low',
        categoryId: categories[2].id,
        userId: demoUser.id,
      },
      {
        title: 'Morning workout',
        description: '30 minutes cardio + strength training',
        status: 'completed',
        priority: 'medium',
        completedAt: new Date(),
        categoryId: categories[3].id,
        userId: demoUser.id,
      },
      {
        title: 'Read book for 30 minutes',
        description: 'Continue reading "Atomic Habits"',
        status: 'to_do',
        priority: 'low',
        categoryId: categories[1].id,
        userId: demoUser.id,
      },
    ]);
    console.log('✓ Sample todos created');

    // Associate tags with todos
    await todos[0].addTags([tags[0], tags[1]]);
    await todos[1].addTag(tags[2]);
    await todos[3].addTag(tags[1]);
    console.log('✓ Tags associated with todos');

    console.log('\n=== Seeding completed successfully ===\n');
    console.log('You can now login with:');
    console.log('Email: demo@example.com');
    console.log('Password: Demo123!@#\n');

    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
