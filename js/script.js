var host = 'https://webdxd-student-api.herokuapp.com/'

$.get(host + 'student', function(response) {
	// for (var i = 0; i < response.length; i++) {
	// 	$('<a>')
	// 	.text(response[i].name)
	// 	.attr('href', 'http://192.168.1.124:3000/student/' + response[i]._id)
	// 	.appendTo('body')
	// }

	console.log(response)

	response.forEach(function(student) {
		var listItem = $('<a>')
			.text(student.name)
			.addClass('get-student-info')
			.attr('id', student._id)
			// .attr('href', 'http://192.168.1.124:3000/student/' + student._id)
			.appendTo('.student-list')

		$('<button>').text('x').addClass('remove-btn').appendTo(listItem)
	})

	// $('.get-student-info').click(function() {
	// 	console.log('Clicked!')
	// })

})


$('body').on('click', '.get-student-info', function(e) {
	$.get(host + 'student/' + e.target.id, function(response) {
		
		$('.student-name').text(response.name || "");
		$('.student-age').text(response.age || "");
		$('.student-school').text(response.school || "");

	})

})

$('body').on('click', '.remove-btn', function(e) {
	$.ajax({
	  type: "POST",
	  url: host+'delete',
	  data: JSON.stringify({"_id": e.target.parentNode.id}),
	  success: function(response) {
	  	$('#' + e.target.parentNode.id).remove()
	  },
	  dataType: 'json',
	  contentType: 'application/json',
	});

})

$('#submit-add').click(function(e) {
	e.preventDefault();

	var student = {
		"name": $('#name').val(),
		"age": $('#age').val(),
		"school": $('#school').val()
	}

	$.ajax({
	  type: "POST",
	  url: host+'new',
	  data: JSON.stringify(student),
	  success: function(response) {
	  	$('<a>')
			.text(response.name)
			.addClass('get-student-info')
			.attr('id', response._id)
			.appendTo('.student-list')
	  },
	  dataType: 'json',
	  contentType: 'application/json',
	});

	// $.post(host+'new', JSON.stringify(student), function(response) {
	// 	console.log(response)
	// }, 'json')

})


