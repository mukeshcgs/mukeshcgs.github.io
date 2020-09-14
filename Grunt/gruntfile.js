'use strict';
module.exports = function (grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        // Project settings
        config: config,
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            // making working assets copy
            main: {
                files: [{
                    expand: false,
                    flatten: false,
                    src: ['<%= config.dist %>/**'],
                    dest: 'build/',
                    filter: 'isFile'
                },]
            }
        },
        imagemin: {
            dynamic: {
                options: { // Target options 
                    optimizationLevel: 3,
                    cache: false
                },
                files: [{
                    expand: true, // Enable dynamic expansion 
                    cwd: '<%= config.app %>/images/', // app matches are relative to this path 
                    src: ['*.{ jpg, gif, png}'], // Actual patterns to match 
                    dest: '<%= config.dist %>/images/' // Destination path prefix 
                }]
            }
        },
        uncss: {
            dist: {
                files: {
                    '<%= config.dist %>/css/style.min.css': ['index.html']
                }
            }
        },
        purifycss: {
            options: {},
            target: {
                src: ['<%= config.dist %>/*.html'],
                css: ['<%= config.dist %>/css/main.css'],
                dest: '<%= config.dist %>/css/tidy-main.css'
            },
        },
        watch: {
            bower: {
                files: ['bower.json'],
                //tasks: ['wiredep']
            },
            gruntfile: {
                files: ['gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/sass/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
            },
            js: {
                files: ['<%= config.app %>/js/*.js', 'lib/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify'],
                options: {
                    livereload: true
                }
            },
            // libs: {
            //     files: ['libs/**/*.css'],
            //     tasks: ['cssmin'],
            // },
            // scripts: {
            //     files: ['<%= config.app %>/js/*.js', 'lib/**/*.js'],
            //     tasks: ['concat', 'uglify'],
            // }
        },

        sass: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/sass',
                    src: ['*.scss'],
                    dest: '<%= config.dist %>/css/',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.dist %>/css/',
                    ext: '.min.css'
                }]
            },
            deps: {
                src: [
                    'libs/jquery-ui/themes/base/core.css',
                    'libs/jquery-ui/themes/base/base.css',
                    'libs/jquery-ui/themes/base/theme.css',
                    'libs/jquery-ui/themes/base/widget.css',
                    'libs/jquery-ui/themes/base/mouse.css',
                    'libs/jquery-ui/themes/base/datepicker.css',
                    'libs/jquery-ui/themes/base/slider.css',
                    'libs/bxslider/jquery.bxslider.css',
                ],
                dest: '<%= config.dist %>/css/vendor.css'

            }
        },
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'gruntfile.js',
                '<%= config.app %>/js/*.js',
                '!<%= config.app %>lib/**/*.js'
            ]
        },
        concat: {
            options: {
                seperator: '\n\n',
                sourceMap: true,
                stripeBanners: true,
                banner: '/*!<%= pkg.name %> - v<%= pkg.version %> - ' + ' <%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            dist: {
                src: ['<%= config.app %>/js/script.js'],
                dest: '<%= config.dist %>/js/script.js',
            },
            deps: {
                src: [
                    'libs/jquery/dist/jquery.js',
                    'libs/modernizr/modernizr.js',
                    '<%= config.app %>/js/script.js',
                ],
                dest: '<%= config.dist %>/js/vendor.js'
            },
            // move: {
            //     src: ['libs/angularjs/angular.min.js.map'],
            //     dest: 'dest/js/angular.min.js.map'
            // }
        },
        uglify: {
            options: {
                manage: false,
                sourceMap: true,
                //sourceMapIncludeSources: true,
                // sourceMapName: '<%= config.dist %>/js/sourcemap/sourcemap.map',
                // sourceMapIn: '<%= config.dist %>/js/sourcemap/sourcemap.map'

                /*For presreve comments i minified file
                preserveComments: 'all'*/
            },
            // Following task will take all the js in "dest/js" folder and combine in one minifyed js
            minifyalljs: {
                files: {
                    '<%= config.dist %>/js/app.min.js': ['<%= config.dist %>/js/bootstrap.js', '<%= config.dist %>/js/vendor.js']
                }
            },
            /* Following task make all js minified but not combine in one file
            my_target2: {
                files: [{
                        expand: true,
                        cwd: '<%= config.dist %>/js/',
                        src: ['*.js', '*.min.js'],
                        dest: '<%= config.dist %>/js/',
                        ext: '.min.js'
                    }]
                                     This is for Combineing files 
                    files:[{'js/main.min.js':['js/file-1.js', 'js/file-2.js','js/file-3.js']}]
            }
                */
        },

        webfont: {
            icons: {
                src: '<%= config.app %>/icons/*.svg',
                dest: '<%= config.dist %>/icon-font',
                options: {
                    syntax: 'bem',
                    templateOptions: {
                        baseClass: 'tn-icon',
                        classPrefix: 'tn-',
                        mixinPrefix: 'tn-'
                    }
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['<%= config.dist %>/css/*.css', '<%= config.dist %>/*.html']
                },
                options: {
                    watchTask: true,
                    server: './<%= config.dist %>'
                }
            }
        },

    });
    grunt.registerTask('default', ['browserSync', 'watch']);

    //MAKE BUILD
    grunt.registerTask('build', ['newer:copy:main', 'sass:main', 'webfont', 'cssmin:main']);
};
