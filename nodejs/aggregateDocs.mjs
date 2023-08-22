import fs from 'fs';
import { fetch } from './aggregateDocs.lib.mjs';

const aggregates = {};
let successRequests = 0;
let timeout;

function saveAggregates() {
  fs.writeFileSync('./aggregates.json', JSON.stringify(aggregates));
}

function debounceSaveAggregates() {
  clearTimeout(timeout);
  timeout = setTimeout(saveAggregates, 5000);
}

export async function aggregateDocs() {
  while (successRequests < 100000) {
    try {
      const response = await fetch('http://localhost:3000');
      const data = await response.json();
      aggregates[data.name] = (aggregates[data.name] || 0) + 1;
      successRequests += 1;
      debounceSaveAggregates();
    } catch (error) {
      console.error(error);
    }
  }
}
