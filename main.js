const select = document.getElementById("cases");
const options = ["Родительный", "Дательный", "Винительный", "Творительный", "Предложный"];
const result = document.getElementById("result");

const vowels = ["а", "и", "е", "ё", "о", "у", "ы", "э", "ю", "я", "й", "ь"];
const twoLettersSuffixList = ["ия", "ие", "ка"];


/**
 * Список несклоняемых слов
 */
const indeclinableWords = ["жалюзи", "какао", "авокадо", "кенгуру"]; //пополните список


/**
 * Хранит окончания в разных падежах.
 * Окончание для слова в определенном падеже определяется 
 * по индексу из массива letters в "Именительном"
 */
const casesMap = {
    "Именительный": {
        "letters": ["no_letter", "о", "е", "а", "я", "й", "ия", "ие", "ь", "ка"],
        "help_question": "что? кого?"
    },
    "Родительный": {
        "letters": ["а", "а", "я", "ы", "и", "я", "и", "я", "и", "и"],
        "help_question": "чего? кого?"
    },
    "Дательный": {
        "letters": ["у", "у", "ю", "е", "е", "ю", "и", "ю", "и", "е"],
        "help_question": "чему? кому?"
    },
    "Винительный": {
        "letters": ["", "о", "е", "у", "ю", "я", "я", "е", "ь", "у"],
        "help_question": "что? кого?"
    },
    "Творительный": {
        "letters": ["ом", "ом", "ем", "ой", "ей", "ем", "ей", "ем", "ью", "ой"],
        "help_question": "чем? кем?"
    },
    "Предложный": {
        "letters": ["е", "е", "е", "е", "е", "е", "и", "и", "и", "е"],
        "help_question": "о чем? о ком?"
    }
};


/**
 * Наполняет элемент select падежами
 */
const fillCases = () => {
    for (let opt of options) {
        const el = document.createElement("option");
        el.text = opt;
        el.value = opt;
        select.add(el);
    }
};
fillCases();


/**
 * Создает обработчик события, который берет введенное слово 
 * и выбранный падеж - и передает в функцию склонения
 */
select.addEventListener('change', evt => {
    const selectedCase = evt.target.value;
    let word = document.getElementById("inputText").value;

    if (!word || !options.includes(selectedCase)) {
        result.innerHTML = "Введите текст и выберите падеж";
        result.setAttribute('style', 'color: red');
        return result;
    }

    if (indeclinableWords.includes(word)) {
        return setResult(`Слово '${word}' не склоняется`);
    }

    let twoLettersSuffix = word.slice(-2);
    if (twoLettersSuffixList.includes(twoLettersSuffix)) {
        word = word.slice(0, -1);
        return declineWord(word, selectedCase, twoLettersSuffix);
    }

    let oneLetterSuffix = word.slice(-1);
    if (!vowels.includes(oneLetterSuffix)) {
        oneLetterSuffix = "no_letter";
    } else {
        word = word.slice(0, -1);
    }
    return declineWord(word, selectedCase, oneLetterSuffix);
});


/**
 * Находит соответствующее окончание для слова в выбранном падеже
 */
const declineWord = (word, selectedCase, suffix) => {
    const lastLetterPosition = casesMap["Именительный"].letters.indexOf(suffix);
    word += casesMap[selectedCase].letters[lastLetterPosition];
    const helpQuestion = casesMap[selectedCase].help_question;
    setResult(`${helpQuestion} - ${word}`);
};


/**
 * Возвоащает результат на страницу
 */
const setResult = (text) => {
    result.innerHTML = text;
    result.setAttribute('style', '');
};