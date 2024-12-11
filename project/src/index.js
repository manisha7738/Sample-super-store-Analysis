import chalk from 'chalk';
import { existsSync } from 'fs';
import { analyzeSales } from './analysis/salesAnalysis.js';
import { analyzeCustomers } from './analysis/customerAnalysis.js';
import { createOutputDirectory } from './utils/formatOutput.js';
import { initializeDatabase } from './database/setup.js';

async function main() {
  try {
    console.log(chalk.bold('\nSuperstore Sales Data Analysis\n'));
    
    // Create necessary directories
    createOutputDirectory();
    
    // Check if database exists, if not initialize it
    if (!existsSync('superstore.db')) {
      console.log(chalk.yellow('Database not found. Initializing...'));
      await initializeDatabase();
    }
    
    // Run analyses
    await analyzeSales();
    await analyzeCustomers();
    
    console.log(chalk.green('\nAnalysis completed successfully!\n'));
  } catch (error) {
    console.error(chalk.red('Error during analysis:'), error);
    process.exit(1);
  }
}

main();