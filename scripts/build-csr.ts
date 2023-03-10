import { execSync } from 'child_process';
import { cpSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

cpSync(join(cwd(), '/client/index.html'), join(cwd(), '/index.html'));
execSync('vite build --outDir dist/client ', { stdio: 'inherit' });
