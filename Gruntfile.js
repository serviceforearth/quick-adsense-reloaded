/* local path 
 cd "P:\quick-adsense-reloaded\github\quick-adsense-reloaded"
 * 
 */
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            // Base destination dir free version for wordpress.org
            base: '../../wordpress-svn/tags/<%= pkg.version %>',
            basetrunk: '../../wordpress-svn/trunk/',
            basezip: '../../wordpress-svn/',
            // pro version
            pro_base: '../../wpquads-pro/tags/<%= pkg.version %>',
            pro_basetrunk: '../../wpquads-pro/trunk/',
            pro_basezip: '../../wpquads-pro/'
        },
        // Tasks here
        // Bump version numbers
        version: {
            css: {
                options: {
                    prefix: 'Version\\:\\s'
                },
                src: ['style.css']
            },
            php: {
                options: {
                    prefix: '\@version\\s+'
                },
                src: ['functions.php', '<%= pkg.name %>.php']
            }
        },
        // minify js
        uglify: {
            build: {
                files: [
                    {'assets/js/quads-admin.min.js': 'assets/js/quads-admin.js'}
                ]
            }
        },
        // Copy to build folder
        copy: {
            build: {
                files: [
                    {expand: true, src: ['**', '!node_modules/**', '!Gruntfile.js', '!package.json', '!nbproject/**', '!grunt/**', '!wpquads-pro.php', '!advanced-settings.php', '!render-ad-functions.php'],
                        dest: '<%= paths.base %>'},
                    {expand: true, src: ['**', '!node_modules/**', '!Gruntfile.js', '!package.json', '!nbproject/**', '!grunt/**', '!wpquads-pro.php', '!advanced-settings.php', '!render-ad-functions.php'],
                        dest: '<%= paths.basetrunk %>'},
                    {expand: true, src: ['**', '!node_modules/**', '!Gruntfile.js', '!package.json', '!nbproject/**', '!grunt/**', '!quick-adsense-reloaded.php'],
                        dest: '<%= paths.pro_base %>'}
//                    {expand: true, src: ['**', '!node_modules/**', '!Gruntfile.js', '!package.json', '!nbproject/**', '!grunt/**', '!quick-adsense-reloaded.php'],
//                        dest: '<%= paths.pro_basetrunk %>'},
                ]
            },
        },
        'string-replace': {
            version: {
                files: {
                    '<%= paths.basetrunk %>quick-adsense-reloaded.php': 'quick-adsense-reloaded.php',
                    '<%= paths.base %>/quick-adsense-reloaded.php': 'quick-adsense-reloaded.php',
                    '<%= paths.base %>/readme.txt': 'readme.txt',
                    '<%= paths.basetrunk %>readme.txt': 'readme.txt',
                    
                    '<%= paths.pro_base %>/wpquads-pro.php': 'wpquads-pro.php',
                    '<%= paths.pro_base %>/readme.txt': 'readme.txt',
//                    '<%= paths.pro_basetrunk %>/wpquads-pro.php': 'wpquads-pro.php',
//                    '<%= paths.pro_basetrunk %>/readme.txt': 'readme.txt'
                },
                options: {
                    replacements: [{
                            pattern: /{{ version }}/g,
                            replacement: '<%= pkg.version %>'
                        }]
                }
            }
        },
        // Clean the build folder
        clean: {
            options: {
                force: true
            },
            build: {
                files: [
                    {src: ['<%= paths.base %>']},
                    {src: ['<%= paths.basetrunk %>']},
                    {src: ['<%= paths.pro_base %>']},
                    //{src: ['<%= paths.pro_basetrunk %>']},
                ]

            }
        },
        // Minify CSS files
        cssmin: {
            build: {
                files: [
                    {'assets/css/quads-admin.min.css': 'assets/css/quads-admin.css'}
                ]
            }
        },
        // Compress the build folder into an upload-ready zip file
        compress: {
            build: {
                options:
                        {
                            archive: '<%= paths.pro_basezip %>/quads-pro.zip'
                        },
                files:[
                    {
                    expand: true,
                    cwd: '<%= paths.pro_base %>',
                    src: ['**/*'],
                    //dest: '<%= paths.pro_basezip %>'
                    }
                ]
            }
        }
//        compress: {
//            build: {
//                options: {
//                    archive: '<%= paths.basezip %>/<%= pkg.name %>.zip'
//                },
//                cwd: '<%= paths.base %>',
//                src: ['**/*']
//                //dest: '../../',
//                //expand: true
//            }
//        }


    });

    // Load all grunt plugins here
    // [...]
    //require('load-grunt-config')(grunt);
    require('load-grunt-tasks')(grunt);

    // Display task timing
    require('time-grunt')(grunt);

    // Build task
    //grunt.registerTask( 'build', [ 'compress:build' ]);
    grunt.registerTask('build', ['clean:build', 'uglify:build', 'cssmin:build', 'copy:build', 'string-replace:version', 'compress:build']);
};