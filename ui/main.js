window.onload = function() {
	let module_panel = $("#module-panel");
	let ws = new WebSocket("ws://localhost:8888/");

	ws.onopen = (() => console.log('opened'))
	ws.onmessage = (event) => {
		console.log(event.data)
		let node = document.getElementById('received-text');
	    node.value += event.data;
	};

	// $("#add-module").click(() => {
	// 	api_call('getallmoduleslist', show_modules);
	// 	// module_panel.appendChild(node);
	// });

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
	// function clickedButton() {
	// 	ws.send(JSON.stringify({topic: "test", data: "bla bla bla"}));
	// }

	// function clickedButton2() {
	// 	ws.send(JSON.stringify({topic: "real", data: "real data"}));
	// }


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
				<div class="col-md-6" id='modal-left-panel'>
					<p> Fetching data... </p>
				</div>
				<div class="col-md-6 ml-auto" id='modal-right-panel'></div>
			</div>
		</div>
	`);
	api_call('getallmoduleslist', add_modules_modal);
}

function add_modules_modal(modules){
	let panel = $('#modal-left-panel');
	panel.html('');
	$.each(modules, (index, value) => {
		panel.append(`
			<input type="radio" id="moduleId${index}"	name="modules" value="${value}">
			<label for="moduleId${index}">${value}</label>
		`);
	});
	$('#myModal').modal('handleUpdate');
}
