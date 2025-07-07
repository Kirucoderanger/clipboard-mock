


// src/fetchUsers.ts

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';


interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface CleanedUser {
  id: number;
  name: string;
  email: string;
  companyName: string;
}

async function fetchAndCleanUsers(): Promise<void> {
  try {
    console.log(chalk.blue('📡 Fetching users from API...'));
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    const users = response.data;

    console.log(chalk.green(`✅ Fetched ${users.length} users. Cleaning data...`));

    const cleaned: CleanedUser[] = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      companyName: user.company.name
    }));

    const outputPath = path.join(__dirname, '../data/cleaned_users.json');
    fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2));

    console.log(chalk.greenBright(`🎉 Data saved to ${outputPath}`));
  } catch (err) {
    console.error(chalk.red('❌ Failed to fetch or process users'), err);
  }
}

fetchAndCleanUsers();
