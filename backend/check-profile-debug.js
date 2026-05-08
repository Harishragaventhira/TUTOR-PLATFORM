const User = require('./models/User');
const StudentProfile = require('./models/StudentProfile');
const UserAddress = require('./models/UserAddress');

async function checkData() {
  try {
    const user = await User.findOne({
      order: [['id', 'DESC']],
      include: [
        { model: StudentProfile, as: 'studentProfile' },
        { model: UserAddress, as: 'addresses' }
      ]
    });

    if (user) {
      console.log('--- USER ---');
      console.log(JSON.stringify(user, null, 2));
    } else {
      console.log('No users found.');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkData();
