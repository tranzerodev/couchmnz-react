// var winWidth = $(window).width();
// var tabMenuadded = false;
// function addMenuItem(param){    
//     if(param<960 && param>767 && tabMenuadded == false){
//         $(".mb-tab-header").find(".hidden-m").each(function(){
//             var thisHTML = $(this).html();
//             $(".my-profile .dropdown-ui").prepend("<li class='newAdd'>"+thisHTML+"<span class='dp-arrow'></span>"+"</li>"); 
//             tabMenuadded = true;          
//         });        
//     }else if(param>960 && tabMenuadded == true){
//         $(".my-profile .dropdown-ui").find(".newAdd").remove();
//         tabMenuadded = false; 
//     }
// }
// $(document).ready(function(){
//     $('.rating input').change(function () {
//         var $radio = $(this);
//         $('.rating .selected').removeClass('selected');
//         $radio.closest('label').addClass('selected');
//       });
//     $(".favorite").click(function() {
//         $(this).children().toggleClass("fa-heart fa-heart-o");
//     });  
    
    
//     $(".my-profile li a").on("click",function(e){
//         $(this).css({
//             "border-bottom": "1px solid #cccccc"
//         })
//         if($(this).parent().find("ul")){
//             e.stopPropagation();
//             $(this).parent().find("ul").slideToggle(function(){
//                 $(this).parent().toggleClass("active");
//                 if(!$(this).parent().hasClass("active")){
//                     $(this).parent().find("a").css({
//                         "border-bottom": "none"
//                     });
//                 }
//             });
            
//         }
        
//     });
//     $(".my-profile li span").on("click",function(e){
//         $(this).siblings().css({
//             "border-bottom": "1px solid #cccccc"
//         })
//         if($(this).parent().find("ul")){
//             e.stopPropagation();
//             $(this).parent().find("ul").slideToggle(function(){
//                 $(this).parent().toggleClass("active");
//                 $(this).css({
//                     "border-bottom": "none"
//                 });
//                 if(!$(this).parent().hasClass("active")){
//                     $(this).parent().find("a").css({
//                         "border-bottom": "none"
//                     });
//                 }
//             });
            
//         }
        
//     });    
//     $('body').click(function(e){
//         if($(".search-category").is(':visible')===true){
//             $( ".search-category" ).addClass("display-none");
//         }
//         if($(".type-of-sport").is(':visible')===true){
//             $( ".type-of-sport" ).removeClass("display-block");
//             $(".selected-option").removeClass("open");
//         }
        
//     });



//     $(".close-dp").on("click",function(e) {
//         event.preventDefault();
//         $(this).parent().addClass("uk-dropdown-close");
//     })
//    $(window).bind('load', function () {
//        if($('.sidepanel').length>=1){
//             var documentHeight = $(document).height();
//             $('.sidepanel').height(documentHeight+300);            
//        }
//     });   
//     $('.sidebarOnOff').on('click',function(event){
//         event.preventDefault();
//         $(this).hide();
//         var winWidth = $(window).width();
//         var sdpWidth =  $('.sidepanel').outerWidth();
//         var BWwidth = winWidth - sdpWidth - 150;
//         if(winWidth>=1600){
//             $('body').find('.booking-wrapper').addClass('leftMargin sidebarOn-noflwidth');
//         }else if(winWidth>=1400 && winWidth <1600){
//             $('body').find('.booking-wrapper').addClass('leftMargin sidebarOn');
//         }else if(winWidth<1400 && winWidth>=1220){
//             $('body').find('.booking-wrapper').addClass('leftMargin sidebarOn mbWidth');
//             $('body').find('.sidebarOn .width60Percent').css({
//                 "width": "75%"
//             })
//         }else if(winWidth<1220 && winWidth >=1100 ){
//             $('.sidepanel').css({
//                 "right": 0,
//                 "width": winWidth-60
//             });            
//         }else if(winWidth<1099 ){
//             $('.sidepanel').css({
//                 "right": 0
//             });
            
