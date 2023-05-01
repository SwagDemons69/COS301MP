export default {
	displayName: 'app-shared-components',
	preset: '../../../../jest.preset.js',
	globals: {
	  'ts-jest': {
		tsconfig: '<rootDir>/tsconfig.spec.json',
	  },
	},
	transform: {
	  '^.+\\.[tj]s$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../../../coverage/libs/app/shared-components',
  };