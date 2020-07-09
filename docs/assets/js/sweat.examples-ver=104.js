(function($){
	'use strict';

    //Basic Sweat Alert
    var $basic_swal = $('.basic-swal');
	if ($basic_swal.length > 0 ) {
		$basic_swal.on("click", function(e){
            swal("Hello world!");
            e.preventDefault();
		});
	}
    
    //Basic Sweat Alert S2
    var $basic_swal_2 = $('.basic-swal-2');
	if ($basic_swal_2.length > 0 ) {
		$basic_swal_2.on("click", function(e){
            swal("Here's the title!", "...and here's the text!");
            e.preventDefault();
		});
	}
    
    //Sweat Alert Success
    var $swal_success = $('.swal-success');
	if ($swal_success.length > 0 ) {
		$swal_success.on("click", function(e){
            swal("Good job!", "You clicked the button!", "success");
            e.preventDefault();
		});
	}
    
    //Sweat Alert Info
    var $swal_info = $('.swal-info');
	if ($swal_info.length > 0 ) {
		$swal_info.on("click", function(e){
            swal("Good job!", "You clicked the button!", "info");
            e.preventDefault();
		});
	}
    
    //Sweat Alert Warning
    var $swal_warning = $('.swal-warning');
	if ($swal_warning.length > 0 ) {
		$swal_warning.on("click", function(e){
            swal("Good job!", "You clicked the button!", "warning");
            e.preventDefault();
		});
	}
    
    //Sweat Alert Error
    var $swal_error = $('.swal-error');
	if ($swal_error.length > 0 ) {
		$swal_error.on("click", function(e){
            swal("Good job!", "You clicked the button!", "error");
            e.preventDefault();
		});
	}
    
    //Advanced Alert
    var $advanced_swal = $('.advanced-swal');
	if ($advanced_swal.length > 0 ) {
		$advanced_swal.on("click", function(e){
            swal("Click on either the button or outside the modal.", {
                button: "Button Text!"
            })
            .then((value) => {
              swal(`The returned value is: ${value}`);
            });
            e.preventDefault();
		});
	}
    
    //Advanced Alert S2
    var $advanced_swal_2 = $('.advanced-swal-2');
	if ($advanced_swal_2.length > 0 ) {
		$advanced_swal_2.on("click", function(e){
            swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this imaginary file!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                  icon: "success",
                });
              } else {
                swal("Your imaginary file is safe!");
              }
            });
            e.preventDefault();
		});
	}
    
    //Advanced Alert S3
    var $advanced_swal_3 = $('.advanced-swal-3');
	if ($advanced_swal_3.length > 0 ) {
		$advanced_swal_3.on("click", function(e){
            swal("A wild Pikachu appeared! What do you want to do?", {
              buttons: {
                cancel: "Run away!",
                catch: {
                  text: "Throw Pokéball!",
                  value: "catch",
                },
                defeat: true,
              },
            })
            .then((value) => {
              switch (value) {

                case "defeat":
                  swal("Pikachu fainted! You gained 500 XP!");
                  break;

                case "catch":
                  swal("Gotcha!", "Pikachu was caught!", "success");
                  break;

                default:
                  swal("Got away safely!");
              }
            });
            e.preventDefault();
		});
	}
    
    //Sweat Alert AJAX
    var $swal_ajax = $('.swal-ajax');
	if ($swal_ajax.length > 0 ) {
		$swal_ajax.on("click", function(e){
            swal({
              text: 'Search for a movie. e.g. "La La Land".',
              content: "input",
              button: {
                text: "Search!",
                closeModal: false,
              },
            })
            .then(name => {
              if (!name) throw null;

              return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
            })
            .then(results => {
              return results.json();
            })
            .then(json => {
              const movie = json.results[0];

              if (!movie) {
                return swal("No movie was found!");
              }

              const name = movie.trackName;
              const imageURL = movie.artworkUrl100;

              swal({
                title: "Top result:",
                text: name,
                icon: imageURL,
              });
            })
            .catch(err => {
              if (err) {
                swal("Oh noes!", "The AJAX request failed!", "error");
              } else {
                swal.stopLoading();
                swal.close();
              }
            });
            e.preventDefault();
		});
	}
    
    
})(jQuery);    
    