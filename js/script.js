var host = 'https://webdxd-student-api.herokuapp.com/'

var selectedStudent = {}

$.get(host + 'student', function(response) {
	// for (var i = 0; i < response.length; i++) {
	// 	$('<a>')
	// 	.text(response[i].name)
	// 	.attr('href', 'http://192.168.1.124:3000/student/' + response[i]._id)
	// 	.appendTo('body')
	// }

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

		selectedStudent = response

		$('.student-info, .update-info').show()
		
		$('.student-name').text(selectedStudent.name || "");
		$('.student-age').text(selectedStudent.age || "");
		$('.student-school').text(selectedStudent.school || "");
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

	$('#update-name').val(selectedStudent.name || "");
	$('#update-age').val(selectedStudent.age || "");
	$('#update-school').val(selectedStudent.school || "");
	$('#update-id').val(selectedStudent._id || "");
})


$('body').on('click', '.submit-update', function(e) {

	e.preventDefault();

	selectedStudent = {
		"_id": $('#update-id').val(),
		"name": $('#update-name').val(),
		"age": $('#update-age').val(),
		"school": $('#update-school').val()
	}

	$.ajax({
	  type: "POST",
	  url: host+'update',
	  data: JSON.stringify(selectedStudent),
	  success: function(response) {
	  	$('.student-name').text(selectedStudent.name || "");
		$('.student-age').text(selectedStudent.age || "");
		$('.student-school').text(selectedStudent.school || "");
		$('#' + selectedStudent._id).find('p').text(selectedStudent.name)
		$('#update-id, #update-name, #update-age, #update-school').val('');
		$('.update-form').hide();
		$('.update-info').show();
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
			$('.add-form').hide();
			$('.add-btn').show();
			$('#name, #age, #school').val('');
	  },
	  dataType: 'json',
	  contentType: 'application/json',
	});

	// $.post(host+'new', JSON.stringify(student), function(response) {
	// 	console.log(response)
	// }, 'json')

})


$('.add-btn').click(function() {
	$('.add-form').show();
	$(this).hide();
})

