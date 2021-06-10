import { build, BuildOptions } from 'esbuild';
import { TaskFunction } from 'gulp';

export const bundle = (options: BuildOptions): TaskFunction =>
  async function bundle() {
    await build({
      bundle: true,
      entryPoints: {
        background: 'src/background/index.ts',
        content_scripts: 'src/content_scripts/index.ts',
      },
      outdir: 'dist',
      ...options,
    });
  };
