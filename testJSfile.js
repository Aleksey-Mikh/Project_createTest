let questionNumber = 0;
let rightArray = [1, 2, 3, 4]
let dictionaryOfQuestions = {
    'Какое из нижеперечисленных высказываний не является логическим?': [
        'Aнанасовый сок самый вкусный', 
        'Луна это спутник Земли', 
        'Зимой обычно холоднее, чем летом', 
        'Все столы сделаны из дерева',
         [1]
        ],
    'Какая (какие) из следующих конструкций используется (используются) для ветвления?': [
        'for', 
        'do while', 
        'switch case', 
        'if else',
         [3, 4]
        ],
    'Внутри какого (каких) тегов может располагаться информация, которая показывается на странице web сайта?': [
        '<head></head>', 
        '<body></body>', 
        '<html></html>', 
        '<br>',
         [2, 3]
        ],
    'Что из нижеперечисленного является полем ввода?': [
        '<input>', 
        '<br>', 
        '<label>Имя:</label>', 
        '<button>Отправить</button>',
         [1]
        ],
    'Что из перечисленного является примером тестирования?': [
        'Несколько раз ввести неправильный код от домофона', 
        'Попробовать зарядить iPhone зарядным устройством от телефона с операционной системой Android', 
        'Попытаться разогнать автомобиль выше скорости указанной на спидометре', 
        'Заварить кофе в холодной воде',
         [1, 2, 3, 4]
        ],
}

// ADD QUESTION

function createQuestion() {
    let questionText = prompt('Введите текст вопроса', '');
    if (questionText) {
        return questionText;
    }
    alert('Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.');
    return false;
}

function createResponseOption() {
    let answerOptionArray = [];
    while (questionNumber++ < 4) {
        let answerOptionText = prompt(`Введите текст ${questionNumber} варинта ответа`, '');
        if (answerOptionText) {
            answerOptionArray.push(answerOptionText);
        } else {
            alert(`Вы не ввели текст ${questionNumber} варианта ответа. Попробуйте добавить вопрос заново.`);
            questionNumber = 0;
            return false;
        }
    }
    questionNumber = 0;
    return answerOptionArray;
}

function createRightAnswer() {
    let rightAnswer = prompt('Введите номера правильных ответов через запятую. Нумерация начинается с 1', '');
    if (rightAnswer) {
        let checkAnswer = checkRightAnswer(rightAnswer);
        if (checkAnswer) {
            return checkAnswer;
        }
        alert('Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.');
        return false;
    }
    alert('Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.')
    return false; 
}

function checkRightAnswer(rightAnswerString) {
    let correctAnswerNumbers = [];
    let userRightAnswerArray = rightAnswerString.split('')

    for (let i = 0; i < userRightAnswerArray.length; i = i + 2) {
        let numberAnswer = Number(userRightAnswerArray[i]);
        if (rightArray.includes(numberAnswer)) {
            if (correctAnswerNumbers.includes(numberAnswer)) {
                return false;
            }
            correctAnswerNumbers.push(numberAnswer)
        } else {
            return false;
        }
    }

    for (let i = 1; i < userRightAnswerArray.length; i = i + 2) {
        if (userRightAnswerArray[i] !== ',') {
            return false;
        }
    }
    if (userRightAnswerArray[userRightAnswerArray.length - 1] === ',') {
        return false;
    }

    return correctAnswerNumbers;
}

function createСompleteQuestion(questionText, answerOptionArray, correctAnswerNumbers) {
    answerOptionArray.push(correctAnswerNumbers)
    dictionaryOfQuestions[questionText] = answerOptionArray;
}

// START TEST

function createOptionCheckbox(numberQuestion, optionNumber) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let checkboxId = `${numberQuestion}${optionNumber + 1}`
    checkbox.id = checkboxId
    return checkbox;
}

function createLabelQuestion(question, numberQuestion) {
    let fullQuestion = `${numberQuestion}. ${question}`
    let labelQuestion = document.createElement("label");
    let textLabel = document.createTextNode(fullQuestion);
    labelQuestion.appendChild(textLabel);
    labelQuestion.className = "question-style";
    labelQuestion.id = numberQuestion;
    return labelQuestion;
}

function createlabelOption(optionArray) {
    let labelOption = document.createElement("label");
    let textLabel = document.createTextNode(optionArray);
    labelOption.appendChild(textLabel);
    return labelOption;
}

