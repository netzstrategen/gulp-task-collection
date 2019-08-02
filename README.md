# netzstrategen Gulp tasks collection

Commonly used Gulp tasks shared across projects.

## Supported tasks

- Clean `/dist` folder
- Sass compilation
- JS compilation
- Image compression
- Fractal server and build

## Installation

1. `yarn add @netzstrategen/gulp-task-collection`
2. `require` in project Gulpfile (see [sample.gulpfile.js](https://github.com/netzstrategen/gulp-task-collection/blob/master/sample.gulpfile.js))
3. Customise asset paths in project `package.json` (see [package.json](https://github.com/netzstrategen/gulp-task-collection/blob/master/package.json))

## Available commands

- `gulp`: Default task runs (in order) `fractal:start`, `fonts`, `images`, `styles`, `scripts` and then watches for changes
- `gulp build`: Build assets (`fonts`, `images`, `styles`, `scripts`)
- `gulp build:production`: Build production-ready assets


- `gulp clean`: Clean `/dist` folder
- `gulp styles` and `gulp styles:production`: Sass compilation
- `gulp scripts` and `gulp scripts:production`: JS compilation
- `gulp fonts`: Copy fonts to `/dist` folder
- `gulp images`: Image compression
- `gulp fractal:start`: Start Fractal server (if config path exists in `package.json`)
- `gulp fractal:build`: Build static version of Fractal project

## Abort on errors

In the default setup, all tasks are continued even if any of the task produces an error. Furthermode, calling `gulp […]` will always exit with code 0.
To prevent this behavior, an env value can be passed: 

`GULP_ABORT_ON_ERROR=true gulp build`

This will cause gulp to exit on error with an exit code > 0.

## Authors

- Fabian Marz: [fabian@netzstrategen.com](fabian@netzstrategen.com)
- Tom Hare: [tom@netzstrategen.com](tom@netzstrategen.com)
