jQuery(function(t){function e(){var e=t(".nplist");t(".page-row").removeClass("no-border"),t.each(e,function(){t(this).find(".page-row:visible:first").addClass("no-border")})}function a(e){var a=t(e.placeholder).parents("ol").length,s=t(".sortable").width(),i=40*a-40,o=s-i;t(e.placeholder).width(o).css("margin-left",i+"px"),n(e)}function n(e){var a=t(e.placeholder).parent("ol");t(a).is(":visible")||t(a).show()}function s(){t(".child-toggle").each(function(){var e=t(this).parent(".row").parent("li");if(t(e).children("ol").length>0){var a=t(e).children("ol:visible").length>0?"np-icon-arrow-down":"np-icon-arrow-right";t(this).html('<a href="#"><i class="'+a+'"></i></a>')}else t(this).empty()})}function i(){t("#np-error").hide(),t("#nested-loading").show();var e=t(".np-sync-menu").is(":checked")?"sync":"nosync";list=t("ol.sortable").nestedSortable("toHierarchy",{startDepthCount:0}),t.ajax({url:ajaxurl,type:"post",datatype:"json",data:{action:"npsort",nonce:nestedpages.np_nonce,list:list,syncmenu:e},success:function(e){"error"===e.status?(t("#np-error").text(e.message).show(),t("#nested-loading").hide()):t("#nested-loading").hide()}})}function o(e){t.ajax({url:ajaxurl,type:"post",datatype:"json",data:{action:"npsyncmenu",nonce:nestedpages.np_nonce,syncmenu:e},success:function(t){console.log(t),"error"===t.status&&alert("There was an error saving the sync setting.")}})}function r(e){var a={id:t(e).attr("data-id"),title:t(e).attr("data-title"),slug:t(e).attr("data-slug"),author:t(e).attr("data-author"),cs:t(e).attr("data-commentstatus"),status:t(e).attr("data-status"),template:t(e).attr("data-template"),month:t(e).attr("data-month"),day:t(e).attr("data-day"),year:t(e).attr("data-year"),hour:t(e).attr("data-hour"),minute:t(e).attr("data-minute"),navstatus:t(e).attr("data-navstatus"),npstatus:t(e).attr("data-np-status")},n=t(e).closest(".row").parent("li");if(t(n).children("ol").length>0)var s=t(n).children("ol"),i=t(".quick-edit-form").clone().insertBefore(s);else var i=t(".quick-edit-form").clone().appendTo(n);t(i).siblings(".row").hide();d(i,a)}function d(e,a){t(e).find(".np_id").val(a.id),t(e).find(".np_title").val(a.title),t(e).find(".np_slug").val(a.slug),t(e).find(".np_author select").val(a.author),t(e).find(".np_template").val(a.template),t(e).find(".np_status").val(a.status),"open"===a.cs&&t(e).find(".np_cs").prop("checked","checked"),"hide"===a.npstatus?t(e).find(".np_status").prop("checked","checked"):t(e).find(".np_status").removeAttr("checked"),"hide"===a.navstatus?t(e).find(".np_nav_status").prop("checked","checked"):t(e).find(".np_nav_status").removeAttr("checked"),t(e).find('select[name="mm"]').val(a.month),t(e).find('input[name="jj"]').val(a.day),t(e).find('input[name="aa"]').val(a.year),t(e).find('input[name="hh"]').val(a.hour),t(e).find('input[name="mn"]').val(a.minute),t(e).show()}function l(){t(".np-quickedit-error").hide(),t(".sortable .quick-edit").remove(),t(".row").show()}function c(e){t(".np-quickedit-error").hide();var a=t(".np-sync-menu").is(":checked")?"sync":"nosync";t.ajax({url:ajaxurl,type:"post",datatype:"json",data:t(e).serialize()+"&action=npquickedit&nonce="+nestedpages.np_nonce+"&syncmenu="+a,success:function(a){"error"===a.status?(p(e),t(e).find(".np-quickedit-error").text(a.message).show()):(p(e),u(e,a.post_data),h(e))}})}function u(e,a){var n=t(e).parent(".quick-edit").siblings(".row");t(n).find(".title").text(a.post_title);var s=t(n).find(".status");t(s).text("publish"!==a._status&&"future"!==a._status?"("+a._status+")":"");var i=t(n).find(".nav-status");t(i).text("hide"==a.nav_status?"(Hidden)":"");var o=t(n).parent("li");"hide"==a.np_status?(t(o).addClass("np-hide"),t(n).find(".status").after('<i class="np-icon-eye-blocked"></i>')):(t(o).removeClass("np-hide"),t(n).find(".np-icon-eye-blocked").remove());var r=t(n).find(".np-quick-edit");t(r).attr("data-id",a.post_id),t(r).attr("data-template",a.page_template),t(r).attr("data-title",a.post_title),t(r).attr("data-slug",a.post_name),t(r).attr("data-commentstatus",a.comment_status),t(r).attr("data-status",a._status),t(r).attr("data-author",a.post_author),t(r).attr("data-navstatus",a.nav_status),t(r).attr("data-np-status",a.np_status),t(r).attr("data-month",a.mm),t(r).attr("data-day",a.jj),t(r).attr("data-year",a.aa),t(r).attr("data-hour",a.hh),t(r).attr("data-minute",a.mn)}function p(e){t(e).find(".np-save-quickedit").removeAttr("disabled"),t(e).find(".np-qe-loading").hide()}function h(a){var n=t(a).parent(".quick-edit").siblings(".row");t(n).addClass("np-updated"),t(n).show(),t(a).parent(".quick-edit").remove(),e(),setTimeout(function(){t(n).addClass("np-updated-show")},1500)}t(document).ready(function(){s(),e()}),t(document).on("click",".child-toggle a",function(a){a.preventDefault();var n=t(this).parent(".child-toggle").parent(".row").siblings("ol");t(this).find("i").toggleClass("np-icon-arrow-down").toggleClass("np-icon-arrow-right"),t(n).toggle(),e()}),t(document).on("click",".nestedpages-toggleall a",function(a){a.preventDefault(),"closed"==t(this).attr("data-toggle")?(t(".nestedpages ol li ol").show(),t(this).attr("data-toggle","opened"),t(this).text(nestedpages.collapse_text),t(".child-toggle i").removeClass("np-icon-arrow-right").addClass("np-icon-arrow-down"),l(),e()):(t(".nestedpages ol li ol").hide(),t(this).attr("data-toggle","closed"),t(this).text(nestedpages.expand_text),t(".child-toggle i").removeClass("np-icon-arrow-down").addClass("np-icon-arrow-right"),l(),e())}),t(document).on("click",".np-toggle-hidden",function(a){a.preventDefault();var n=t(this).attr("href");"show"===n?(t(this).attr("href","hide"),t(this).text("Show Hidden Pages"),t(".np-hide").removeClass("shown").hide(),e()):(t(this).attr("href","show"),t(this).text("Hide Hidden Pages"),t(".np-hide").addClass("shown").show(),e())}),t(document).on("click",".np-toggle-publish",function(e){e.preventDefault();var a=t(this).attr("href");t(".np-toggle-publish").removeClass("active"),t(this).addClass("active"),"#published"==a?(t(".nplist .page-row").hide(),t(".nplist .published").show()):t(".nplist .page-row").show()}),t(document).on("click",".np-toggle-edit",function(e){e.preventDefault();var a=t(this).siblings(".action-buttons");t(a).is(":visible")?(t(this).removeClass("active"),t(a).hide()):(t(this).addClass("active"),t(a).show())});var f=function(){var t=0;return function(e,a){clearTimeout(t),t=setTimeout(e,a)}}();t(window).resize(function(){f(function(){t(".action-buttons").removeAttr("style"),t(".np-toggle-edit").removeClass("active")},500)}),t(document).ready(function(){t(".sortable").nestedSortable({items:"li",toleranceElement:"> .row",handle:".handle",placeholder:"ui-sortable-placeholder",start:function(t,e){e.placeholder.height(e.item.height())},sort:function(t,e){a(e)},stop:function(){setTimeout(function(){s()},100),i()},update:function(){}})}),t(".np-sync-menu").on("change",function(){var e=t(this).is(":checked")?"sync":"nosync";o(e)}),t(document).on("click",".np-quick-edit",function(e){e.preventDefault(),l(),r(t(this))}),t(document).on("click",".np-cancel-quickedit",function(e){var a=t(this).parents(".page-row");l(a),e.preventDefault()}),t(document).on("click",".np-save-quickedit",function(e){e.preventDefault(),t(".row").removeClass("np-updated").removeClass("np-updated-show");var a=t(this).parents("form");t(this).attr("disabled","disabled"),t(a).find(".np-qe-loading").show(),c(a)})});