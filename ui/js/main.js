window.onload = function() {
	let ws = new WebSocket("ws://localhost:8888/");

	ws.onopen = (() => console.log('opened'))
	ws.onmessage = (event) => {
		console.log('websocket message received');
		console.log(event.data);
	};

	$("#remove-module").click(() => {
		if ($('#module-row').children().length > 0) {
			$('#module-row').children().last().remove();
		}
	});

	$("#add-module").click(() => {
		api_call('getallmoduleslist', show_modules_modal);
	});

	$("#modalCloseBtn").click(() => {
		Modal.hide();
  });

  	$('#modal-submit-btn').click(x => {
		Modal.hide();
		add_module({'title': 'weather'});
	});
};

function api_call(method, callback) {
	return fetch('http://localhost:8080/api/' + method)
		.then(response => response.json())
		.then(myJson => callback(myJson.data))
}

function show_modules_modal(data) {
	Modal.set_title('Select module:');
	Modal.set_grid_layout();
	Modal.fill_modules_data(data);
	Modal.show();
}

function add_module(data) {
	$('#module-row').append(`
		<div class="col s12 m6 l3 transparent">
			<div class='card blue darken-4'>
				<div class='card-content text-grey text-lighten-4'>
					<span class='card-title'>${data.title}</span>
					<p>I am a very simple card. I am good at containing small bits of information.
I am convenient because I require little markup to use effectively.</p>
				</div>
			</div>
		</div>
	`);
}

function show_module_data(event) {
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
					<label for="${id}">${input.label}</label>
					<input type="text" class="form-control" id="${id}" placeholder="${input.type}" required>
				  </div>
			</form>
		`);
	});
	$('#modal-submit-btn').removeClass('disabled');
}


function set_spinner(target_div) {
	$('#' + target_div).html(`
		<div class="preloader-wrapper small active">
			<div class="spinner-layer spinner-green-only">
				<div class="circle-clipper left">
					<div class="circle"></div>
		    </div>
				<div class="gap-patch">
		      <div class="circle"></div>
		    </div>
				<div class="circle-clipper right">
		      <div class="circle"></div>
		    </div>
		  </div>
		</div>
	`);
}
