import sequelize from '../config/database.js';
import '../models/index.js';

const migrate = async () => {
  try {
    console.log('Starting database migration...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✓ Database connection established');

    // Sync all models
    await sequelize.sync({ force: false, alter: false });
    console.log('✓ All models synchronized successfully');

    console.log('\n=== Migration completed successfully ===\n');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  }
};

migrate();