function createButton() {
    let button = document.createElement("button");
    let textLabel = document.createTextNode('Отправить');
    button.appendChild(textLabel);
    button.onclick = checkResult;
    return button;
}

function addButton() {
    let button = createButton();
    document.body.append(button)
}

function getInformationQuestion() {
    let numberQuestion = 1;
    for (let key in dictionaryOfQuestions) {
        let question = key;
        let optionArray = dictionaryOfQuestions[key];
        createOutputTask(question, optionArray, numberQuestion);
        numberQuestion++;
    }
    addButton();
}

function createOutputTask(question, optionArray, numberQuestion) {
    let labelQuestion = createLabelQuestion(question, numberQuestion);
    let ul = document.createElement("ul");
    document.body.append(labelQuestion)
    for (let i = 0; i < 4; i++) {
        let li = document.createElement("li");
        let labelOption = createlabelOption(optionArray[i]);
        let optionCheckbox = createOptionCheckbox(numberQuestion, i);
        li.append(optionCheckbox, labelOption)
        ul.append(li)
    }
    document.body.append(ul)
}

function disabledButton() {
    document.getElementById("addQuestionbutton").disabled = true;
    document.getElementById("startTestbutton").disabled = true;
}

// CHECK TEST RESULT

function getCheckboxResult() {
    let tracebackArray = []
    for (let numberQuestion = 1; numberQuestion <= Object.keys(dictionaryOfQuestions).length; numberQuestion++) {
        let generalStatus = []
        for (let optionNumber = 1; optionNumber <= 4; optionNumber++) {
            let checkboxId = `${numberQuestion}${optionNumber}`
            let checkbox = document.getElementById(checkboxId)
            if (checkbox.checked) {
                generalStatus.push(true)
            } else {
                generalStatus.push(false)
            }
        }
        if (!generalStatus.includes(true)) {
            alert('Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.')
            return false;
        }
        checkUserAnswer(numberQuestion, generalStatus, tracebackArray)
    }
    return countingTheResult(tracebackArray);
}

function checkUserAnswer(numberQuestion, generalStatus, tracebackArray) {
    let question = document.getElementById(numberQuestion).textContent
    questionFormated = question.slice(3, question.length)
    let answerArray = dictionaryOfQuestions[questionFormated][4]
    for (let i = 0; i < answerArray.length; i++) {
        if (generalStatus[answerArray[i] - 1]) {
            delete generalStatus[answerArray[i] - 1];
        } else {
            tracebackArray.push(question)
            return false;
        }
    }
    if (generalStatus.includes(true)) {
        tracebackArray.push(question)
        return false;
    }
}

function countingTheResult(tracebackArray) {
    let tracebackAlert = '';
    let maxFinalResult = Object.keys(dictionaryOfQuestions).length;
    let userFinalResult = maxFinalResult - tracebackArray.length;
    if (tracebackArray) {
        for (let i = 0; i < tracebackArray.length; i++) {
            tracebackAlert += `${tracebackArray[i]} \n `
        }
    }
    return [userFinalResult, tracebackAlert];
}

function outputResultTest(resultTest) {
    let [userFinalResult, tracebackAlert] = [resultTest[0], resultTest[1]];
    let maxFinalResult = Object.keys(dictionaryOfQuestions).length;
    if (tracebackAlert) {
        let alertTestFailed = `Вы не правильно ответили на вопросы: \n \n ${tracebackAlert} \nВаш результат ${userFinalResult} из ${maxFinalResult}`
        alert(alertTestFailed)
        return false;
    }
    alert(`Ваш результат ${userFinalResult} из ${maxFinalResult}. Вы молодец!`)
}

// MAIN PROGRAM

function startTest() {
    getInformationQuestion()
    disabledButton()
}

function mainAddQuestion() {
    let questionText = createQuestion();
    if (!questionText) {
        return false;
    }
    let answerOptionArray = createResponseOption();
    if (!answerOptionArray) {
        return false;
    }
    let correctAnswerNumbers = createRightAnswer();
    if (!correctAnswerNumbers) {
        return false;
    }
    createСompleteQuestion(questionText, answerOptionArray, correctAnswerNumbers);
}

function checkResult() {
    let resultTest = getCheckboxResult();
    if (resultTest) {
        outputResultTest(resultTest)
    }
}