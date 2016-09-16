
'use strict';

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    grunt.initConfig({

        watch: {
            all: {
                    files: '**/*.html',
                    options: {
                        livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 3031,
                    base: 'app',
                    hostname: '0.0.0.0'
                }
            }
        },

        open: {
            all: {
                path: 'http://localhost:3031'
            }
        }
    });
    
    grunt.registerTask('fixt', [
        'connect',
        'open',
        'watch'
    ]);
};
