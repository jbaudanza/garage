var pkg = require('./package.json');

module.exports = function (grunt) {
  grunt.initConfig({
    shipit: {
      options: {
        // Project will be build in this directory.
        workspace: '/tmp/garage-workspace',

        // Project will be deployed in this directory.
        deployTo: '/home/pi/garage',

        // Repository url.
        repositoryUrl: pkg.repository.url,

        // This files will not be transfered.
        ignores: ['.git', 'node_modules'],

        // Number of release to keep (for rollback).
        keepReleases: 3
      },

      production: {
        servers: ['pi@raspberrypi']
      }
    }
  });

  grunt.loadNpmTasks('grunt-shipit');
};
