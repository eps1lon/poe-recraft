#!/usr/bin/env node
/* eslint-env node */
const fs = require('fs').promises;
const execa = require('execa');
const Listr = require('listr');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '../../');
const exportPath = path.resolve(workspaceRoot, './website/build');

main().catch(error => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const tasks = new Listr([
    {
      title: 'bootstrap',
      task: () => {
        return new Listr(
          [
            { title: 'actual', task: () => execa('yarn', ['bootstrap']) },
            {
              title: 'i18n',
              task: () => execa('yarn', ['workspace', 'poe-i18n', 'build:esm']),
            },
            {
              title: 'poe-mods',
              task: () => execa('yarn', ['workspace', 'poe-mods', 'build:esm']),
            },
            {
              title: 'poe-components-item',
              task: () =>
                execa('yarn', [
                  'workspace',
                  'poe-components-item',
                  'build:esm',
                ]),
            },
          ],
          { concurrent: true },
        );
      },
    },
    {
      title: 'build',
      task: () => {
        return new Listr(
          [
            {
              title: 'build website',
              task: () => execa('yarn', ['workspace', 'website', 'build']),
            },
            {
              title: 'build docs/mods',
              task: () =>
                execa('yarn', ['workspace', 'poe-mods', 'build:docs']),
            },
            {
              title: 'build docs/react-components/api',
              task: () =>
                execa('yarn', ['workspace', 'poe-components-item', 'docs:api']),
            },
            {
              title: 'build docs/react-components/stories',
              task: () =>
                execa('yarn', [
                  'workspace',
                  'poe-components-item',
                  'docs:components:build',
                ]),
            },
          ],
          { concurrent: true },
        );
      },
    },
    {
      title: 'prepare export',
      task: () => {
        return new Listr([
          {
            title: 'prepare docs/',
            task: () =>
              fs.mkdir(path.resolve(exportPath, './docs/poe-components-item'), {
                recursive: true,
              }),
          },
          {
            title: 'move poe-components-item docs',
            task: () =>
              Promise.all([
                fs.rename(
                  path.resolve(workspaceRoot, './packages/react-item/docs'),
                  path.resolve(exportPath, './docs/poe-components-item/api'),
                ),
                fs.rename(
                  path.resolve(workspaceRoot, './packages/react-item/dist'),
                  path.resolve(
                    exportPath,
                    './docs/poe-components-item/stories',
                  ),
                ),
              ]),
          },
          {
            title: 'move poe-mods docs',
            task: () =>
              fs.rename(
                path.resolve(workspaceRoot, './packages/mods/docs-dist'),
                path.resolve(exportPath, './docs/poe-mods'),
              ),
          },
        ]);
      },
    },
  ]);

  await tasks.run();
}
