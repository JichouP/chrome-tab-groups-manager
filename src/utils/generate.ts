import fs from 'fs';
import archiver from 'archiver';

const generate = async () => {
  const output = fs.createWriteStream('TabGroupsManager.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);
  archive.glob('dist/*');
  await archive.finalize();
};

generate();
