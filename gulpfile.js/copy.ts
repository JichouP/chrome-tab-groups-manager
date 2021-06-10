/* eslint-disable import/no-extraneous-dependencies */
import { copy } from 'fs-extra';
import { TaskFunction } from 'gulp';

export const createCopyTask = (from: string, to: string): TaskFunction =>
  function copyPublicFiles(done) {
    copy(from, to, { recursive: true, overwrite: true }, done);
  };
