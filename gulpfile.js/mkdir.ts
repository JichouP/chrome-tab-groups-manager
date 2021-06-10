import fs from 'fs';
import path from 'path';
import { TaskFunction } from 'gulp';

export const mkdir = (target: string): TaskFunction =>
  async function mkdir() {
    await fs.promises.mkdir(path.resolve(target), { recursive: true });
  };
