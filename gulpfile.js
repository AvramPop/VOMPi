( function () {

    'use strict';

    var //Required
        args = require( 'yargs' ).argv,
        spawn = require( 'child_process' ).spawn,
        cssmin = require( 'gulp-cssnano' ),
        concat = require( 'gulp-concat' ),
        del = require( 'del' ),
        echo = require( 'cli-color' ),
        gulp = require( 'gulp' ),
        gulpif = require( 'gulp-if' ),
        linker = require( 'gulp-linker' ),
        ngAnnotate = require( 'gulp-ng-annotate' ),
        rename = require( 'gulp-rename' ),
        runSequence = require( 'run-sequence' ).use( gulp ),
        sass = require( 'gulp-ruby-sass' ),
        sourcemaps = require( 'gulp-sourcemaps' ),
        uglify = require( 'gulp-uglify' ),
        shell = require( 'gulp-shell' ),
        node,

        // Client FOLDERS
        client = {
            ROOT: 'web/client/',
            SRC_SCSS: 'web/client/source/sass',
            EXPORT_CSS: 'web/client/public/css',
            SRC_JS: 'web/client/source/js',
            EXPORT_JS: 'web/client/public/js'
        },

        // Dashboard FOLDERS
        dashboard = {
            ROOT: 'web/dashboard/',
            SRC_SCSS: 'web/dashboard/source/sass',
            EXPORT_CSS: 'web/dashboard/static/css',
            SRC_JS: 'web/dashboard/source/js',
            EXPORT_JS: 'web/dashboard/static/js'
        },

        // Exported FILES
        out = {
            MINIFIEDCSS: 'app.min.css',
            MINIFIEDJS: 'app.min.js'
        };


    /**
     * $ gulp minifyJS --GLOBAL FUNCTION
     * description: Concat and minified JS files into *.min.js
     */
    gulp.task( 'minifyJS', function () {
        return gulp.src( [ args.SRC_JS + '/**/module.js', args.SRC_JS + '/**/*.js' ] )
            .pipe( sourcemaps.init() )
            .pipe( concat( out.MINIFIEDJS ) )
            .pipe( ngAnnotate() )
            .pipe( uglify() )
            .pipe( sourcemaps.write() )
            .pipe( gulp.dest( args.EXPORT_JS ) );
    } );

    /**
     * $ gulp linkJS --GLOBAL FUNCTION
     * description: lin all js files to index.html client
     */
    gulp.task( 'linkJS', function () {
        return gulp.src( args.ROOT + args.FOLDER + 'index.html' )
            .pipe( linker( {
                scripts: [ ( args.EXPORT_JS + '/' + out.MINIFIEDJS ) ],
                startTag: '<!-- APP -->',
                endTag: '<!-- END APP -->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: args.ROOT + args.FOLDER
            } ) )
            .pipe( gulp.dest( args.ROOT + args.FOLDER ) );
    } );

    /**
     * $ gulp compileSASS --GLOBAL FUNCTION
     * description: compile sass file into a CSS file
     */
    gulp.task( 'compileSASS', function () {
        return sass( args.SRC_SCSS + '/app.scss', {
                sourcemap: true
            } )
            .on( 'error', function ( err ) {
                console.error( 'Error!', err.message );
            } )
            .pipe( gulpif( args.production, sourcemaps.init() ) )
            .pipe( gulpif( args.production, cssmin() ) )
            .pipe( sourcemaps.write( {
                includeContent: false,
                sourceRoot: '/' + args.SRC_SCSS
            } ) )
            .pipe( gulpif( args.production, rename( {
                suffix: '.min'
            } ) ) )
            .pipe( gulp.dest( args.EXPORT_CSS ) );
    } );

    /**
     * $ gulp linkCSS --GLOBAL FUNCTION
     * description: link to index.html client all sass files
     */
    gulp.task( 'linkCSS', function () {
        var isProduction = args.production;
        return gulp.src( args.ROOT + args.FOLDER + '/index.html' )
            .pipe( linker( {
                scripts: isProduction ? [ ( args.EXPORT_CSS + '/' + out.MINIFIEDCSS ) ] : [ ( args.EXPORT_CSS + '/app.css' ) ], //jshint ignore: line
                startTag: '<!-- MAIN STYLE -->',
                endTag: '<!-- END MAIN STYLE -->',
                fileTmpl: '<link href="%s" rel="stylesheet"/>',
                appRoot: args.ROOT + args.FOLDER
            } ) )
            .pipe( gulp.dest( args.ROOT + '/' + args.FOLDER ) );
    } );
    /**
     * $ gulp docs-api --GLOBAL FUNCTION
     * description: genereate apidocs
     */
    gulp.task( 'docs-api', shell.task( [ 'apidoc -i ./server/handlers -o docs/api/' ] ) );
    /**
     * $ gulp clean --GLOBAL FUNCTION
     * description: clean client side css and js folder
     */
    gulp.task( 'clean', function () {
        var cleanALL = function () {
                del.sync( [ './docs/**' ] );
                del.sync( [ args.EXPORT_JS, args.EXPORT_CSS ] );
            },
            cleanONE = function ( folder ) {
                del.sync( [ folder ] );
            };
        if ( !args.js && !args.css ) {
            return cleanALL();
        } else {
            return args.js ? cleanONE( args.EXPORT_JS ) : cleanONE( args.EXPORT_CSS );
        }
    } );

    /**
     * $ gulp server
     * description: launch the server. If there's a server already running, kill it.
     */
    gulp.task( 'server', function () {
        if ( node ) {
            node.kill();
        }
        node = spawn( 'node', [ 'server/server.js' ], {
            stdio: 'inherit'
        } );

        node.on( 'close', function ( code ) {
            if ( code === 8 ) {
                console.log( echo.redBright.bold( 'Error detected, waiting for changes...' ) );
            }
        } );
    } );

    /**
     * $ gulp clientJS
     * description: Compile all JS files for the Web Client component.
     */
    gulp.task( 'clientJS', function ( callback ) {
        args = {
            js: 'js',
            ROOT: client.ROOT,
            SRC_JS: client.SRC_JS,
            EXPORT_JS: client.EXPORT_JS,
            FOLDER: 'public/'
        };
        runSequence(
            'clean',
            'minifyJS',
            'linkJS',
            callback
        );
    } );

    /**
     * $ gulp dashJS
     * description: Compile all JS files for the Dashboard component.
     */
    gulp.task( 'dashJS', function ( callback ) {
        args = {
            js: 'js',
            ROOT: dashboard.ROOT,
            SRC_JS: dashboard.SRC_JS,
            EXPORT_JS: dashboard.EXPORT_JS,
            FOLDER: 'static/'
        };
        runSequence(
            'clean',
            'minifyJS',
            'linkJS',
            callback
        );
    } );

    /**
     * $ gulp clientSCSS
     * description: Compile all SCSS files for the Web Client component.
     */
    gulp.task( 'clientSCSS', function ( callback ) {
        args = {
            css: 'css',
            ROOT: client.ROOT,
            SRC_SCSS: client.SRC_SCSS,
            EXPORT_CSS: client.EXPORT_CSS,
            FOLDER: 'public/'
        };
        runSequence(
            'clean',
            'compileSASS',
            'linkCSS',
            callback
        );
    } );

    /**
     * $ gulp dashSCSS
     * description: Compile all SCSS files for the Dashboard component.
     */
    gulp.task( 'dashSCSS', function ( callback ) {
        args = {
            css: 'css',
            ROOT: dashboard.ROOT,
            SRC_SCSS: dashboard.SRC_SCSS,
            EXPORT_CSS: dashboard.EXPORT_CSS,
            FOLDER: 'static/'
        };
        runSequence(
            'clean',
            'compileSASS',
            'linkCSS',
            callback
        );
    } );

    /**
     * $ gulp start
     * description: Execute all sub-tasks and start the server,
     *              including the wathes (to listen for any changes)
     */
    gulp.task( 'start', function () {
        runSequence(
            'clientJS',
            'dashJS',
            'clientSCSS',
            'dashSCSS',
            'server',
            'watch'
        );
    } );

    /**
     * $ gulp watch
     * description: watch for any changes and restart server if required
     */
    gulp.task( 'watch', function () {

        gulp.watch( [ 'server/index.js', './server/**/*.js', './server/**/*.json' ], function () {
            runSequence(
                'server'
            );
        } );
        // Need to watch for sass changes too? Just add another watch call!
        // no more messing around with grunt-concurrent or the like. Gulp is
        // async by default.
        gulp.watch( client.SRC_SCSS + '/**/*.scss', [ 'clientSCSS' ] );
        gulp.watch( client.SRC_JS + '/**/*.js', [ 'clientJS' ] );
        gulp.watch( dashboard.SRC_SCSS + '/**/*.scss', [ 'dashSCSS' ] );
        gulp.watch( dashboard.SRC_JS + '/**/*.js', [ 'dashJS' ] );
    } );

    // Clean up if an error goes unhandled.
    process.on( 'exit', function () {
        if ( node ) {
            node.kill();
        }
    } );
} )();
