
// $('.addCertification a').click(function(){
//     $('.certification ').append('<div class="uk-grid secRow uk-grid-mobile mt20"><div class="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile"><div class="uk-form-inline uk-from-inline-mobile"><label class="uk-form-label">Certification</label><input type="text" name="" placeholder="Some certification name" class="uk-form-controls"></div></div><div class="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile"><div class="uk-form-inline uk-from-inline-mobile"><label class="uk-form-label">Institution</label><input type="text" name="" placeholder="Name of the Certifying institution" class="uk-form-controls"></div></div></div>');
// });


// $('.addDegree a').click(function(){
//     $('.degree').append('<div class="uk-grid secRow uk-grid-mobile mt20"><div class="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile"><div class="uk-form-inline uk-from-inline-mobile"><label class="uk-form-label">Highest University Degree</label><input type="text" name="" placeholder="Highest University Degree" class="uk-form-controls"></div></div><div class="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile"><div class="uk-form-inline uk-from-inline-mobile"><label class="uk-form-label">Institution</label><input type="text" name="" placeholder="Name of the Certifying institution" class="uk-form-controls"></div></div></div>');
// });

// $('.addanthr a').click(function(){
//     $('.customDropdown').append(' <div class="uk-grid secRow uk-grid-mobile mt20"><div class="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile"><div class="uk-form-inline uk-from-inline-mobile"><label class="uk-form-label uk-form-help-block" for="typeSport">I coach Athletes In</label><div class="multiLevelDD"><div class="rowOne"><input type="text" placeholder="Type Sport"><span class="arrowIcon"></span><a href="" class="clearIcon"><i class="fa fa-times-circle" aria-hidden="true"></i></a></div><ul class="autoFill"><li><a href="#!">Baseball</a></li><li><a href="#!">Softball</a></li></ul><div class="rowSpeciality"><a href="#!" class="addLink">ADD SPECIALITY</a><a href="#!" class="linkValueSpeciality">Some values comes here...</a><h6 class="specialityHead">ADD SPECIALITY</h6><ul class="checkBoxList"><li><input class="optioncheckbox" id="box1" type="checkbox" value="Batting" ><label for="box1">Batting</label></li><li><input class="optioncheckbox" id="box2" type="checkbox" value="Pitching"><label for="box2">Pitching</label></li><li class="LastChild"><a href="#!">Done</a></li></ul></div></div></div></div><div class="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile"><div class="uk-form-inline uk-from-inline-mobile"><label class="uk-form-label">Total years of experience</label><select class="uk-form-controls uk-form-width-small"><option>Select Year</option><option>1 Year</option><option>2 Years</option></select></div></div></div>')
// });


// $('.stepContent').click(function () {    
//     $('input[type="radio"]', this).prop("checked",true);
// });


// $('.customDropdown .multiLevelDD .rowOne input').focus(function(){
//     $('.customDropdown  .autoFill').show();
//     $('.customDropdown .arrowIcon').hide();
//     $('.customDropdown .clearIcon').show();
//     $(this).addClass('bdStyle');
// });
// $('.autoFill li a').click(function(){
//     $('.autoFill').hide();
//     $('.multiLevelDD .rowOne input').addClass('bdStyle');
//     $('.rowSpeciality').show();
//     $('.rowSpeciality .addLink').show();
// });
// $('.rowSpeciality .addLink').click(function(){
//     $(this).hide();
//     $('.specialityHead').show();
//     $('.checkBoxList').show();
// });
// $('.LastChild a').click(function(){
//     $('.linkValueSpeciality').css("display","block");
//     $('.checkBoxList').hide();
//     $('.specialityHead').hide();
//     $('.addanthr a').show();
// });
// $('.linkValueSpeciality').click(function(){
//     // $('.specialityHead').show();
//     $('.checkBoxList').show();
// });
// $('.customDropdown .clearIcon').click(function(){
//     $('.customDropdown .autoFill').hide();
//     $('.rowSpeciality').hide();
//     $('.rowSpeciality .addLink').hide();
//     $('.specialityHead').hide();
//     $('.checkBoxList').hide();
//     $('.addanthr a').hide();
//     $('.multiLevelDD .rowOne input').removeClass('bdStyle');
//     $(this).hide();
//     $('.customDropdown .arrowIcon').show();
// });


// // $('.empBtn').click(function(){
// //     $('.exampleInfo').css('right','0');
// // });
// // $('.expHeading>.close').click(function(){
// //     $('.exampleInfo').css('right','-30%');
// // });

// $('.menuSelect').click(function(){
//     $('.menuSelect p').toggleClass("open")
//     $('.menuSelect>.uk-dropdown-navbar').toggle();
// });

// $('.categorymenuSelect').click(function(){
//     $('.categorymenuSelect p').toggleClass("open")
//     $('.categorymenuSelect>.uk-dropdown-navbar').toggle();
// });


