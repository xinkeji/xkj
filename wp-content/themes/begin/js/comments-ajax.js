function comments_ajax(){var qt=aqt.qt;var ajax_php_url=ajaxcomment.ajax_php_url;txt1='<div id="loading"><div class="loading-spin"></div></div>',txt2='<div id="error">#</div>',txt3='"> <div id="edita"></div>',num=1,comm_array=[];comm_array.push("");jQuery(document).ready(function($){$comments=$("#comments-title");$cancel=$("#cancel-comment-reply-link");cancel_text=$cancel.text();$submit=$("#commentform #submit");$submit.attr("disabled",false);$("#comment").after(txt1+txt2);$("#loading").hide();$("#error").hide();$body=(window.opera)?(document.compatMode=="CSS1Compat"?$("html"):$("body")):$("html,body");$("#commentform").submit(function(){$("#loading").fadeIn();$submit.attr("disabled",true).fadeTo("slow",0.5);$.ajax({url:ajax_php_url,data:$(this).serialize(),type:$(this).attr("method"),error:function(request){$("#loading").fadeOut();$("#error").fadeIn().html(""+request.responseText);setTimeout(function(){$submit.attr("disabled",false).fadeTo("slow",1);$("#error").fadeOut()},3000);if(qt=="1"){$(".qaptcha").html("");$(".qaptcha").QapTcha()}},success:function(data){$("#loading").hide();comm_array.push($("#comment").val());$("textarea").each(function(){this.value=""});var t=addComment,cancel=t.I("cancel-comment-reply-link"),temp=t.I("wp-temp-form-div"),respond=t.I(t.respondId),post=t.I("comment_post_ID").value,parent=t.I("comment_parent").value;if(qt=="1"){$(".qaptcha").html("");$(".qaptcha").QapTcha()}new_htm='" id="new_comm_'+num+'"></';new_htm=(parent=="0")?('\n<ol style="clear:both;" class="comment-list'+new_htm+"ol>"):('\n<ul class="children'+new_htm+"ul>");$("#respond").before(new_htm);$("#new_comm_"+num).hide().append(data);$("#new_comm_"+num+" li").append();$("#new_comm_"+num).fadeIn(4000);$body.animate({scrollTop:$("#new_comm_"+num).offset().top-200},900);countdown();num++;cancel.style.display="none";cancel.onclick=null;t.I("comment_parent").value="0";if(temp&&respond){temp.parentNode.insertBefore(respond,temp);temp.parentNode.removeChild(temp)}}});return false});addComment={moveForm:function(commId,parentId,respondId,postId,num){var t=this,div,comm=t.I(commId),respond=t.I(respondId),cancel=t.I("cancel-comment-reply-link"),parent=t.I("comment_parent"),post=t.I("comment_post_ID");t.respondId=respondId;postId=postId||false;if(!t.I("wp-temp-form-div")){div=document.createElement("div");div.id="wp-temp-form-div";div.style.display="none";respond.parentNode.insertBefore(div,respond)}!comm?(temp=t.I("wp-temp-form-div"),t.I("comment_parent").value="0",temp.parentNode.insertBefore(respond,temp),temp.parentNode.removeChild(temp)):comm.parentNode.insertBefore(respond,comm.nextSibling);$body.animate({scrollTop:$("#respond").offset().top-180},400);if(post&&postId){post.value=postId}parent.value=parentId;cancel.style.display="";cancel.onclick=function(){var t=addComment,temp=t.I("wp-temp-form-div"),respond=t.I(t.respondId);t.I("comment_parent").value="0";if(temp&&respond){temp.parentNode.insertBefore(respond,temp);temp.parentNode.removeChild(temp)}this.style.display="none";this.onclick=null;return false};try{t.I("comment").focus()}catch(e){}return false},I:function(e){return document.getElementById(e)}};function exit_prev_edit(){$new_comm.show();$new_sucs.show();$("textarea").each(function(){this.value=""});edit=""}var wait=8,submit_val=$submit.val();function countdown(){if(wait>0){$submit.val(wait);wait--;setTimeout(countdown,1000)}else{$submit.val(submit_val).attr("disabled",false).fadeTo("slow",1);wait=8}}})}comments_ajax();