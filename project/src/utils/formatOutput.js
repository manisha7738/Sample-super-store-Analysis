import Table from 'cli-table3';
import chalk from 'chalk';
import { mkdirSync } from 'fs';

export function formatTable(data) {
  if (!data || data.length === 0) {
    console.log(chalk.yellow('No data available'));
    return;
  }

  const headers = Object.keys(data[0]);
  const table = new Table({
    head: headers.map(h => chalk.cyan(h)),
    style: {
      head: [],
      border: []
    }
  });

  data.forEach(row => {
    table.push(Object.values(row));
  });

  console.log(table.toString());
}

export function createOutputDirectory() {
  const dirs = ['outputs', 'outputs/reports'];
  dirs.forEach(dir => {
    try {
      mkdirSync(dir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
  });
}