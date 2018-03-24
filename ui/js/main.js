window.onload = function() {
	let module_panel = $("#module-panel");
	let ws = new WebSocket("ws://localhost:8888/");

	ws.onopen = (() => console.log('opened'))
	ws.onmessage = (event) => {
		console.log(event.data)
		let node = document.getElementById('received-text');
	    node.value += event.data;
	};

	$("#remove-module").click(() => {
    	if (module_panel.childElementCount > 0) {
			module_panel.removeChild(module_panel.lastChild);
		}
	});

	$("#add-module").click(() => {
		api_call('getallmoduleslist', show_modules);
  	});

	$("#modalCloseBtn").click(() => {
  		$('#myModal').hide();
  	});
};

function api_call(method, callback) {
	return fetch('http://localhost:8080/api/' + method)
		.then(response => response.json())
		.then(myJson => callback(myJson.data))
}

function show_modules(data) {
	$('#modalTitle').text('Select module:');
	set_grid_layout();
	add_modules_modal(data);
	$('#myModal').show();
}

function set_grid_layout() {
	$("#modalBody").html(`
		<div class="modal-grid-wrapper">
			<div id='modalLeftPanel'>
				<p> Fetching data... </p>
			</div>
			<div id='modalRightPanel'>
			</div>
		</div>
	`);
}

function add_modules_modal(modules){
	let panel = $('#modalLeftPanel');
	panel.html('');
	$.each(modules, (index, module) => {
		let id = "radioButton" + index;
		panel.append(`
			<div class='blocked'>
				<input type="radio"	id="${id}" name="modules" value="${module.name}">
				<label for="${id}">${module.name}</label>
			</div>
		`);
		$("#"+id).data('inputdata', module.inputs).click(radio_button_handler);
	});
}

function radio_button_handler(event) {
	let node = $(event.target);
	let panel = $('#modalRightPanel');
	panel.html('');
	panel.append(`<p> Module ${node.val()} </p>`);
	panel.append(`
		<form class="needs-validation" id='moduleForm' novalidate></form>
	`);
	$.each(node.data('inputdata'), (index, input) => {
		let id = node + '_input_' + index;
		$('#moduleForm').append(`
				<div class="form-group">
	    			<label for="${id}">${input.input_name}</label>
	    			<input type="text" class="form-control" id="${id}" placeholder="${input.input_type}" required>
	  			</div>
			</form>
		`);
	});
	$('#modalFooter').html(`
		<button class="btn waves-effect waves-light blue accent-2" type="submit" name="action">Submit
    		<i class="material-icons right">send</i>
  		</button>
	`);
}
