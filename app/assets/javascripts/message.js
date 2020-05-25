$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main-chat__message-list__info">
           <div class="main-chat__message-list__info__name">
             ${message.user_name}
           </div>
           <div class="main-chat__message-list__info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__message-list__text">
             ${message.content}
         </div>
         <img src=${message.image} >`
     return html;
   } else {
     var html =
      `<div class="main-chat__message-list__info">
           <div class="main-chat__message-list__info__name">
             ${message.user_name}
           </div>
           <div class="main-chat__message-list__info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__message-list__text">
             ${message.content}
         </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-chat__message-list').append(html);
    $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
    $('form')[0].reset();
    $('#form__submit').prop('disabled', false);

  })
  .fail(function(){
    alert('メッセージ送信に失敗しました');
    $('#form__submit').prop('disabled', false);
  })

})
});

