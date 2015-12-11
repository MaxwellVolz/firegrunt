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
      		files: ['test.txt'],
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
			console.log(snapshot.val().drops);
			}, function (errorObject) {
				console.log("The read failed: " + errorObject.code);
		});


		


		msg.time = Firebase.ServerValue.TIMESTAMP;


		// testing begin

		var usersRef = ref.child("drops");
			usersRef.set({
			  alanisawesome: {
			    date_of_birth: "June 23, 1912",
			    full_name: "Alan Turing"
			  },
			  gracehop: {
			    date_of_birth: "December 9, 1906",
			    full_name: "Grace Hopper"
			  }
		});
  		// end of testing stuff



  		

  		// uses filepath from event to retrieve data
		fs.readFile(filepath, function(err, data) {
		    if(err) throw err;
		    var array = [],
		    	array = data.toString().split("\n"),
		    	items = [],
		    	item = {};

		    for(i in array) {
		    	
		    	item = {
		    		time:array[i].split(' <burntdeath1> ')[0] || "",
		    		other:array[i].split(' <burntdeath1> ')[1] || "",
		    		// quality:array[i].split('<')[1].split('>')[0] || ""
		    	}

		    	// item['time'] = array[i].split(' <burntdeath1> ')[0];
		    	// item['other'] = array[i].split(' <burntdeath1> ')[1];
		    	// item['quality'] = array[i].split('(')[0].split(')')[0];

		    	items.push(item);
		    	item = {};
		        //console.log(array[i]);
		    }
		    console.log("items");
		    console.log(items);

		    var aL = array.length - 2,
		    	timeX = array[aL].split(' <burntdeath1> ')[0],
		    	otherX = array[aL].split(' <burntdeath1> ')[1];




		    var usersRef = ref.child("drops");
			usersRef.set(
				// timeX:{
				// 	time: timeX,
				// 	other: otherX
				// }
				items
			);

		    // compare last update to file to field from firebaseDB
		    //
	   		// and push to db if more recent		  

		    // console.log("al: " + aL);
		    // console.log("Last Entry was ");
		    // console.log(array[aL].split(' <burntdeath1> ')[0]);
		    // console.log("or not.");

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
