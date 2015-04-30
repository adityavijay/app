module.exports = function (grunt) {
	var prodDir = '';

    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // shell: {
        //   patternlab: {
        //     command: "php patternlab/core/builder.php -g"
        //   }
        // },

		// bower: {
		// 	install: {
		// 	   //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
		// 	}
		//   },

		clean: {   //cleaning of build folder
		  build: {
			src: [ 'build' ]
		  },
		  css: {
			src: [ 'build/**/*.css' ]
		  },
		  js: {
			src: [ 'build/**/*.js' ]
		  },
		},

		copy: { //copies and paste all code in build folder
			buildcss: {
				cwd: 'code/styles',
				src: [ '**/*' ],
				dest: 'build/styles',
				expand: true
			},
			buildjs: {
				cwd: 'code/js',
				src: [ '**/*' ],
				dest: 'build/js',
				expand: true
			},
            buildsvg: {
                cwd: 'code/img/svg',
                src: [ '**/*' ],
                dest: 'build/img/svg',
                expand: true
            },
			distcss: { //is being used to distribute files in styles folder
				files: [
					{expand: true, cwd: 'build/styles/', src: ['app.*'], dest: 'styles'}
				]
			},
			distjs: { //?
				files: [
					{expand: true, cwd: 'build/js', src: ['**/*'], dest: prodDir + 'js'}
				]
			},
            distsvg: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/img/svg/export',
                        src: ['svg-data.css'],
                        dest: prodDir + 'styles'
                    }
                ]
            },
            distpngfallback: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/img/svg/export',
                        src: ['png-fallback.css'],
                        dest: prodDir + 'styles'
                    }
                ]
            }
		},


        scsslint: { //?
            allFiles: [
                'code/styles/scss/**/*.scss'
            ],
            options: {
                bundleExec: true,
                config: '.scss-lint.yml',
                reporterOutput: 'scsslint-output.xml',
                exclude: '/code/styles/scss/vendor'
            }
        },

        sass: {//?
            build: {
                options: {
                    require: 'susy'
                },
                files: {
                    'build/styles/app.css': 'build/styles/scss/app.scss'//SCSS compilation
                }
            }
        },

        libsass: {  //compilation for SCSS
            options: {

            },
            myTarget: {
              src: 'build/styles/scss/app.scss', //has all libraries and actual code inside
              dest: 'build/styles/app.css', //compiled CSS
            }
        },

        concat: {  //Concanetion for JS and CSS
            css: {
                src: [
                    'build/styles/app.css'
                ],
                dest: 'build/styles/app.css'
            },
            js: {
                src: [
                    'build/js/lazyload/jquery.lazyload.min.js',
                    'build/js/vendor/foundation/foundation.js',
                    'build/js/vendor/foundation/foundation.dropdown.js',
                    'build/js/vendor/foundation/foundation.reveal.js',
                    'build/js/vendor/foundation/responsive-tables.js',
                    'build/js/vendor/jquery.flexslider-min.js',
                    'build/js/isotope/isotope.pkgd.min.js',
                    'build/js/vendor/jquery-datepicker.min.js',
                    'build/js/app.js'
                ],
                dest: 'build/js/app.js'
            },
            svgcss: {
                src: [
                    'build/img/icons/svg/export/svg.data.*'
                ],
                dest: [
                    'build/styles/css/'
                ]
            }
        },

         autoprefixer: {//?
            options: {

            },
            single_file: {
              options: {
                browsers: ['last 3 versions', 'ie 8', 'ie 9']
              },
              src: 'build/styles/app.css',
              dest: 'build/styles/app.css'
            }
        },

        cssmin: { //to minimize CSS
		  build: {
			files: {
			  'build/styles/app.min.css': [ 'build/styles/app.css' ]
			}
		  }
        },

        uglify: {   //to minimize javascript
            build: {
                options: {
                  mangle: false,
                  report: 'min'
                },
                files: {
                  'build/js/app.min.js': ['build/js/app.js']
                }
            }
        },

		// watch: {
		// 	options: {
  //               spawn: false,
  //                 livereload: {
  //                 	port: 1337
  //                 },
		// 	},
  //           html: {
  //               files: [
  //                 'patternlab/source/_patterns/**/*.mustache',
  //                 'patternlab/source/_patterns/**/*.json',
  //                 'patternlab/source/_data/*.json',
  //               ],
  //               tasks: [ 'shell:patternlab' ]
  //           },
		// 	css: {
		// 	  files: ['app/styles/scss/partials/*.scss', 'app/styles/scss/*.scss'],
		//   	},
		//   	js: {
		// 	  files: ['app/js/*.js'],
		// 	  tasks: ['buildjs']
		//   	}
		// },

        // grunticon: {
        //     batch1: {
        //         files: [{
        //             expand: true,
        //             cwd: 'build/img/svg/',
        //             src: ['*.svg'],
        //             dest: "build/img/svg/export/"
        //         }],
        //         options: {
        //             cssprefix: '.',
        //             datasvgcss: 'svg-data.css',
        //             datapngcss: 'png-data.css',
        //             urlpngcss: 'png-fallback.css'
        //         }
        //     }
        // },

        stylestats: {//?
            options: {

            },
            src: ['styles/app.css']
          },

    });

    grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-libsass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-stylestats');



    // ======================
    // Individual Grunt Tasks
    // ======================

    // grunt.registerTask('pl', 'runs the php build task for Pattern Lab.', [ 'shell:patternlab']);

	grunt.registerTask('copybuild', 'Compiles all of the assets and copies the files to the build directory.', [ 'copy:buildcss',  'copy:buildjs']);

	grunt.registerTask('copydist', 'Compiles all of the assets and copies the files to the live directory.', [ 'copy:distcss',  'copy:distjs']);

	grunt.registerTask('css', 'Compiles all of the scss (libsass) and copies the files to the live directory.', [ 'copy:buildcss', 'sass', 'concat:css', 'cssmin', 'copy:distcss']);

    grunt.registerTask('js', 'Compiles all of the js and copies the files to the live directory.', [ 'copy:buildjs', 'concat:js', 'uglify', 'copy:distjs']);

    grunt.registerTask('validate:sass', ['scsslint']);

    grunt.registerTask('code', ['clean', 'copy:buildcss','copy:buildjs', 'sass','concat:css', 'autoprefixer','cssmin', 'concat:js', 'uglify', 'copy:distcss', 'copy:distjs']);

    grunt.registerTask('svg', ['copy:buildsvg', 'grunticon', 'copy:distsvg', 'copy:distpngfallback']);


    // ==================
    // Default Grunt Task
    // ==================
//This sort out the confusion, how we serialize process. Default parsing goes according to default grunt task calling
    grunt.registerTask('default', ['clean', 'copy:buildcss','copy:buildjs', 'sass','concat:css', 'autoprefixer','cssmin', 'concat:js', 'uglify', 'copy:distcss', 'copy:distjs']);
};