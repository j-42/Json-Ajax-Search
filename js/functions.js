$(function() {
/*
	$.getJSON('data/data.json', function(data) {
	     $.each(data, function(i, field){
            $("h1").append("Référence "+ field.ref + " ").append("page " + field.page + " <br>");
        });
	});
*/


function getReference(element){
	// Matchs
	var matches = 0;

	element.keyup(function(){

		// Reference entered in searchbar
		var inputReference = element.val();

		// Reference from Json
		var dataReference = "";
		var dataFullReference = "";

		// Number of characters entered
		var inputLenght = element.val().length;

		var matches = 0;

		// initialise results
		$('#searchResults').empty();
		$('#suggestions').empty();
		$('p').empty();

		// get data
		$.getJSON('data/data.json', function(data) {
			$.each(data, function(i, datafield){

				// json reference lenght
				var dataFieldLenght = datafield.ref.length;

				// substring number of characters intered to find all matches
				var dataSubstring = dataFieldLenght - inputLenght;
				
/*
// DEBUG = Show data
				$('h1').html("inputReference : "+ inputReference+"<br><br>");
				$('h1').append("inputLenght : "+ inputLenght+ "<br><br>");
				$('h1').append("dataFieldLenght : "+ dataFieldLenght+"<br><br>")
*/	

				// Json whole reference
				dataFullReference = datafield.ref;
				
				// Json substringed reference
				dataReference = datafield.ref.substring(0, inputLenght);

/*
// DEBUG = Show data
				$('#searchResults').append("dataReference : "+ dataReference+"<br><br>");
				$('#searchResults').append("dataFullReference : "+ dataFullReference+"<br><br>");
				$('#searchResults').append("datapage : "+ datafield.page+"<br><br>");
*/	


				if (dataReference === inputReference){
					if ( !$('#searchContainer').hasClass("active") && inputLenght >= 2){
						$('#searchContainer').addClass("active");
					}

					$('#suggestions').append("<li onclick='go("+parseInt(datafield.page)+")'><span class='ref'>"+dataFullReference+"</span><span class='page'>page "+datafield.page+"</span></li>");



					matches++;
				}
		    });
		}).promise().done( function() {
			
			if  (matches == 0){
				$('#searchContainer').removeClass("active");
				$('.nomatch').prepend("La référence entrée n'existe pas.<br><br>");
			}

    	}); // end data loop


	})
}

getReference($('#searchReference'));
	


});