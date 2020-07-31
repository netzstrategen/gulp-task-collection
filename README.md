# netzstrategen Gulp tasks collection

Commonly used Gulp tasks shared across projects.

## Supported tasks

- Clean `/dist` folder
- Sass compilation
- JS compilation
- Image compression
- SVG icon sprite generation
- Inline SVG files
- Fractal server and build

## Installation

1. `npm i @netzstrategen/gulp-task-collection`
2. `require` in project Gulpfile (see [sample.gulpfile.js](https://github.com/netzstrategen/gulp-task-collection/blob/master/sample.gulpfile.js))
3. Customise asset paths in project `package.json` (see [package.json](https://github.com/netzstrategen/gulp-task-collection/blob/master/package.json))

## Available commands

- `gulp`: Default task runs (in order) `fractal:start`, `fonts`, `icons`, `images`, `styles`, `scripts` and then watches for changes
- `gulp build`: Build assets (`fonts`, `icons`, `images`, `styles`, `scripts`)
- `gulp build:production`: Build production-ready assets

- `gulp clean`: Clean `/dist` folder
- `gulp styles` and `gulp styles:production`: Sass compilation
- `gulp scripts` and `gulp scripts:production`: JS compilation
- `gulp fonts`: Copy fonts to `/dist` folder
- `gulp icons`: Generate SVG icon sprite from folder of individual SVG icons
- `gulp images`: Image compression and inline SVG
- `gulp fractal:start`: Start Fractal server (if config path exists in `package.json`)
- `gulp fractal:build`: Build static version of Fractal project

## `styles` / `scripts` task options

Option | Effect
:--- | :---
`--minify` | Additionally generate minified files, suffixed with `.min`. Defaults to `true` in production builds.
`--sourcemaps` | Render sourcemaps.
`--fail-after-error` | See section _Continuous Integration_ below for details.
`--concat` | By default, assets are compiled into individual files. Use this flag to concatenate them into a single js/css file.

You can pass an `options` object inside `gulpPaths.scripts`/`gulpPaths.styles` in your `package.json` to set options for each respective task.

## Continuous Integration

To not break the watch process, all tasks are continued by default, even if one of the tasks produces an error, so gulp will always exit with code 0.

Continuous Integrations and build scripts can use the flag `--fail-after-error` to make gulp exit after an error with an exit code > 0.

## Authors

- Fabian Marz: [fabian@netzstrategen.com](fabian@netzstrategen.com)
- Tom Hare: [tom@netzstrategen.com](tom@netzstrategen.com)
