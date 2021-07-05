(function($) { 

  $.fn.serializeObject = function () {
    console.log(this);
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

  $('#GetQuote').on('click', function(e){
    //e.preventDefault();
    //$('#theModal').modal('show').find('.modal-content').load($(this).attr('href'));
  });

  //Service Type

  $('.confirm-appointment').on('click', function(e){
    var saveFrm = JSON.stringify($("#confirm-appointment-form").serializeObject());
    try {
      if (frm === null) {
        finalObj = JSON.parse(saveFrm);
      } else {
        var finalObj = $.extend(frm, JSON.parse(saveFrm));
      }
    } catch {
      finalObj = JSON.parse(saveFrm); 
    }
    
    var smesg = [];
    //smesg.push(finalObj);
    for(var i in finalObj){
        smesg.push([i, finalObj [i]]);
        
    }
    console.log(smesg)

    var user = $('input[name="email"]').val();
    var name = $('input[name="Customer Name"]').val();
    var phoneNo = $('input[name="Phone No"]').val();
    var address = $('input[name="address"]').val();
    var messages = buildHtmlTable(selector, smesg);
    console.log(smesg);
    //var TrainingUrl =  'https://app.damorelcouture.com/sendmail';
    var TrainingUrl =  'sendmail'; //'sendmailTemp'; // 
    var mailOptions = {
            from: 'info@cleanclassy.com',
            //to: 'segun@impartlab.com',
            to: 'cleanclassy@gmail.com',
            bcc: 'segxy2708@hotmail.com',
            //to: 'segun@impartlab.com',
            subject: 'Clean \'N\' Classy Appointment',
            //text: JSON.stringify(finalObj)
            html: JSON.stringify(messages),
            name: name
          };
          console.log(mailOptions);
    $.ajax({
            url: TrainingUrl,
            type: 'POST',
            data: JSON.stringify(mailOptions),
            processData: false,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // Do something with the result
                //toastr.success(' Quotation details submitted. Please kindly check your email address');
                save2DB(finalObj);
                //$('#addTrainingForm').pleaseWait('stop');
            },
            error: function (xhr, status, error) {
                //$('#addTrainingForm').pleaseWait('stop');
                toastr.error(error);
            }
        });
      //var saveFrm = JSON.stringify($("#addJobCategoryForm").serializeObject());
      
  })

  function save2DB(value){
    console.log(value);
    var url =  'customer';
    $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(value),
            processData: false,
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                // Do something with the result
                toastr.success(' Appointment booking submitted.');
                //$('#addTrainingForm').pleaseWait('stop');
            },
            error: function (xhr, status, error) {
                //$('#addTrainingForm').pleaseWait('stop');
                toastr.error(error);
            }
        });
  }
  

$('[data-toggle="offcanvas"]').on('click', function () {
    $('.navbar-collapse').toggleClass('show');
    });


/* ================ Revolution Slider. ================ */
  if($('.tp-banner').length > 0){
    $('.tp-banner').show().revolution({
      delay:6000,
          startheight: 680,
          startwidth: 1170,
          hideThumbs: 1000,
          navigationType: 'none',
          touchenabled: 'on',
          onHoverStop: 'on',
          navOffsetHorizontal: 0,
          navOffsetVertical: 0,
          dottedOverlay: 'none',
          fullWidth: 'on'
    });
  }
  if($('.tp-banner-full').length > 0){
    $('.tp-banner-full').show().revolution({
      delay:6000,
          hideThumbs: 1000,
          navigationType: 'none',
          touchenabled: 'on',
          onHoverStop: 'on',
          navOffsetHorizontal: 0,
          navOffsetVertical: 0,
          dottedOverlay: 'none',
          fullScreen: 'on'
    });
  } 
  


    /*==== Nav ====*/
    $('.navbar-collapse a').on('click',function(){
        $(".navbar-collapse").collapse('hide');
    });

/* ================ Nav ================ */
    $('.fa-caret-down').on("click", function(e) {
        e.preventDefault();
        $(this).next().slideToggle('');
    });
    

/* ================ Nice Select ================ */
    $(document).ready(function() {
  $('select').niceSelect();
});



  // The slider being synced must be initialized first
  $('#carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 210,
    itemMargin: 5,
    asNavFor: '#slider'
  });
 
  $('#slider').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel"
  });


})(jQuery);