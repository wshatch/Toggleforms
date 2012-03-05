/**
  *jQuery.toggleforms - Have the abiilty to toggle
  *William Hatch, http://www.hatchdev.com
  

  *Copyright (c) 2012 William Hatch

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
*/
;(function($) {
 
    var settings = {
        //Ajax options
        ajaxOptions: null,
        //A boolean function that prevents the values from being toggled based on ajax data
        ajaxPreventToggle: null,
        //Allows user to submit empty values
        ajaxSubmitNone: true,
        //default toggle effects
        animate: null,
        //CSS class for the generated edit button
        buttonClass: "",
        //Class for the generated value
        valueClass: "",
        //Text for the generated edit button
        buttonText: "edit",
        //click listener for the generated edit button NOT IMPLEMENTED
        clickListener : null,
        //Text to replace to value if there's nothing there.
        nullText: "None" 
    }
    var methods = {
        init: function(options){
            opts = $.extend(true,{}, settings, options);
            return this.each(function(){
                var element = $(this);
                var button = add_button($(this), opts);
                add_value($(this), opts);
                button.click(function(e){
                    e.preventDefault(); 
                    if(opts.ajaxOptions != null){
                        ajaxToggle(element, opts);
                    }
                    else{
                        toggle(element, opts);
                    }
                }); 
 
            });
      
        },
        destroy: function(){
        }

    }
    $.fn.toggleForms = function(method){
      if(methods[method]){
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      }
      else if (typeof method === 'object' || ! method){
        return methods.init.apply(this, arguments);
      }
      else{
        $.error('Method' + method + 'does not exist on jQuery.toggleforms');
      }
    }
    //Helper functions
    function add_button(element, opts){
        //Add a button right after the identifier
        var name = element.attr("name");
        var html_string = "<button class='toggle_fields_edit" + opts.buttonClass + "'";
        var id = "edit_" + name
        html_string += "id='"+ id+"'>";

        if(opts.icon == null){
            html_string += opts.buttonText;
        } 
        html_string += "</button>";
        $(html_string).insertAfter(element).data('tf_opts', opts);
        return $("#"+id);
       
    }

    function add_value(element, opts){
        var html_string = "<span class='" + opts.valueClass +"' id=>";
        html_string += element.val();            
        html_string += "</span>";
        if(element.val() != ''){
            element.hide();    
            $(html_string).insertBefore(element);
        }
        else{
            $(html_string).insertBefore(element).hide();
        }
    }

    function toggleAnimation(element, opts, callback)
    {
        if(opts == null){
          //The jquery toggle has an animation. We want to get rid of that.
            if(element.is(":visible")){
              element.hide();
            }
            else{
              element.show();
            }
            //element.toggle(callback);
            return;
        }
        //TODO: refactor
        //we have options
        if(opts instanceof Array){
            //TODO: allow callbacks
            if(opts.animation == "slide"){
                element.slideToggle(opts.duration, opts.easing);
            }
            else if(o.animation == "fade"){
                element.fadeToggle(opts.duration, opts.easing);
            }
            //we have a custom animation
            else if(opts.animation instanceof Array){
                if(opts.options instanceof Array){
                    element.animate(opts.animation,
                                    opts.options);
                }
                else{
                    element.animate(opts.animation, 
                                    opts.duration, 
                                    opts.easing);
                }
            }
        }
        //options for a default toggle animation
        else{
            if(opts == "slide"){

                element.slideToggle(callback);
            }
            else if(opts == "fade"){
                element.fadeToggle(callback);
            }
            else{
                element.toggle(callback, opts);
            }
        }
    }
    function ajaxToggle(element, opts){
        var name = element.attr("name");
        var ajaxOptions = opts.ajaxOptions;
        ajaxOptions["data"] = {name: element.val()};
        var oldSuccess= ajaxOptions["success"]
        ajaxOptions["success"] = function(){toggle(element, opts); oldSuccess();};
        element.data("ajaxOptions", ajaxOptions);
        if(element.is(":visible")){
            var xhr = $.ajax(element.data("ajaxOptions"));
            return;
        }
        toggle(element, opts);
    }


    function toggle(element,opts){
        if(element.is(":visible")){
             if($.trim(element.val()) == ''){
                element.prev().text(opts.nullText);
             }
             else{
                element.prev().text(element.val());
             }
             //Do the toggle animation (or none)
             if(opts.animate != null){
                 toggleAnimation(element, opts.animate, function(){toggleAnimation(element.prev(), opts.animate, null)});
             }
             else{
                 element.hide();
                 element.prev().show();
             }
        }
        else{
            if(opts.animate != null){
                toggleAnimation(element.prev(), opts.animate, function(){toggleAnimation(element, opts.animate, null)});
            }
            else{
                element.prev().hide();
                element.show();
            }
        }
    }


})(jQuery);

