
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

$('.btn-next').click(function(){
    let url = $(this).data('url');
    let pathname = window.location.pathname;

    switch (pathname) {
        case '/step2':
            let check = $('input[name="radio"]').is(':checked');
            let check2 = $('input[name="radio2"]').is(':checked');
            if(!check) { 
                alert("selecciona un ingreso mensual") 
            } else if(!check2){
                alert("selecciona si puedes comprobar tus ingresos") 
            } else {
                window.location.pathname = url;
            }
            break;
        case '/step3':
            let check3 = $('input[name="radio"]').is(':checked');
            if(!check3) {
                alert('selecciona un estatus laboral')
            } else {
               window.location.pathname = url; 
            }
            break;
        case '/step4':
            let check4 = $('input[name="radio"]').is(':checked');
            if(!check4) {
                alert('selecciona una opción')
            } else {
               window.location.pathname = url; 
            }
            break;
        case '/step6':
            let terms = $('input#terms').val();
            let privacy = $('input#terms').val();
            if(!$("#terms").prop("checked")){
                alert('Debes aceptar los Términos y condiciones');
            } else if(!$("#privacy").prop("checked")){
                alert('Debes aceptar el Aviso de privacidad');
            } else {
                window.location.pathname = url; 
            }
            break;
    }
    
})

$('input.cbx[type=checkbox]').click(function(){
  let valCheck = $('input.cbx[type=checkbox]').is(':checked');
  if (valCheck) {
      $('.hidden-box').fadeIn('slow');
      $('#textInfo').fadeOut('slow');
  }else{
      $('.hidden-box').fadeOut();
      $('#textInfo').fadeIn();
  };
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
            estatus = $('input#estatus').val(),
            birth = $('#birth').val(),
            terms = $('input#terms').val(),
            privacy = $('input#privacy').val(),
            dateRegister = dateFull,
            dateHour = hourFull,
            emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

          
        //Validations Form
        if(phone == '') {
            alert('Ingresa un teléfono válido')
        } else if(phone.length < 10){
            alert('tu telefono debe ser de 10 dígitos'); 
        } else if(email == '') {
            alert('Ingresa un correo electrónico válido')
        } else if(emailRegex.test(email) == false) {
            alert('Ingresa un correo electrónico válido')
        } else {
            $.ajax({ 
		        url:'https://credigenio.mx/create/?',
                //url:'http://localhost:1337/create/?',  
                type: 'POST', 
                contentType: 'application/json', 
                data: JSON.stringify({ 
                    monto: '$1,000',
                    plazo: '15 dias',
                    phone: phone,
                    email: email,
                    cuenta: 'Si',
                    estatus: 'null',
                    dateBirth: 'null',
                    terms: 'true',
                    privacy: 'true',
                    dateRegister: dateRegister,
                    hourRegister: dateHour
                }), 
                error: function(jqXhr, textStatus, errorThrown) { 
                  alert('error en el servicio');  
              }, 
              success: function(data, textStatus, jQxhr){
                  if(data.success) {
                    console.log('correcto')
                   
                    fbq('track','Lead');
                  } else {
                    console.log('duplicado')
                  };
                  
                  setTimeout(function(){
                    window.location.pathname = '/step2';
                    }, 800);
                }
            }); 
        }


    })
}

$(document).ready(function(){
    createLead();
})

