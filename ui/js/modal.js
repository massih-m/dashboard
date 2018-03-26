const MODAL_TYPES = {
	'add-modules': {
		title: 'Select modules:',
		handler: 'show_modules'
	}
};

class Modal {
	static set_grid_layout() {
		$("#modalBody").html(`
			<div class="modal-grid-wrapper">
				<div id='modalLeftPanel'>
				</div>
				<div id='modalRightPanel'>
				</div>
			</div>
		`);
	}
	
	static fill_modules_data(modules){
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
			$("#"+id).data('inputdata', module.inputs).click(show_module_data);
		});
	}

	static set_title(title){
		$('#modalTitle').text(title);
	}
	
	static show() {
		$('#myModal').show();
	}
	
	static hide() {
		$('#myModal').hide();
	}
}

