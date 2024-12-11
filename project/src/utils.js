import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

export function createOutputDirectory() {
  const dirs = ['outputs', 'outputs/visualizations', 'outputs/reports'];
  dirs.forEach(dir => {
    try {
      mkdirSync(dir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
  });
}

export function saveMetrics(metrics, filepath) {
  mkdirSync(dirname(filepath), { recursive: true });
  writeFileSync(filepath, JSON.stringify(metrics, null, 2));
}

export function exportAnalysis(analysis, filename) {
  const csv = convertToCSV(analysis);
  writeFileSync(`outputs/reports/${filename}.csv`, csv);
}

function convertToCSV(data) {
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(header => obj[header]));
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}