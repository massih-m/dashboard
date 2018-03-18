window.onload = function() {
  
	let module_panel = document.getElementById("module-panel");
	// let ws = new WebSocket("ws://localhost:8888/");

	// ws.onopen = (() => console.log('opened'))
	// ws.onmessage = (event) => {
	// 	console.log(event.data)
	// 	let node = document.getElementById('received-text');
	//     node.value += event.data;
	// };


	// for (var i = 0; i < 4; i++) {
	// 	let node = add_module();
	// 	module_panel.appendChild(node);
	// }

	document.getElementById("add-module").onclick = () => {
		api_call('getallmoduleslist', show_modules);
		// module_panel.appendChild(node);
	};

	document.getElementById("remove-module").onclick = () => {
		if (module_panel.childElementCount > 0) {
			module_panel.removeChild(module_panel.lastChild);
		}
	};

	function add_module(module) {
		let node = document.createElement("div");
		node.id = "addedDiv";
		node.className = "col-3";

		let container = document.createElement("div");
		container.className = "dashboard-module";
		container.innerHTML = `<p> ADDED MODULE </p>`;

		node.appendChild(container);
		module_panel.appendChild(node);
	}

	function api_call(method, callback) {
		return fetch('http://localhost:8080/api/' + method)
			.then(response => response.json())
			.then(myJson => callback(myJson))
	}

	function postData(url) {
		console.log(url)
  // Default options are marked with *
  return fetch(url)
  .then(response => response.json())
  .then(myJson => console.log(myJson)) // parses response to JSON
}
};
	// function clickedButton() {
	// 	ws.send(JSON.stringify({topic: "test", data: "bla bla bla"}));
	// }

	// function clickedButton2() {
	// 	ws.send(JSON.stringify({topic: "real", data: "real data"}));
	// }