//         }
//         $('body').find('.booking-wrapper').css("max-width",BWwidth);
//         $('.sidepanel').addClass("moveLeft");
//     })
//     $('.closeSidebar').on('click',function(event){
//         event.preventDefault();
//         var winWidth1 = $(window).width();
//         $('.sidepanel').removeClass("moveLeft");  
//         if(winWidth>=1600){      
//             $('body').find('.booking-wrapper').removeClass('leftMargin sidebarOn-noflwidth');
//         }else if(winWidth>=1400 && winWidth <1600){
//             $('body').find('.booking-wrapper').removeClass('leftMargin sidebarOn');
//         }else if(winWidth<1400 && winWidth>=1220){
//             $('body').find('.booking-wrapper').removeClass('leftMargin sidebarOn mbWidth');
//             $('body').find('.review-listing .width60Percent').css({
//                 "width": "40%"
//             })
//         }else if(winWidth<1220){
//             $('.sidepanel').css({
//                 "right": -$('.sidepanel').width()-60
//             });
//         }
//         $('body').find('.booking-wrapper').css("max-width","1420px");
//         $('.sidebarOnOff').show();
//     })
//     // Custom Accordian
//     if($('.custom-accordian').length>=1){
//         $('.custom-accordian').find('.sub-heading').each(function(){
//             $(this).find('h2').on('click',function(){
//                 $(this).parent().next().slideToggle();
//                 $(this).toggleClass('open');
//             })
//         })
//     }
// })
// $(document).ready(function() {
//     var navChildren = $('.profile-anchor ul li').children();
//     var aArray = [];
//     for (var i = 0; i < navChildren.length; i++) {
//         var aChild = navChildren[i];
//         var ahref = $(aChild).attr('href');        
//         aArray.push(ahref);
//     }
//     $(window).scroll(function() {
//         var windowPos = $(window).scrollTop();
//         var windowHeight = $(window).height();
//         var docHeight = $(document).height();
//         for (var i = 0; i < aArray.length; i++) {
//             var theID = aArray[i];
//             var secPosition = $(theID).offset().top;
//             secPosition = secPosition - 135;
//             var divHeight = $(theID).height();
//             divHeight = divHeight;
//             if (windowPos >= secPosition && windowPos < (secPosition + divHeight)) {
//                 $("a[href='" + theID + "']").addClass("active");
//             } else {
//                 $("a[href='" + theID + "']").removeClass("active");
//             }
//         }
//     });
 
// });

// $(window).resize(function(){
//     winWidth = $(window).width();
//     //addMenuItem(winWidth);
// })

// //

// $(".search-icon a").on("click", function(e){
//     e.preventDefault();
//     $(".sm-search").slideToggle();
//     $(window).scrollTop(0);
// })

// $( ".sport-select" ).click(function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     $( ".search-category" ).removeClass("display-none");
//   });
//   $( ".sport-select-sm" ).click(function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     $( ".search-category" ).removeClass("display-none");
//   });  

//   $(".selected-option").on('click',function(e){
//     e.stopPropagation();
//     $('.type-of-sport').toggleClass('display-block');
//     $(this).toggleClass('open');    
//   });
//   $('.type-of-sport li a').on('click',function(e){
//       e.preventDefault();
//     var clickedLi = $(this).text();
//     $(".selected-option").text(clickedLi);
//   });
//   $(".price-show-hide").click(function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     $(this).toggleClass('opened');
//     $( ".training-cost" ).slideToggle();
//   });

//   //Equal Height

//   equalheight = function(container){
//       var windoWidth= $(window).width();
//         var arr = [];
//         if(windoWidth>959){
//             $(container).each(function() {    
//                 var divHeight = $(this).height();
//                 arr.push(parseInt(divHeight));
//             });
//             var max = Math.max.apply(Math,arr);
//             $(container).height(max);
//             function myStopFunction() {
//                 clearInterval(myVar);
//             }
//         }else{
//             $(container).height("auto");
//         }
//     };
    
//     $(document).ready(function() {
//         var myVar = setInterval(function(){ myTimer()}, 1000);

//         function myTimer() {
//             equalheight('.equalHeightDiv');
//         } 
//     });
    
    
//     $(window).resize(function(){
//       equalheight('.equalHeightDiv');
//     });

//     $(".search_filter").on("click",function(){
//         $(".filter-area-sm").slideToggle();
//     })