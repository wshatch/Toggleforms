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
        ajaxOptions: null,
        animation : null,
        buttonClass: "",
        valueClass: "",
        buttonText: "edit",
        clickListener : null,
        startValue: "" 
    }


    $.fn.toggleForms = function(options){
        var options = $.extend(defaults, options);

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
            $(html_string).insertBefore(element);
        }
        function toggle(element){
            if(element.is(":visible")){
                element.hide();
                element.prev().text(element.val());
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
            if(!options.ajaxOptions){
                button.click(function(e){
                    e.preventDefault(); 
                    toggle(object)
                }); 
                return;
            }
            //TODO: add ajax support
            var ajaxOptions = {
                
            }
       });
    };
})(jQuery);

