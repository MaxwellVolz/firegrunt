module.exports = function(grunt) {

  

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() { 
    grunt.log.write('Logging some stuff...').ok();
  });

  grunt.initConfig({
    watch: {
        css: {
          files: ['src/css/*.scss'],
          tasks: ['sass:dev']
        },
        js: {
          files: ['src/js/ *.js'],
          tasks: ['uglify:dev']
        },
        test: {
          // files: ['*.txt'],
          files: ['ItemLog.txt'],
          tasks: ['default'],
        },

      }
  });

  grunt.event.on('watch', function(action, filepath, target) {

    var fs = require('fs');

    // get last update to firebase

      // sets up connection to firebaseDB
      var Firebase = require("firebase"),
        ref = new Firebase("https://mvolzfirsttest.firebaseio.com/"),
      msg = [],
      latest = [];

    ref.on("value", function(snapshot) {
      //console.log(snapshot.val().drops);
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


    msg.time = Firebase.ServerValue.TIMESTAMP;

    $('div').css({
       'font-family' : 'Century Gothic, sans-serif;'
    });


      var glyphClass = function(y){
        if(y == null){
          return 'glyphicon glyphicon-flag';
        }
        var x = y.toString();
        var output = "",
          first = x.indexOf('<')+1 || 0,
          last = x.indexOf('>') || 0,
          blade = x.substring(first, last);

        switch(blade){
          case 'Stashed':
            //things
            output = "glyphicon glyphicon-briefcase";
            break;
          case 'Kept':
            //things
            output = "glyphicon glyphicon-ok";
            break;
          case 'No room for':
            //things
            output = "glyphicon glyphicon-remove";
            break;
          case 'Dropped':
            //things
            output = "glyphicon glyphicon-map-marker";
            break;
          case 'Cubing Kept':
            //things
            output = "glyphicon glyphicon-gift";
            break;
          default:
            output = "glyphicon glyphicon-flag";
        }
        
        return output;
      };
      var actionText = function(y){
        if(y == null){
          return 'glyphicon glyphicon-flag';
        }
        var x = y.toString(),
          first = x.indexOf('<')+1 || 0,
          last = x.indexOf('>') || 0,
          output = x.substring(first, last);


        return output;
      };
      var itemName = function(y){
        if(y == null){
          return 'Item Name';
        } 
        var x = y.split(')')[1].split('(')[0];

        return x;
        

      };
      var qualityClass = function(y){
        if(y == null){
          return 'normal';
        }
        var x = y.split('> (')[1].split(')')[0];
        // console.log("x");
        // console.log(x);
        return x;

      };
      var extraStuff = function(y){
        if(y == null){
          return 'Attributes';
        }
        var x = y.split('|  | ')[1] || "";
        return x;
      }

      

      // uses filepath from event to retrieve data
    fs.readFile(filepath, function(err, data) {
        if(err) throw err;
        var array = [],
          array = data.toString().split("\n"),
          items = [],
          item = {};

        for(i in array) {
          
          item = {
            time:array[i].split(' <')[0] || "Time",
            actionSymbol:glyphClass(array[i].split('> ')[1]),
            action:actionText(array[i].split('> ')[1]),
            desc:itemName(array[i].split('> ')[1]),
            quality:qualityClass(array[i].split('> ')[1]),
            extra:extraStuff(array[i].split('> ')[1]),
            other:array[i].split('> ')[1] || "Item"
            // quality:array[i].split('<')[1].split('>')[0] || ""
          }

          items.push(item);
          item = {};
            //console.log(array[i]);
        }
        //console.log("items");
        //console.log(items);

        var usersRef = ref.child("drops");
      usersRef.set(
        items
      );

        // compare last update to file to field from firebaseDB
        //
        // and push to db if more recent      


        // grunt.log.writeln(target + ': ' + filepath + ' has ' + action + 'array[0]:' + array[0] + 'arrayL: ' + array.length);
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action + 'arrayL: ' + array.length);


    });

});


    // load plugin for watching files
  grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-uglify');


};
