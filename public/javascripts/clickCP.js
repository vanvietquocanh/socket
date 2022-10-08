jQuery(document).ready(function($) {
	function copy(value, type) {
		var $temp = $("<input>");
        $("body").append($temp);
		$temp.val(value).select();
        document.execCommand("copy");
        $temp.remove();
        var $alert 	 = $(`<div class="alert alert-success fixed-bottom-right w-25" style="z-index: 999999">
					        Copy ${type} <strong class="pr-2">${value}</strong>-<strong class="pl-2">Success!</strong>
					    </div>`)
        $("body").append($alert)
        setTimeout(function() {
        	$alert.remove()
        }, 2000);
	}
	$(".clickToCopy").click(function(event) {
		copy($(this).text(), $(this).attr('class').split("clickToCopy ")[1])
	});
	$(`[data-toggle="tooltip"]`).tooltip()
});