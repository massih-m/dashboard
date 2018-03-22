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

	$("#myModal").on('shown.bs.modal', (e) => {
		let type = $(e.relatedTarget).data('modaltype');
		let data = MODAL_TYPES[type];
		window[data.handler](data);
	});
};

function api_call(method, callback) {
	return fetch('http://localhost:8080/api/' + method)
		.then(response => response.json())
		.then(myJson => callback(myJson.data))
}

function show_modules(data) {
	$('#myModalLabel').text(data.title);
	$("#myModalBody").html(`
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-4 .ml-auto" id='modal-left-panel'>
					<p> Fetching data... </p>
				</div>
				<div class="col-md-8 .ml-auto" id='modal-right-panel'></div>
			</div>
		</div>
	`);
	api_call('getallmoduleslist', add_modules_modal);
}

function add_modules_modal(modules){
	let panel = $('#modal-left-panel');
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
	$('#myModal').modal('handleUpdate');
}

function radio_button_handler(event) {
	let node = $(event.target);
	let panel = $('#modal-right-panel');
	panel.html('');
	panel.append(`<p> Module ${node.val()} </p>`);
	$.each(node.data('inputdata'), (index, input) => {
		panel.append(`
			<div class="input-group input-group-sm mb-3">
  				<div class="input-group-prepend">
    				<span class="input-group-text" id="inputGroup-sizing-default">${input.input_name}</span>
  				</div>
				<input type="text" class="form-control myModal-text-input" aria-label="Default" aria-describedby="inputGroup-sizing-default">
			</div>
		`);
	});
	$('#myModal').modal('handleUpdate');
}
