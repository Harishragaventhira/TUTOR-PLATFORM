const Course = require('./models/Course');
const sequelize = require('./config/database');

async function fixCourses() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
    
    const [count] = await Course.update(
      { status: 'published' },
      { where: { status: 'draft' } }
    );
    
    console.log(`Updated ${count} courses to published status.`);
    process.exit(0);
  } catch (error) {
    console.error('Error fixing courses:', error);
    process.exit(1);
  }
}

fixCourses();
