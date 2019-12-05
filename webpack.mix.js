const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.react('resources/assets/coreui/src/index.js',   'public/js/coreui.js' );

mix.react('resources/assets/app/index.js',      'public/js/app.js')
   .sass( 'resources/assets/app/sass/app.scss', 'public/css');


