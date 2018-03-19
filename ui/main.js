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

	function show_modules(modules) {
		$('#myModal').modal('show');
 	}

	function api_call(method, callback) {
		return fetch('http://localhost:8080/api/' + method)
			.then(response => response.json())
			.then(myJson => callback(myJson))
	}

	$("#myModal").on('show.bs.modal', (e) => {
		let type = $(e.relatedTarget).data('modaltype');
		let data = MODAL_TYPES[type];
		$('#myModalLabel').text(data.title);
		$("#myModalBody").html(`
		<div class="container-fluid">
 			<div class="row">
      			<div class="col-md-4">${getStuff()}</div>
      			<div class="col-md-4 ml-auto">.col-md-41 .ml-auto</div>
			</div>
			<div class="row">
      			<div class="col-md-4">.col-md-42</div>
      			<div class="col-md-4 ml-auto">.col-md-42 .ml-auto</div>
			</div>
 
   	    </div>
		`);
	});
   
   function getStuff() {return 'test WORKED';}
};
	// function clickedButton() {
	// 	ws.send(JSON.stringify({topic: "test", data: "bla bla bla"}));
	// }

	// function clickedButton2() {
	// 	ws.send(JSON.stringify({topic: "real", data: "real data"}));
	// }
