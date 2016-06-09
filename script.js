$result = $('#result');
$scoresElms = $('#scores > input');
$deductCheck = $('#deduction');
$deductElms = $('.deduct');
$fullmark = $('#fullmark');

$deductCheck.on('click', function (event) {
  if ($deductCheck.prop('checked')) {
    $deductElms.css('display', 'inline');
  } else {
    $deductElms.css('display', 'none');
  }
  calculate();
});

// right click
$('body').on('contextmenu', function (event) {
  reset(event);
});

$('#reset').on('click', function (event) {
  reset(event);
});

$('#scores').on('focus click', 'input', function (event) {
  $(this).select();
});

$('#scores').on('keyup', 'input', function (event) {
  switch (event.keyCode) {
    case 27: // escape
    case 106: // keypad '*'
    case 111: // keypad '/'
      reset(event);
      break;
    case 13: // enter
      $(this).next().focus();
      break;
    case 46: // delete
      $(this).val(0);
      $(this).focus();
      event.preventDefault();
      break;
    default:
      break;
  }
});

$fullmark.on('change keyup', function (event) {
  calculate();
});

$('#scores').on('change keyup', 'input', function (event) {
  calculate();
});

calculate();
$scoresElms.first().focus();

function calculate() {
  const totalScore = $scoresElms.map(function (index) {
    return Number.parseFloat($(this).val());
  })
  .get() // to array
  .reduce((a, b) => a + b, 0); // sum

  if ($deductCheck.prop('checked')) {
    const fullmark = Number.parseInt($fullmark.val());
    $result.text(fullmark - totalScore);
  } else {
    $result.text(totalScore);
  }
}

function reset(event) {
  $scoresElms.val(0);
  $scoresElms.get(0).focus();
  calculate();
  event.preventDefault();
}
