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

const buttonStyle = "btn btn-primary"


// Alert

function allAlert(CCNumber, errorDictionary) {
    switch(CCNumber) {
        case 'CC1':
            alert("Вы не ввели текст вопроса. Попробуйте добавить вопрос заново.");
            break;
        case 'CC2':
            alert(`Вы не ввели текст ${errorDictionary.responseNumber} варианта ответа. Попробуйте добавить вопрос заново.`);
            break;
        case 'CC3':
            alert("Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново.");
            break;
        case 'CC4':
            alert("Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения.");
            break;
        case 'CC5':
            alert(`Ваш результат ${errorDictionary.userFinalResult} из ${errorDictionary.maxFinalResult}. Вы молодец!`);
            break;
        case 'CC6':
            alert("Поле может содержать только уникальные цифры 1, 2, 3, 4, разделенные запятой. Попробуйте добавить вопрос заново.");
            break;
        case 'CC7':
            alert(
                `Вы не правильно ответили на вопросы:
                \n${errorDictionary.tracebackAlert}\nВаш результат ${errorDictionary.userFinalResult} из ${errorDictionary.maxFinalResult}`
                 );
            break;
    }
}

// Add Question

function createQuestion() {
    let questionText = prompt('Введите текст вопроса', '');
    if (questionText) {
        return questionText;
    }
    allAlert('CC1');
    return false;
}

function createResponseOption() {
    let answerOptionArray = [];
    responseNumber = 0;
    while (responseNumber++ < 4) {
        let answerOptionText = prompt(`Введите текст ${responseNumber} варинта ответа`, '');
        if (answerOptionText) {
            answerOptionArray.push(answerOptionText);
        } else {
            let errorDictionary = {
                "responseNumber": responseNumber
            }
            allAlert('CC2', errorDictionary)
            return false;
        }
    }
    return answerOptionArray;
}

function createRightAnswer() {
    let rightAnswer = prompt('Введите номера правильных ответов через запятую. Нумерация начинается с 1', '');
    if (rightAnswer) {
        let checkAnswer = checkRightAnswer(rightAnswer);
        if (checkAnswer) {
            return checkAnswer;
        }
        allAlert('CC6');
        return false;
    }
    allAlert('CC3');
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

// Start Test

function createOptionCheckbox(numberQuestion, optionNumber) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let checkboxId = `${numberQuestion}${optionNumber + 1}`
    checkbox.id = checkboxId
    return checkbox;
}

function createTitleQuestion(question, numberQuestion) {
    let fullQuestion = `${numberQuestion}. ${question}`
    let labelQuestion = document.createElement("label");
    let textLabel = document.createTextNode(fullQuestion);
    labelQuestion.appendChild(textLabel);
    labelQuestion.className = "question-style";
    labelQuestion.id = numberQuestion;
    return labelQuestion;
}

function createTitleOption(optionArray) {
    let labelOption = document.createElement("label");
    let textLabel = document.createTextNode(optionArray);
    labelOption.appendChild(textLabel);
    return labelOption;
}


function createButton(label, onclick, id) {
    let button = document.createElement("button");
    let textLabel = document.createTextNode(label);
    button.appendChild(textLabel);
    button.className = buttonStyle;
    button.onclick = onclick;
    button.id = id;
    return button;
}

function addFinalButton() {
    let label = "Отправить"
    let onclick = checkResult
    let id = "checkResult"
    let button = createButton(label, onclick, id);
    document.body.append(button)
}

function getQuestionFromDictionary() {
    let numberQuestion = 1;
    for (let key in dictionaryOfQuestions) {
        let question = key;
        let optionArray = dictionaryOfQuestions[key];
        createOutputTask(question, optionArray, numberQuestion);
        numberQuestion++;
    }
}

function createOutputTask(question, optionArray, numberQuestion) {
    let labelQuestion = createTitleQuestion(question, numberQuestion);
    let ul = document.createElement("ul");
    document.body.append(labelQuestion)
    for (let i = 0; i < 4; i++) {
        let li = document.createElement("li");
        let labelOption = createTitleOption(optionArray[i]);
        let optionCheckbox = createOptionCheckbox(numberQuestion, i);
        li.append(optionCheckbox, labelOption)
        ul.append(li)
    }
    document.body.append(ul)
}

function disabledButton() {
    document.getElementById("mainAddQuestion").disabled = true;
    document.getElementById("startTest").disabled = true;
}

// Check Test Result

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
            allAlert('CC4')
            return false;
        }
        checkUserAnswer(numberQuestion, generalStatus, tracebackArray)
    }
    return formingTheResult(tracebackArray);
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

function formingTheResult(tracebackArray) {
    let tracebackAlert = '';
    let maxFinalResult = Object.keys(dictionaryOfQuestions).length;
    let userFinalResult = maxFinalResult - tracebackArray.length;
    if (tracebackArray) {
        for (let i = 0; i < tracebackArray.length; i++) {
            tracebackAlert += `${tracebackArray[i]} \n`
        }
    }
    return [userFinalResult, tracebackAlert];
}

function outputResultTest(resultTest) {
    let [userFinalResult, tracebackAlert] = [resultTest[0], resultTest[1]];
    let maxFinalResult = Object.keys(dictionaryOfQuestions).length;
    if (tracebackAlert) {
        let errorDictionary = {
            "tracebackAlert": tracebackAlert,
            "userFinalResult": userFinalResult,
            "maxFinalResult": maxFinalResult
        }
        allAlert('CC7', errorDictionary)
        return false;
    }
    let errorDictionary = {
        "userFinalResult": userFinalResult,
        "maxFinalResult": maxFinalResult
    }
    allAlert('CC5', errorDictionary)
}

// Main Program

function startTest() {
    getQuestionFromDictionary()
    disabledButton()
    addFinalButton();
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

function startHtml() {
    let label = "Добавить вопрос"
    let onclick = mainAddQuestion
    let id = "mainAddQuestion"
    let buttonAddQuestion = createButton(label, onclick, id)

    label = "Начать тест"
    onclick = startTest
    id = "startTest"
    let buttonBeginTest = createButton(label, onclick, id)
    let br = document.createElement("br");

    document.body.append(buttonAddQuestion, buttonBeginTest, br)
}

startHtml()