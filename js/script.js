$(document).ready(function(){
	$("input").change(function(e) {
		$("#overlay").html("");
		$("#output").html("");

		var name = this.value;
		var file = e.originalEvent.srcElement.files[0];
		var img = document.createElement("img");
		var reader = new FileReader();
		reader.onloadend = function() {
		    img.src = reader.result;
		}
		reader.readAsDataURL(file);
		$("#overlay").prepend(img);
		    
		setTimeout(function(){ 
		 	html2canvas(document.querySelector("#overlay")).then(canvas => {
			    document.querySelector("#output").prepend(canvas)
			}).then(() => {
			    var canvas = document.querySelector('canvas');
			    canvas.style.display = 'none';
			    $("#overlay").html("");
			    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
			    var a = document.createElement("a");
			    a.setAttribute('download', name);
			    a.setAttribute('href', image);
			    a.click();
			});
		}, 100);

		this.value = "";
	});
})