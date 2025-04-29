import bcrypt from 'bcryptjs';
import User from '../modules/auth/models/user.js';

const seedAdminUser = async () => {
  try {
    const adminData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'Admin123!',
      role: 'admin',
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create or find the admin user
    await User.findOrCreate({
      where: { username: adminData.username },
      defaults: {
        ...adminData,
        password: hashedPassword, // Save the hashed password
      },
    });

    console.log('Admin user seeded successfully.');
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  }
};

export default seedAdminUser;