import os from 'os-utils';
import fs from 'fs';

export function getCpuUsage() {
  return new Promise((resolve) => os.cpuUsage(resolve));
}

export function getRamUsage() {
  return 1 - os.freememPercentage();
}

export async function getDiagnostics() {
  const cpuUsage = await getCpuUsage();
  const ramUsage = getRamUsage();
  console.log({ cpuUsage, ramUsage });
}

export function getStorageData() {
  const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}

export function placeHolder() {}
