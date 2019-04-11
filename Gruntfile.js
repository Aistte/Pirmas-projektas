module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    compass: {
      options: {
        sassDir: "src/assets/sass",
        imagesDir: "src/img",
        cssDir: "web/assets/css",
        force: true
      },
      dist: {
        options: {
          environment: "dev",
          noLineComments: true
        }
      },
      dev: {
        options: {
          noLineComments: true
        }
      },
      watch: {
        options: {
          noLineComments: true,
          watch: true
        }
      }
    },
    assemble: {
      options: {
        layoutdir: "src/templates/layouts",
        layout: ["default.hbs"],
        partials: ["src/templates/partials/{,*/}*.*", "src/sprites/svg/*"],
        helpers: ["partial"],
        flatten: true
      },
      en: {
        options: {
          data: ["src/templates/data/*.yml"]
        },
        src: ["src/templates/pages/*.hbs"],
        dest: "./web"
      }
    },
    watch: {
      options: {},
      dev: {
        files: ["src/assets/sass/**/*.scss", "src/templates/**/*.hbs"],
        tasks: ["compass:dev", "assemble:site"]
      },
      handlebars: {
        files: ["src/templates/*/*.hbs", "src/templates/layouts/*.hbs"],
        tasks: ["assemble:site"]
      }
    },
    svg_sprite: {
      generate: {
        cwd: "web/assets/vendor/material-design-icons",
        src: ["../../../../web/assets/images/ic_bag_24px.svg"],

        dest: "src/sprites",
        options: {
          shape: {
            id: {
              generator: function(filename) {
                var id = filename.match(/ic_(\w+)_\d+/);
                return id[1];
              }
            }
          },
          mode: {
            symbol: {
              dest: ""
            }
          }
        }
      }
    }
  });

  [
    "grunt-contrib-compass",
    "grunt-contrib-watch",
    "grunt-assemble",
    "grunt-svg-sprite"
  ].forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask("assemble:site", ["assemble:en"]);
  grunt.registerTask("default", ["compass:dist", "assemble:en"]);
};
