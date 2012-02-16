/**
  *jQuery.toggleforms - Have the abiilty to toggle
  *William Hatch, http://www.hatchdev.com
  

  *Copyright (c) 2012 William Hatch

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
*/
(function($) {
  
    var defaults = {
        //Ajax options
        ajaxOptions: null,
        //A boolean function that prevents the values from being toggled based on ajax data
        ajaxPreventToggle: null,
        //Allows user to submit empty values
        ajaxSubmitNone: true,
        //animation for show/hide
        animation : null,
        buttonClass: "",
        valueClass: "",
        buttonText: "edit",
        clickListener : null,
        nullText: "None" 
    }


    $.fn.toggleForms = function(options){
        var options = $.extend(defaults, options);
        var ajaxOptions = options.ajaxOptions;

        function add_button(element){
            //Add a button right after the identifier
            var name = element.attr("name");
            var html_string = "<button class='toggle_fields_edit" + options.buttonClass + "'";
            var id = "edit_" + name
            html_string += "id='"+ id+"'>";

            if(!options.icon){
                html_string += options.buttonText;
            } 
            html_string += "</button>";
            $(html_string).insertAfter(element);
            return $("#"+id);
           
        }

        function add_value(element){
            //TODO: finish this function
            var html_string = "<span class='" + options.valueClass +"' id=>";
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
        function toggle(element){
            //TODO: keep the value if there was a failure in sending ajax
            if(element.is(":visible")){
                //Empty values
                if(ajaxOptions != null){
                    var name = element.attr("name");
                    ajaxOptions["data"] = { name : element.val()};
                    var xhr = $.ajax(ajaxOptions);
                    //Some weird bug is prevented by evaulating the xhr status here
                    //Divide by 100 to allow all 200 status codes
                    var xhrStatus = xhr["status"] ;
                    xhrStatus = xhrStatus / 100;
                    //prevents the toggle if we can't send via ajax or some other option
                    if(xhrStatus != 2){
                        return;
                    }
                    if(options.ajaxPreventToggle != null && !options.ajaxPreventToggle(xhr.responseText)){
                        return
                    }
                }
                element.hide();
                
                if($.trim(element.val()) == ''){
                    element.prev().text(options.nullText);
                }
                else{
                    element.prev().text(element.val());
                }
                element.prev().show();
               
            }
            else{
                element.show();
                element.prev().hide();
            }
        }
        return this.each(function(){
            var object = $(this);
            var button = add_button(object);
            add_value(object);
            button.click(function(e){
                e.preventDefault(); 
                toggle(object)
            }); 
            return;
       });
    };
})(jQuery);

