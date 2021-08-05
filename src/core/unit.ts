const BASE_URL =
    'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/';
const Papa = require('papaparse');
export const loadCsv = async (filename: string) => {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${filename}`;
    console.log(`  * Downloading data from: ${url}`);
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results: any) => {
        resolve(parseCsv(results['data']));
      },
    });
  });
};
const parseCsv = async (data: any) => {
  return new Promise((resolve) => {
    data = data.map((row: any) => {
      return Object.keys(row).map((key) => parseFloat(row[key]));
    });
    resolve(data);
  });
};

/**
 * 使用 Fisher-Yates algorithm.flab 处理数据和目标（保持对齐）
 * @param {any} data
 * @param {any} target
 */
export function shuffle(data: any[], target: any) {
  let counter = data.length;
  let temp = 0;
  let index = 0;
  while (counter > 0) {
    index = (Math.random() * counter) | 0;
    counter--;
    // data:
    temp = data[counter];
    data[counter] = data[index];
    data[index] = temp;
    // target:
    temp = target[counter];
    target[counter] = target[index];
    target[index] = temp;
  }
};
