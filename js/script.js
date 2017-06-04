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
			.html('<p>' + student.name + '</p>')
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
		$('.update-info').attr('data-id', e.target.id);

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

$('body').on('click', '.update-info', function(e) {
	
	$('.update-form').show();
	$('.update-info').hide();

	$('#update-name').val($('.student-name').text() || "");
	$('#update-age').val($('.student-age').text() || "");
	$('#update-school').val($('.student-school').text() || "");
	$('#update-id').val($('.update-info').attr('data-id') || "");
})


$('body').on('click', '.submit-update', function(e) {

	e.preventDefault();

	var student = {
		"_id": $('#update-id').val(),
		"name": $('#update-name').val(),
		"age": $('#update-age').val(),
		"school": $('#update-school').val()
	}
console.log(student)

	$.ajax({
	  type: "POST",
	  url: host+'update',
	  data: JSON.stringify(student),
	  success: function(response) {
	  	console.log(response)
	  	$('.student-name').text(student.name || "");
		$('.student-age').text(student.age || "");
		$('.student-school').text(student.school || "");
		$('#' + student._id).find('p').text(student.name)
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


