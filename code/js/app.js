/*
*   Description: Chilli Sauce Website 4
*   Author: Jayson Hunter, Aditya Vijay
*   Date: September 2014
*/

var stagPlannerBtn;
var $win = $(window);
var $bottomHeader = $('.header-bottom');
var $pageHeader  = $('.page-header');
// var $scrollPosCurrent;
// var $screenPosPrevious;

// On document ready
$(document).ready(function(){
     $(document).foundation();

     Initialise();
});

function Initialise(){
 // $scrollPosCurrent = $win.scrollTop();
 // $screenPosPrevious = $win.scrollTop();

    setupMyStagPlanner();
    setupFlexSliders();
    setupIsotope();
    setupDropdown();
    setupBottomNavHide();
    setupGlobalSearch();
    setupDatepickers();
    setContainerResponsiveWithFlexslider();
    toggleKeyInformation();
    //setIconStates();
    swapHomeBGImages();
}

function setupIsotope(){
    var $container = $('.isotope-grid');


    $container.isotope({
        itemSelector: '.isotope-item',
        layoutMode: 'masonry'
    });

    setTimeout(function() {
        setupLazyLoad();
    }
    , 1000);
}


function setupLazyLoad(){
    var $lazyloaditems =  $(".lazy");

    $lazyloaditems.lazyload({
        effect : "fadeIn",
        threshold : 200
    });
}


function setupFlexSliders(){
   $('.flexslider').flexslider({
    animation: "slide"
  });

   $('.flexslider-with-thumbnails').flexslider({
    animation: "slide",
    controlNav: "thumbnails"
  });
}


function setupMyStagPlanner(){

    stagPlannerBtn = $('.msp-toggle');
    stagPlannerBtn.on('click', function(e){
        e.preventDefault();
        $('body').toggleClass('show-stag-planner');
    });

    $('#msp-panel__close').on('click', function(e){
        e.preventDefault();
        $('body').removeClass('show-stag-planner');
    });

     $('#btn-stag-add-more').on('click', function(e){
        e.preventDefault();
        $('body').removeClass('show-stag-planner');
    });

    $('#msp-overlay').on('click', function(e){
        e.preventDefault();
        $('body').removeClass('show-stag-planner');
    });
}


/*
dropdown display name of selected option
*/
function setupDropdown()
{
    $('.dropdown-button').on('click', function(){
        // $panel = $(this).next();
        // $panel.css('top','54px');
        // $panel.css('left','0px');
    })

    $('.dropdown__option').on('click',function(){
        var html = $(this).html();
        var $sel = $(this).parent().parent().prev();
        var $panel = $(this).parent().parent();
        $sel.html(html+'<i class="icon arrow-style-a dropdown-arrow"></i>');
        $panel.removeClass('open');
        $panel.css('display','none');
        return false;
    });
}


/*
 hide bottomheader on particular scroll position
*/

function setupBottomNavHide()
{
    var $scrollPosCurrent = $win.scrollTop();
    var $scrollPosPrevious = $win.scrollTop();

    $win.scroll( function(){
        var transitionPoint = 50;
        var isNavHide = $pageHeader.hasClass('nav-hide');
        $scrollPosCurrent = $win.scrollTop();

        if($scrollPosCurrent <= transitionPoint || $scrollPosCurrent < $scrollPosPrevious )
        {
            $pageHeader.removeClass('nav-hide');
        }
        else
        {
            $pageHeader.addClass('nav-hide');
        }

        $scrollPosPrevious = $scrollPosCurrent;
        return false;
    });
}



function setupGlobalSearch() {
    $('.global-search-toggle').on('click', function(e){
            e.preventDefault();
            $('#global-search-bar').toggleClass('is-shown');
        })
};



/*
    setup datepicker
*/
function setupDatepickers()
{
    var $datepicker;

    $(".datepicker-toggle").click(function()
    {
        var $isOpen = $(this).hasClass('open');
        var $datepicker = $(this).next();
        if(!$isOpen)
        {
            $(this).addClass('open');
            $datepicker.show();
        }
        else
        {
            $(this).removeClass('open');
            $datepicker.hide();
        }
    });

    $(".datepicker").datepicker({
            firstDay: 1,
            onSelect: function(){
            var $datepickertoggle = $(this).prev();
            var $date = $(this).datepicker("getDate");
            var date = new Date($date);
            var dateString = date.toDateString();

            $datepickertoggle.removeClass('open');
            $(this).hide();
            $datePlaceHolder = $(this).prev().children().first();
            $datePlaceHolder.text( dateString );
        }}).hide();


   // $( ".datepicker" ).show();
}


