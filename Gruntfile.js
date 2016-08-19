/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        express: {
            all: {
                options: {
                    bases: ['app'],
                    port: 3031,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },

        watch: {
            all: {
                    files: '**/*.html',
                    options: {
                        livereload: true
                }
            }
        },

        open: {
            all: {
                path: 'http://localhost:3031/index.html'
            }
        }
    });
    
    grunt.registerTask('fixt', [
        'express',
        'open',
        'watch'
    ]);
};
