var words = {
  1: {
    cv: 'Пĕрре',
    ru: 'Один'
  },
  2: {
    cv: 'Иккĕ',
    ru: 'Два'
  },
  3: {
    cv: 'Виҫҫе',
    ru: 'Три'
  },
  4: {
    cv: 'Tăваттă',
    ru: 'Четыре'
  },
  5: {
    cv: 'Пиллĕк',
    ru: 'Пять'
  },
  6: {
    cv: 'Улттă',
    ru: 'Шесть'
  },
  7: {
    cv: 'Çиччĕ',
    ru: 'Семь'
  },
  8: {
    cv: 'Саккăр',
    ru: 'Восемь'
  },
  9: {
    cv: 'Тăххăр',
    ru: 'Девять'
  },
  10: {
    cv: 'Вуннă',
    ru: 'Десять'
  }
};
var data = {};
var count = 0;
var correctAnswer = document.querySelector('#teres');
var incorrectAnswer = document.querySelector('#teres_mar');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createResponse(items) {
  var response;
  var i = 1;
  while (!response) {
    /* защищаемся от бесконечного цикла */
    if (i > 100) { break };
    var check = true;
    var num = getRandomInt(1, 11);
    var word = words[num];
    Object.keys(items).forEach(el => {
      if (word.cv === items[el].cv) {
        check = false;
      }
    });
    if (check) {
      response = words[num];
    }
    i++;
  }
  return response;
}

function prepareResponses(item) {
  var responses = {};
  var correctId = getRandomInt(1, 4);
  responses[correctId] = item;
  var i = 1;
  while (Object.keys(responses).length < 4) {
    /* защищаемся от бесконечного цикла */
    if (i > 100) { break };
    var tempNum = getRandomInt(1, 5);
    if (!responses.hasOwnProperty(tempNum)) {
      responses[tempNum] = createResponse(responses);
    }
    i++;
  }
  return { correctId, responses };
}

function prepareResponseBlocks(root) {
  var column1 = document.createElement('div');
  var column2 = document.createElement('div');
  column1.classList.add("col-sm-4", "col-sm-offset-2", "text-center");
  column2.classList.add("col-sm-4", "text-center");
  for (var i = 1; i < 5; i++) {
    var h3Element = document.createElement('h3');
    var panelHeader = document.createElement('div');
    var panel = document.createElement('div');        
    h3Element.id="response-" + i;
    panelHeader.id="panelHeader" + i;
    panelHeader.classList.add("panel-heading");
    panel.id="panel-" + i;
    panel.classList.add("panel", "panel-default", "response-block");
    panel.addEventListener('click', checkResponse);
    panelHeader.appendChild(h3Element);
    panel.appendChild(panelHeader);
    if ( i < 3) {
      column1.appendChild(panel);
    } else {
      column2.appendChild(panel);
    }
  }
  root.appendChild(column1);
  root.appendChild(column2);
}

function removeResponseBlocks(root) {
  removeClickListeners();
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
}

function removeClickListeners() {
  for (var i = 1; i < 5; i++) {
    var panel = document.querySelector('#panel-' + i);
    if (panel) {
      panel.removeEventListener('click', checkResponse);
    }
  }
}

function removeElementClass() {
  for (var i = 1; i < 5; i++) {
    var panel = document.querySelector('#panel-' + i);
    if (panel) {
      panel.classList.remove("response-block");
    }
  }
}

function startGame() {
    var root = document.querySelector('#responses');
    removeResponseBlocks(root);
    prepareResponseBlocks(root);
    var num = getRandomInt(1, 11);
    var word = words[num];
    var { correctId, responses } = prepareResponses(word);
    var wordEl = document.querySelector('#quizWord');
    wordEl.innerText = word.cv;
    var i = 1;
    Object.keys(responses).forEach(el => {
      tmp = document.querySelector('#response-' + i);
      tmp.innerText = responses[el].ru;
      i++;
    });
    data = { correctId, word, responses };
}

function checkResponse(e) {
  var n = e.target.id.substr(-1, 1);
  removeClickListeners();
  removeElementClass();
  if (data.responses[n].cv === data.word.cv) {
    incrementCount();
    correctAnswer.play();
    var el = document.querySelector('#panel-' + n);
    el.classList.remove("panel-default", "response-block");
    el.classList.add("panel-success");
  } else {
    if (count > 0) {
      decrementCount();
    }
    incorrectAnswer.play();
    var el = document.querySelector('#panel-' + n);
    el.classList.remove("panel-default", "response-block");
    el.classList.add("panel-danger");
    var correct = document.querySelector('#panel-' + data.correctId);
    correct.classList.add("panel-success");
  }
}

function incrementCount() {
  count++;
  setCount(count);
}

function decrementCount() {
  count--;
  setCount(count);
}

function setCount(num) {
  var countEl = document.querySelector('#count');
  countEl.innerText = num;
}

startGame();