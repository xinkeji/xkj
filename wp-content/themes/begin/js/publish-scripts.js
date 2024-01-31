var hasChanged=false;function confirmExit(){var mce=typeof(tinyMCE)!="undefined"?tinyMCE.activeEditor:false;if(hasChanged||(mce&&!mce.isHidden()&&mce.isDirty())){return bet_messages.unsaved_changes_warning}}window.onbeforeunload=confirmExit;function substr_count(mainString,subString){var re=new RegExp(subString,"g");if(!mainString.match(re)||!mainString||!subString){return 0}var count=mainString.match(re);return count.length}function str_word_count(s){if(!s.length){return 0}s=s.replace(/(^\s*)|(\s*$)/gi,"");s=s.replace(/[ ]{2,}/gi," ");s=s.replace(/\n /,"\n");return s.split(" ").length}function countTags(s){if(!s.length){return 0}return s.split(",").length}function post_has_errors(title,content,category,tags,fimg){var error_string="";if(bet_rules.check_required==false){return false}if((bet_rules.min_words_title!=0&&title==="")||category==-1||(bet_rules.min_tags!=0&&tags==="")){error_string=bet_messages.required_field_error+"<br/>"}var stripped_content=content.replace(/(<([^>]+)>)/ig,"");if(title!=""&&str_word_count(title)<bet_rules.min_words_title){error_string+=bet_messages.title_short_error+"<br/>"}if(content!=""&&str_word_count(title)>bet_rules.max_words_title){error_string+=bet_messages.title_long_error+"<br/>"}if(content!=""&&str_word_count(stripped_content)<bet_rules.min_words_content){error_string+=bet_messages.article_short_error+"<br/>"}if(str_word_count(stripped_content)>bet_rules.max_words_content){error_string+=bet_messages.article_long_error+"<br/>"}if(substr_count(content,"</a>")>bet_rules.max_links){error_string+=bet_messages.too_many_article_links_error+"<br/>"}if(tags!=""&&countTags(tags)<bet_rules.min_tags){error_string+=bet_messages.too_few_tags_error+"<br/>"}if(countTags(tags)>bet_rules.max_tags){error_string+=bet_messages.too_many_tags_error+"<br/>"}if(bet_rules.thumbnail_required&&bet_rules.thumbnail_required=="true"&&fimg==-1){error_string+=bet_messages.featured_image_error+"<br/>"}if(error_string==""){return false}else{return"<strong>"+bet_messages.general_form_error+"</strong><br/>"+error_string}}jQuery(document).ready(function($){$("input, textarea, #bet-post-content").keydown(function(){hasChanged=true});$("select").change(function(){hasChanged=true});$("td.post-delete a").click(function(event){var id=$(this).siblings(".post-id").first().val();var nonce=$("#betnonce_delete").val();var loadimg=$(this).siblings(".bet-loading-img").first();var row=$(this).closest(".bet-row");var message_box=$("#bet-message");var post_count=$("#bet-posts .count");var confirmation=confirm(bet_messages.confirmation_message);if(!confirmation){return}$(this).hide();loadimg.show().css({"float":"none","box-shadow":"none"});$.ajax({type:"POST",url:betajaxhandler.ajaxurl,data:{action:"bet_delete_posts",post_id:id,delete_nonce:nonce},success:function(data,textStatus,XMLHttpRequest){var arr=$.parseJSON(data);message_box.html("");if(arr.success){row.hide();message_box.show().addClass("success").append(arr.message);post_count.html(Number(post_count.html())-1)}else{message_box.show().addClass("warning").append(arr.message)}if(message_box.offset().top<$(window).scrollTop()){$("html, body").animate({scrollTop:message_box.offset().top-10},"slow")}},error:function(MLHttpRequest,textStatus,errorThrown){alert(errorThrown)}});event.preventDefault()});$("#bet-submit-post.active-btn").on("click",function(){tinyMCE.triggerSave();var title=$("#bet-post-title").val();var infob=$("#bet-info-b").val();var infoc=$("#bet-info-c").val();var infod=$("#bet-info-d").val();var infoe=$("#bet-info-e").val();var infof=$("#bet-info-f").val();var content=$("#bet-post-content").val();var category=$("#bet-category").val();var tags=$("#bet-tags").val();var pid=$("#bet-post-id").val();var fimg=$("#bet-featured-image-id").val();var nonce=$("#betnonce").val();var message_box=$("#bet-message");var form_container=$("#bet-new-post");var submit_btn=$("#bet-submit-post");var load_img=$("img.bet-loading-img");var submission_form=$("#bet-submission-form");var post_id_input=$("#bet-post-id");var errors=post_has_errors(title,content,category,tags,fimg);if(errors){if(form_container.offset().top<$(window).scrollTop()){$("html, body").animate({scrollTop:form_container.offset().top-10},"slow")}message_box.removeClass("success").addClass("warning").html("").show().append(errors);return}load_img.show();submit_btn.attr("disabled",true).removeClass("active-btn").addClass("passive-btn");$.ajaxSetup({cache:false});$.ajax({type:"POST",url:betajaxhandler.ajaxurl,data:{action:"bet_process_form_input",post_title:title,post_content:content,post_category:category,post_tags:tags,post_id:pid,featured_img:fimg,info_b:infob,info_c:infoc,info_d:infod,info_e:infoe,info_f:infof,post_nonce:nonce},success:function(data,textStatus,XMLHttpRequest){hasChanged=false;var arr=$.parseJSON(data);if(arr.success){submission_form.hide();post_id_input.val(arr.post_id);message_box.removeClass("warning").addClass("success")}else{message_box.removeClass("success").addClass("warning")}message_box.html("").append(arr.message).show();
if(form_container.offset().top<$(window).scrollTop()){$("html, body").animate({scrollTop:form_container.offset().top-10},"slow")}load_img.hide();submit_btn.attr("disabled",false).removeClass("passive-btn").addClass("active-btn")},error:function(MLHttpRequest,textStatus,errorThrown){alert(errorThrown)}})});$("body").on("click","#bet-continue-editing",function(e){$("#bet-message").hide();$("#bet-submission-form").show();e.preventDefault()});$("#bet-featured-image a#bet-featured-image-link").click(function(e){e.preventDefault();custom_uploader=wp.media.frames.file_frame=wp.media({title:bet_messages.media_lib_string,button:{text:bet_messages.media_lib_string},multiple:false});custom_uploader.on("select",function(){attachment=custom_uploader.state().get("selection").first().toJSON();jQuery("#bet-featured-image input#bet-featured-image-id").val(attachment.id);$.ajax({type:"POST",url:betajaxhandler.ajaxurl,data:{action:"bet_fetch_featured_image",img:attachment.id},success:function(data,textStatus,XMLHttpRequest){$("#bet-featured-image-container").html(data);hasChanged=true},error:function(MLHttpRequest,textStatus,errorThrown){alert(errorThrown)}})});custom_uploader.open()})});

function closetou() {
	host = document.referrer;
	window.location.href = host;
	window.history.back();
	window.opener=null;
	window.open('','_self');
	window.close();
	WeixinJSBridge.call('closeWindow');
}
