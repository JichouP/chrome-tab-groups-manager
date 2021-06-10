import { series } from 'gulp';
import { bundle } from './bundle';
import { createCopyTask } from './copy';
import { generate } from './generate';
import { mkdir } from './mkdir';

export const build = series(
  mkdir('dist'),
  mkdir('out'),
  bundle({ minify: true }),
  createCopyTask('public', 'dist'),
  generate
);

export const dev = series(
  mkdir('dist'),
  mkdir('out'),
  bundle({ minify: false, sourcemap: 'inline' }),
  createCopyTask('public', 'dist')
);
