const numDivs = 36;
//количество попыток
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let count_miss=0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".target").removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(divSelector).text(hits+1);
    
  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits===0){
      firstHitTime=getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}
//функция окончания игры
function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".field").hide(); 
  $("#button-start").hide();
  $("#button-reload").show();
  let totalPlayedMillis = getTimestamp() - firstHitTime; 
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  //количество промахов
  $("#total-miss").text(count_miss);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".target").removeClass("miss");
    $(".target").text("");
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
       count_miss+=1;
       $(".target").addClass("miss");
      }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-reload").hide();
  $("#button-start").click(round);
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
