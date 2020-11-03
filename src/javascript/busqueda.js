// ** Busqueda ** //
$(document).ready(function(){
    $("#buscar").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#grid tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });