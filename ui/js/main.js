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
		if ($('#module-row').children().length > 0) {
			$('#module-row').children().last().remove();
		}
	});

	$("#add-module").click(() => {
		// api_call('getallmoduleslist', show_modules);
		add_module({'title': 'weather'});
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