//Sets up height of container with flexslider on resize
function setContainerResponsiveWithFlexslider()
{
    window.onresize = function()
    {
        setCategoryPageContainerResponsive();
    }
}

//inititialize flexslider height to container height
$(".category-flexslider").flexslider({
        start: function() {
        setCategoryPageContainerResponsive();
        }
    });

function setCategoryPageContainerResponsive()
{
    $flexsliderHeight =  $('.category-flexslider').height();
    $flexsliderPosition =  $('.category-flexslider').css("position");
    $containerWidth = $('.category-details-wrapper').width();
    $setContainerWidth = 415;// container width which needs to be set
    $screenSize = window.innerWidth;
    $breakpointForFixedWidthContainer = 1000;//screen size at which left will fix in it's size
    $relativeFlexsliderSize = $screenSize-$breakpointForFixedWidthContainer;
    $('.category-details-wrapper').css('height',$flexsliderHeight);
    if ($screenSize>768)
    {
        $('.category-details-wrapper').css('top', '0px');
        if( $screenSize <= $breakpointForFixedWidthContainer)
        {
            $('.category-flexslider .slides img').css("height", $flexsliderHeight);
            $('.category-details-wrapper').css("width", $setContainerWidth );
            $('.category-details-wrapper').css("float", "none" );
            $('.category-flexslider').css('float','none');
            $('.category-flexslider').css('position','absolute');
            $('.category-flexslider').css('left',$setContainerWidth);
            $('.category-flexslider').css('top','0px');
            $('.category-flexslider').css("width","auto");
        }
        else
        {
            $('.category-flexslider .slides img').css("height", "auto");
            $('.category-details-wrapper').css("width", "41.66667%");
            $('.category-details-wrapper').css("float", "left");
            $('.category-flexslider').css('float','right');
            $('.category-flexslider').css('position','relative');
            $('.category-flexslider').css('left','0px');
            $('.category-flexslider').css("width","58.33333%");
        }
    }
    else
    {
        //for 768 display smashing(moving flexslider at top and container at bottom)
        $('.category-flexslider').css('position','absolute');
        $('.category-flexslider').css('left','0px');
        $('.category-details-wrapper').css("width", "auto");
        $('.category-details-wrapper').css("height", "auto");
        $('.category-details-wrapper').css('top', $flexsliderHeight );
    }
}



function toggleKeyInformation()
{
    $('.toggle-button').click(function(){

        var isToggled = $('.information-wrapper').hasClass('open');
        if( isToggled )
        {
            $('.information-wrapper').removeClass('open');
        }
        else
        {
            $('.information-wrapper').addClass('open');
        }
    });
}

/*
Icon states logic for SVG's
function setIconStates()
{
    var $isNormal;
    var $isHovered;
    var $isToggled;
    $isNormal = $(this).hasClass('normal-active');
    $isHovered = $(this).hasClass('hover-active');
    $isToggled = $(this).hasClass('toggle-active');

    if( $isNormal )

        $(this).removeClass('normal-active');
    }
    else if( $isHovered )
    {
        $(this).removeClass('hover-active');
    }

    if( !$isToggled )
    {
        $(this).addClass('toggle-active');
    }
    else
    {
        $(this).removeClass('toggle-active');
        $(this).addClass('normal-active');
    }
});
}
*/
    // $('.icon-states').hover(function(){
    //     $isNormal = $(this).hasClass('normal-active');
    //     $isHovered = $(this).hasClass('hover-active');
    //     $isToggled = $(this).hasClass('toggle-active');

    //     if( $isNormal )
    //     {
    //         $(this).removeClass('normal-active');
    //     }
    //     else if( $isToggled )
    //     {
    //         $(this).removeClass('toggle-active');
    //     }

    //      if( !$isHovered )
    //     {
    //         $(this).addClass('toggle-active');
    //     }
    //     else
    //     {
    //         $(this).removeClass('toggle-active');
    //         $(this).addClass('normal-active');
    //     }

    // });


function swapHomeBGImages () {
    var bannerHome = document.getElementById('bannerhome');
    var homeNavItems;

    if (bannerHome) {
        homeNavItems = document.getElementsByClassName('home-nav__link');

        for (var index = 0; index < homeNavItems.length; index++) {
            homeNavItems[index].addEventListener("mouseover", function(){
                bannerHome.style.backgroundImage = 'url(' + this.getAttribute('data-bg-image') + ')';
             }, false);}
    }
}
