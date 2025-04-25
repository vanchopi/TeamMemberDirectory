import { Quasar } from 'quasar';

/* eslint-disable */
global = {
  console: {
    ...console,
    log: jest.fn(),
    // debug: jest.fn(),
    // info: jest.fn(),
    warn: jest.fn(),
    // error: jest.fn(),
  },
  plugins: [
    [Quasar, {
      plugins: {},
    }],
  ],
}