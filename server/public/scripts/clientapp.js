$(document).ready(function () {
getAnimal();
$('#submit').on('click', submitForm);

});

function getAnimal() {
  $.ajax({
    type: 'GET',
    url: '/animal',
    success: function () {
      $('.target-table').empty();
      animal.forEach(function (animal) {
        $container = $('<tr></tr>');

    var animalProperties = ['id', 'name', 'type', 'threat_level', 'amount'];

      var amount = function randomNumber(min, max){
        return Math.floor(Math.random() * (1 + max - min) + min);
      };


        animalProperties.forEach(function (prop) {
          var $el = $('<td class="'+ prop +'"></td>');
          $el.text(animal[prop]);
          $container.append($el);
        });

        $container.data('animal', animal.id);
        $container.append('<button class="update">Update</button>');
        $container.append('<button class="delete">Delete</button>');
        $('.target-table').append($container);
      });
    },
  });
}

function submitForm() {
  event.preventDefault();

  var animal = {};
  $.each($('#animalForm').serializeArray(), function (i, field){
    animal[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/animal',
    data: animal,
    success: function() {
      console.log(animal);
    }


  });
}
function addToDom() {
 $.get('/animal', function(animal) {
    var $el = $('.target-container');

    $el.empty();

   animal.forEach(function(animal) {
     if (animal.active_status === true) {
       $el.append('<div class="' + animal.id + '" >' +
                  '<ul><li>' + animal.name + ' ' +
                  animal.type + '</li>' +
                  '<li>animalID: ' + animal.id + '</li>' +
                  '<li>Threat Level: ' + animal.threat_level + '</li>' +
                  '<li>Amount: $' + animal.amount + '</li></ul>' +
                  '<button type="button" class="setInactive">Set Inactive</button></div>'
                 );
       $('.' + animal.id).data('animalID', animal);
     } else {
       $el.append('<div class="' + animal.id + '" >' +
                  '<ul><li>' + animal.name + ' ' +
                  animal.type + '</li></ul>' +
                  '<button type="button" class="setActive">Set Active</button></div>'
                 );
       $('.' + animal.id).data('animalID', animal);
     }
   });
 });
}