// $('.questionPublishtypeBtn1').click(function(){
//     $('#cl-sd-questionPublishtype1').show();
//     $('#cl-sd-questionPublishtype2').hide();
// });

// $('.questionPublishtypeBtn2').click(function(){
//     $('#cl-sd-questionPublishtype2').show();
//     $('#cl-sd-questionPublishtype1').hide();
// });

// $('.cl-sd-questionTypeMbOuter').click(function(){
//     $('.cl-sd-questionTypeMobile').toggle();
// });



// function checkPass()
// {
//     var pass1 = document.getElementById('pass1');
//     var pass2 = document.getElementById('pass2');
//     var message = document.getElementById('error-nwl');
//     var passlength = document.getElementById('lengthchk');
    
//     var goodColor = "#a0d068";
//     var weakColor = "#fbde79";
//     var badColor = "#e36262";
    
//     if(pass1.value.length > 8)
//     {
//         message.style.backgroundColor = goodColor;
//         message.style.color = "#000";
//         message.innerHTML = "ok!"
//     }
//     else if (pass1.value.length > 6)
//     {
//         message.style.backgroundColor = weakColor;
//         message.style.color ="#000";
//         message.innerHTML = "Weak"
//     }
//     else
//     {
//         message.style.backgroundColor = badColor;
//         message.style.color = "#000";
//         message.innerHTML = "Very Weak"
//         return;
//     }
// }


// //Messaging JS
// $('.msg_messageActions-flyoutTrigger').on('click', function(e){
//     e.preventDefault();
//     e.stopPropagation();

//     $('.msg_messageActions-dropdown').removeClass('uk-open');

//     var posLeft = $(this).position().left - (($('.msg_messageActions-flyout').outerWidth() - $(this).outerWidth()) / 2) ;
//     var posTop = $(this).position().top + $(this).height() + 10;
    
//     $('.msg_messageActions-flyout').css({
//         'left' : posLeft,
//         'top' : posTop
//     });

//     $('.msg_messageActions-flyout').fadeToggle();

//     $(document).one('click', function() {
//         $('.msg_messageActions-flyout').fadeOut();
//     });
// });

// $('.msg_messageActions-flyout, .msg_sidebar-nav, .msg_messageActions').on('click', function(e) {
//     e.stopPropagation();
// });

// $('.msg_messageActions-close').on('click', function(e) {
//     e.preventDefault();
//     $('.msg_messageActions').fadeOut(function() {
//         $(this).removeClass('msg_messageActions--mobile');  
//     })
// });

// $('.msg_sidebar-navTrigger').on('click', function(e) {
//     e.preventDefault(); 
//     e.stopPropagation();

//     var posLeft = $(this).position().left - (($('.msg_sidebar-nav').outerWidth() - $(this).width()) / 2) ;
//     var posTop = $(this).height() + $(this).height() + 10;
    
//     $('.msg_sidebar-nav').css({
//         'left' : posLeft,
//         'top' : posTop
//     });

//     $('.msg_sidebar-trainerDropdown').removeClass('uk-open');    

//     $('.msg_sidebar-nav').fadeToggle();

//     $(document).one('click', function() {
//         $('.msg_sidebar-nav').fadeOut();
//     });
// });

// $('.msg_sidebar-searchTrigger').on('click', function(e) {
//     e.preventDefault(); 
//     e.stopPropagation();    

//     $('.msg_sidebar-trainerDropdown').removeClass('uk-open');   
//     $('.msg_sidebar-nav').fadeOut(250);

//     $('.msg_messageActions').toggleClass('msg_messageActions--mobile').fadeToggle();

//     $(document).one('click', function() {
//         $('.msg_messageActions').removeClass('msg_messageActions--mobile').fadeOut();
//     });
// });

// $('.msg_messageActions [data-uk-dropdown]').on('show.uk.dropdown', function(){
    
//     if($(this).parents('.msg_messageActions-flyout').length == 0) {
//         $('.msg_messageActions-flyout').fadeOut(250);
//     }
    
// });

// function setMessageDetailPane() {
//     if($(window).width() < 961) {
//         $('body').addClass('message--open');
//         var paddingValue = $('.msg_messagesDetail-toolBar').outerHeight(true) + $('.msg_messagesDetail-subject').outerHeight(true);
//         $('.msg_messagesDetail').css('padding-top', paddingValue);  
//     } else {
        
//     } 
// }

// $('.msg_messagesList-item').on('click', function(e) {
//     setMessageDetailPane();
// });

// $('.msg_messagesDetail-close').on('click', function(e) {
//     $('body').removeClass('message--open'); 
// });

// $(window).resize(function(e) {
//     $('body').removeClass('message--open');  
// });

// $('#cl-session-decline input[name="cl-input-decline"]').on('change', function (e) {
//     $('#cl-session-decline li').removeClass('active');
//     $(this).closest('li').addClass('active');
//     $('.cl-sd-sessionReason').show();
//     $('.cl-modal-actionsSubmit').removeClass('cl-modal-actionsSubmit--disabled');
// });
