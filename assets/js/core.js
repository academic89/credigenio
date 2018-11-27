
var onlyNumber = function(){
    var e = document.getElementById('phone');

    if (!/^[0-9]+$/.test(e.value)) { 
        // alert("Please enter onyl number.");
        e.value = e.value.substring(0,e.value.length-1);
    }
}

$('#money').inputmask("numeric", {
    radixPoint: ".",
    groupSeparator: ",",
    digits: 2,
    autoGroup: true,
    prefix: '$', //No Space, this will truncate the first character
    rightAlign: false,
    oncleared: function () { self.Value(''); }
});

var createLead = function(){

    $('#form-lead').submit(function(event){
        event.preventDefault();

        var date = new Date();
        var d  = date.getDate();
        var day = (d < 10) ? '0' + d : d;
        var m = date.getMonth() + 1;
        var month = (m < 10) ? '0' + m : m;
        var yy = date.getYear();
        var year = (yy < 1000) ? yy + 1900 : yy;
        
        var h = date.getHours();
        var hour = (h < 10) ? '0' + h : h;
        var mi = date.getMinutes();
        var minute = (mi < 10) ? '0' + mi : mi;
        var s = date.getSeconds();
        var second = (s < 10) ? '0' + s : s;


        var dateFull = day + "/" + month + "/" + year;
        var hourFull = hour + ':' + minute + ':' + second;


        var monto = $('#money').val(),
            plazo = $('#plazo').val(),
            phone = $('#phone').val(),
            email = $('#email').val(),
            account = $('input[name=cuenta]:checked').val(),
            estatus = $('#estatus').val(),
            birth = $('#birth').val(),
            terms = $('input#terms').val(),
            privacy = $('input#privacy').val(),
            dateRegister = dateFull,
            dateHour = hourFull,
            emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            
        //Validations Form
        if(monto == '' || monto == '$'){
            alert('Ingresa una cantidad válida')
        } else if(plazo == null) {
            alert('Selecciona un plazo')
        } else if(phone == '') {
            alert('Ingresa un teléfono válido')
        } else if(phone.length < 10){
            alert('tu telefono debe ser de 10 dígitos'); 
        } else if(email == '') {
            alert('Ingresa un correo electrónico válido')
        } else if(emailRegex.test(email) == false) {
            alert('Ingresa un correo electrónico válido')
        } else if(account == undefined){
            alert('Selecciona si cuentas o no con cuenta bancaría o de ahorro')
        } else if(!$("#terms").prop("checked")){
            alert('Debes aceptar los Términos y condiciones')
        } else if(!$("#privacy").prop("checked")) {
            alert('Debes aceptar El aviso de privacidad')
        } else {
            $.ajax({ 
		    url:'https://credigenio.mx/create/?', 
                type: 'POST', 
                contentType: 'application/json', 
                data: JSON.stringify({ 
                    monto: monto,
                    plazo: plazo,
                    phone: phone,
                    email: email,
                    cuenta: account,
                    estatus: 'null',
                    dateBirth: 'null',
                    terms: terms,
                    privacy: privacy,
                    dateRegister: dateRegister,
                    hourRegister: dateHour
                }), 
                error: function(jqXhr, textStatus, errorThrown) { 
                  alert('error en el servicio');  
              }, 
              success: function(data, textStatus, jQxhr){
		    document.getElementById("form-lead").reset();
                    $('#exampleModalCenter').modal({
                        backdrop: false,
                        show: true
                    }); 
                    $('.modal').css('background','rgba(0,0,0,0.5)');
                    setTimeout(function(){
                        $('.spinner').fadeOut('slow');
                        setTimeout(function(){
                            $('.fa-check-circle').fadeIn('slow');
                            $('#msg').text('¡Hemos encontrado tu mejor opción!');

                            setTimeout(function(){
                                $('.fa-check-circle').fadeOut();
                                $('#msg').fadeOut();
                                setTimeout(function(){
                                    $('.kueski').fadeIn('slow');
                                },500)
                            },500)
                        },800);
                    },4000);
                }
            }); 
        }


    })
}

$(document).ready(function(){
    createLead();
})

