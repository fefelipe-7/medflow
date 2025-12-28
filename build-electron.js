import esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildElectron = async () => {
  try {
    await esbuild.build({
      entryPoints: [
        path.join(__dirname, 'electron/main.ts'),
        path.join(__dirname, 'electron/preload.ts'),
      ],
      bundle: false,
      outdir: path.join(__dirname, 'dist-electron'),
      platform: 'node',
      target: 'node18',
      external: ['electron'],
      format: 'esm',
      sourcemap: true,
    });
    console.log('✓ Electron main process built successfully');
  } catch (error) {
    console.error('✗ Failed to build Electron main process:', error);
    process.exit(1);
  }
};

buildElectron();
