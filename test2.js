const rightAnswers = [1, 2, 3, 4, ','];
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
} 

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

function createButton(label, onclick, id) {
    let button = document.createElement("button");
    let textLabel = document.createTextNode(label);
    button.appendChild(textLabel);
    button.onclick = onclick;
    button.id = id;
    return button;
}

function createOptionCheckbox(QuestionNumber, optionNumber) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `${QuestionNumber}${optionNumber}`
    return checkbox;
}

function createTitleQuestion(question, QuestionNumber) {
    let labelQuestion = document.createElement("h1");  // вопрос задаётся в h1
    let textLabel = document.createTextNode(`${QuestionNumber}. ${question}`);
    labelQuestion.appendChild(textLabel);
    labelQuestion.id = QuestionNumber;
    return labelQuestion;
}

function createTitleOption(optionArray) {
    let labelOption = document.createElement("p");  // вопрос задаётся в p
    let textLabel = document.createTextNode(optionArray);
    labelOption.appendChild(textLabel);
    return labelOption;
}

function createQuestion() {
    let questionText = prompt("Введите текст вопроса", "");
    if (questionText) {
        return questionText;
    } else {
        allAlert('CC1');
        return;
    } 
}

function createResponseOption() {
    let responseOptionsArray = [];
    let responseNumber = 0;
    while (responseNumber++ < 4) {
        let textOfResponseOption = prompt(`Введите текст ${responseNumber} варинта ответа`, "");
        if (textOfResponseOption) {
            responseOptionsArray.push(textOfResponseOption);
        } else {
            let errorDictionary = {
                "responseNumber": responseNumber
            }
            allAlert('CC2', errorDictionary)
            return;
        }
    }
    return responseOptionsArray;
}

function createRightAnswer() {
    let correctAnswers = prompt("Введите номера правильных ответов через запятую. Нумерация начинается с 1", "");
    if (correctAnswers) {
        let numbersOfCorrectOptions = validateRightAnswer(correctAnswers);
        if (numbersOfCorrectOptions) {
            return numbersOfCorrectOptions;
        } else {
            allAlert('CC6');
            return;
        }  
    } else {
        allAlert('CC3');
        return;
    }   
}

function validateRightAnswer(rightAnswerString) {
    let numbersOfCorrectOptions = [];
    let userRightAnswerArray = rightAnswerString.split('')

    if (userRightAnswerArray[userRightAnswerArray.length - 1] === rightAnswers[4]) {
        return;
    }
    for (let i = 1; i < userRightAnswerArray.length; i = i + 2) {
        if (userRightAnswerArray[i] !== rightAnswers[4]) {
            return;
        }
    }
    for (let i = 0; i < userRightAnswerArray.length; i = i + 2) {
        if (rightAnswers.includes(Number(userRightAnswerArray[i]))) {
            if (numbersOfCorrectOptions.includes(Number(userRightAnswerArray[i]))) {
                return;
            }
            numbersOfCorrectOptions.push(Number(userRightAnswerArray[i]))
        } else {
            return;
        }
    }
    return numbersOfCorrectOptions;
}

function getQuestionFromDictionary() {
    let QuestionNumber = 1;
    for (let key in dictionaryOfQuestions) {
        let question = key;
        let optionArray = dictionaryOfQuestions[key];
        createOutputTask(question, optionArray, QuestionNumber);
        QuestionNumber++;
    }
}

function createOutputTask(question, optionArray, QuestionNumber) {
    let titleQuestion = createTitleQuestion(question, QuestionNumber);
    //  labelQuestion.className = "question-style"; задание стилей
    let divQuestion = document.createElement("div"); // общий div для вариантов вопроса
    document.body.append(titleQuestion)
    for (let i = 0; i < 4; i++) {
        let divOption = document.createElement("div"); // div для кокретного варинта
        let titleOption = createTitleOption(optionArray[i]);
        let optionCheckbox = createOptionCheckbox(QuestionNumber, i+1);
        divOption.append(optionCheckbox, titleOption)
        divQuestion.append(divOption)
    }
    document.body.append(divQuestion)
}

function getCheckboxResult() {
    let feedback = []
    for (let questionNumber = 1; questionNumber <= Object.keys(dictionaryOfQuestions).length; questionNumber++) {
        let totalStatus = []
        for (let optionNumber = 1; optionNumber <= 4; optionNumber++) {
            let checkbox = document.getElementById(`${questionNumber}${optionNumber}`)
            if (checkbox.checked) {
                totalStatus.push(true)
            } else {
                totalStatus.push(false)
            }
        }
        if (!totalStatus.includes(true)) {
            allAlert('CC4')
            return;
        }
        checkUserAnswer(questionNumber, totalStatus, feedback)
    }
    return formingTheResult(feedback);
}

function checkUserAnswer(questionNumber, totalStatus, feedback) {
    let question = document.getElementById(questionNumber).textContent
    questionFormated = question.slice(3, question.length)
    let answerArray = dictionaryOfQuestions[questionFormated][4]
    for (let i = 0; i < answerArray.length; i++) {
        if (totalStatus[answerArray[i] - 1]) {
            delete totalStatus[answerArray[i] - 1];
        } else {
            feedback.push(question)
            return;
        }
    }
    if (totalStatus.includes(true)) {
        feedback.push(question)
        return;
    }
}

function formingTheResult(feedback) {
    let feedbackAlert = '';
    let maxFinalResult = Object.keys(dictionaryOfQuestions).length;
    let userFinalResult = maxFinalResult - feedback.length;
    if (feedback) {
        for (let i = 0; i < feedback.length; i++) {
            feedbackAlert += `${feedback[i]} \n `
        }
    }
    return [userFinalResult, feedbackAlert];
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
        return;
    } else {
        let errorDictionary = {
            "userFinalResult": userFinalResult,
            "maxFinalResult": maxFinalResult
        }
        allAlert('CC5', errorDictionary)
        return
    } 
}

function checkResult() {
    let resultTest = getCheckboxResult();
    if (resultTest) {
        outputResultTest(resultTest)
    }
}

function beginTest() {
    getQuestionFromDictionary()

    document.getElementById("mainAdd").disabled = true;
    document.getElementById("beginTest").disabled = true;

    let label = "Отправить"
    let onclick = checkResult
    let id = "checkResult"
    let button = createButton(label, onclick, id);
    document.body.append(button)
}

function mainAdd() {
    let questionText = createQuestion();
    if (!questionText) {
        return;
    }
    let responseOptionsArray = createResponseOption();
    if (!responseOptionsArray) {
        return;
    }
    let numbersOfCorrectOptions = createRightAnswer();
    if (!numbersOfCorrectOptions) {
        return;
    }
    responseOptionsArray.push(numbersOfCorrectOptions)
    dictionaryOfQuestions[questionText] = responseOptionsArray;
}

function startHtml() {
    let label = "Добавить вопрос"
    let onclick = mainAdd
    let id = "mainAdd"
    let buttonAddQuestion = createButton(label, onclick, id)
    label = "Начать тест"
    onclick = beginTest
    id = "beginTest"
    let buttonBeginTest = createButton(label, onclick, id)
    let br = document.createElement("br");
    document.body.append(buttonAddQuestion, buttonBeginTest, br)
}

startHtml()