import { getJestProjects } from '@nrwl/jest';
import type {Config} from 'jest';

const config: Config = {
	preset: '../jest.preset.js'
}

export default {
  projects: getJestProjects(),
};
