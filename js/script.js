var host = 'http://192.168.1.124:3000/'

$.get(host + 'student', function(response) {
	// for (var i = 0; i < response.length; i++) {
	// 	$('<a>')
	// 	.text(response[i].name)
	// 	.attr('href', 'http://192.168.1.124:3000/student/' + response[i]._id)
	// 	.appendTo('body')
	// }

	response.forEach(function(student) {
		$('<a>')
			.text(student.name)
			.addClass('get-student-info')
			.attr('id', student._id)
			// .attr('href', 'http://192.168.1.124:3000/student/' + student._id)
			.appendTo('body')
	})

	// $('.get-student-info').click(function() {
	// 	console.log('Clicked!')
	// })

})


$('body').on('click', '.get-student-info', function(e) {
	$.get(host + 'student/' + e.target.id, function(response) {
		console.log(response);
	})

})


