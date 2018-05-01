export function template(){
	var view = "\
<section class='post'>\
    <header class='post-header'>\
        <h2 class='post-title'><%= denominazione_museo %></h2>\
                        <p class='post-meta'>\
                            By <a class='post-author' href='<% if(typeof(sito_web_sede) !== 'undefined'){%> <%= sito_web_sede %> <% } %>'><%= comune_sede %></a>\
                        </p>\
                    </header>\
                    <div class='post-description'>\
                        <p>\
                            <%= denominazione_sede %>\
                        </p>\
                    </div>\
                </section>\
";
	return view;
}
