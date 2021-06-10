import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { TaskFunction } from 'gulp';

export const generate: TaskFunction = async (done): Promise<void> => {
  const output = fs.createWriteStream(
    path.resolve('out', 'TabGroupsManager.zip')
  );
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);
  archive.glob('dist/*');
  await archive.finalize();
  done();
};
