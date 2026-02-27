// SPDX-License-Identifier: AGPL-3.0-or-later
/** @type {import("@commitlint/types").UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // Allow mixed-case commit subjects (remove forced lower-case requirement)
    'header-max-length': [2, 'always', 100],
  },
};
