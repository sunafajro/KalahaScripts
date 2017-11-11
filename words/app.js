    var data = {};
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
      responses[getRandomInt(1, 4)] = item;
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
      return responses;
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
      for (var i = 1; i < 5; i++) {
        var panel = document.querySelector('#response-' + i);
        if (panel) {
          panel.removeEventListener('click', checkResponse);
        }
      }
      while (root.firstChild) {
        root.removeChild(root.firstChild);
      }
    }

    function startGame() {
        var root = document.querySelector('#responses');
        removeResponseBlocks(root);
        prepareResponseBlocks(root);
        var num = getRandomInt(1, 11);
        var word = words[num];
        var responses = prepareResponses(word);
        var wordEl = document.querySelector('#quizWord');
        wordEl.innerText = word.cv;
        var i = 1;
        console.log(responses);
        Object.keys(responses).forEach(el => {
          tmp = document.querySelector('#response-' + i);
          tmp.innerText = responses[el].ru;
          i++;
        });
        data = { word, responses };
    }

    function checkResponse(e) {      
      var n = e.target.id.substr(-1, 1);
      console.log('данные ', data);
      console.log('идентификатор ответа ' + e.target.id);
      console.log('номер ответа ' + n);
      console.log('загаданное слово ' + data.word.cv);
      console.log('выбранное слово ' + data.responses[n].cv);
      if (data.responses[n].cv === data.word.cv) {
        var el = document.querySelector('#panel-' + n);
        el.classList.remove("panel-default", "response-block");
        el.classList.add("panel-success");
      } else {
        var el = document.querySelector('#panel-' + n);
        el.classList.remove("panel-default", "response-block");
        el.classList.add("panel-danger");
      }
    }

    startGame();