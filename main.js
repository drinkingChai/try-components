$('main').children().hide();
$('main').find(`.${$('input[name=radio]:checked').val()}`).show();

$('form input').on('change', function(e) {
  let divName = $('input[name=radio]:checked').val();
  $('main').children().hide();
  $('main').find(`.${divName}`).show();
})
