        function toggleCardType(cardType) {
                    var cardLogos = $('ul.all-card-types li');

                    if (cardType && cardType.length > 0) {
                        cardLogos.each(function () {
                            if ($(this).hasClass(cardType)) {
                                $(this).removeClass('off').show();
                            } else {
                                $(this).addClass('off').hide();
                            }
                        });
                    } else {
                        cardLogos.removeClass('off').show();
                    }
                }
        var min    = 0;
              var second = 00;
              var zeroPlaceholder = 0;
              var counterId = setInterval(function(){
                                countUp();
                              }, 1000);

              function countUp () {
                  second++;
                 // console.log("1"+second);
                  if(second == 59){
                    second = 00;
                    min = min + 1;
                  }
                  if(second == 10){
                      zeroPlaceholder = '';
                  }else
                  if(second == 00){
                      zeroPlaceholder = 0;
                  }
                   // console.log(second);

                  $('.count-up').html(min+':'+zeroPlaceholder+second);

                    if(second % 15 == 0 ) {
                   var people_view=parseInt($("#people-view").html());
                  // console.log(people_view);
                   $("#people-view").html(people_view+3);
                  }
              }