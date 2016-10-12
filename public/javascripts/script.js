$(document).ready(function(){
	$(document).on("click","#submit",function(){
		$.ajax({
			url : 'check/',
			type : 'post',
			data : 'email=' + $("#email").val() + '&password=' + $("#password").val(),			
			success : function(data)
			{
				console.log(data);
			}
		});
	});
});