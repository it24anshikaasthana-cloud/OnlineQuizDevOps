/* =========================================================
   QUIZMASTER
   ONLINE QUIZ MANAGEMENT SYSTEM
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   LOGIN
   ========================================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document.getElementById(
                    "username"
                ).value.trim();


            const password =
                document.getElementById(
                    "password"
                ).value;


            const loginError =
                document.getElementById(
                    "loginError"
                );


            if (
                username === "admin" &&
                password === "admin123"
            ) {

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                localStorage.setItem(
                    "username",
                    username
                );


                window.location.href =
                    "dashboard.html";


            } else {

                if (loginError) {

                    loginError.textContent =
                        "Invalid username or password";
                }

            }

        }
    );
}


/* =========================================================
   DASHBOARD
   ========================================================= */

if (
    window.location.pathname.includes(
        "dashboard.html"
    )
) {

    if (
        localStorage.getItem(
            "loggedIn"
        ) !== "true"
    ) {

        window.location.href =
            "index.html";
    }


    /* Username */

    const usernameElement =
        document.getElementById(
            "dashboardUsername"
        );


    if (usernameElement) {

        usernameElement.textContent =
            localStorage.getItem(
                "username"
            ) || "Student";
    }


    /* Scores */

    const currentScore =
        Number(
            localStorage.getItem(
                "quizScore"
            )
        ) || 0;


    const bestScore =
        Number(
            localStorage.getItem(
                "bestScore"
            )
        ) || 0;


    const dashboardScore =
        document.getElementById(
            "dashboardScore"
        );


    const bestScoreElement =
        document.getElementById(
            "bestScore"
        );


    const heroBestScore =
        document.getElementById(
            "heroBestScore"
        );


    const lastScoreElement =
        document.getElementById(
            "lastScore"
        );


    if (dashboardScore) {

        dashboardScore.textContent =
            currentScore + "/100";
    }


    if (bestScoreElement) {

        bestScoreElement.textContent =
            bestScore + "/100";
    }


    if (heroBestScore) {

        heroBestScore.textContent =
            bestScore + "/100";
    }


    if (lastScoreElement) {

        lastScoreElement.textContent =
            currentScore + "/100";
    }


    /* Status */

    const resultStatus =
        document.getElementById(
            "resultStatus"
        );


    if (resultStatus) {

        if (
            localStorage.getItem(
                "quizCompleted"
            ) === "true"
        ) {

            resultStatus.textContent =
                currentScore >= 40
                    ? "Passed"
                    : "Failed";

        } else {

            resultStatus.textContent =
                "Not Attempted";
        }
    }


    /* =====================================================
       SEARCH
       ===================================================== */

    const searchInput =
        document.getElementById(
            "quizSearch"
        );


    const quizCards =
        document.querySelectorAll(
            ".quiz-card"
        );


    const noQuiz =
        document.getElementById(
            "noQuiz"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchText =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                let visibleCards = 0;


                quizCards.forEach(
                    function (card) {

                        const quizName =
                            card.dataset.name ||
                            card.textContent;


                        if (
                            quizName
                                .toLowerCase()
                                .includes(
                                    searchText
                                )
                        ) {

                            card.style.display =
                                "";

                            visibleCards++;

                        } else {

                            card.style.display =
                                "none";
                        }

                    }
                );


                if (noQuiz) {

                    noQuiz.style.display =
                        visibleCards === 0
                            ? "block"
                            : "none";
                }

            }
        );
    }

}


/* =========================================================
   START QUIZ
   ========================================================= */

function startQuiz(
    quizType
) {

    localStorage.setItem(
        "selectedQuiz",
        quizType
    );


    localStorage.removeItem(
        "quizScore"
    );


    localStorage.removeItem(
        "correctAnswers"
    );


    localStorage.removeItem(
        "wrongAnswers"
    );


    localStorage.removeItem(
        "quizCompleted"
    );


    window.location.href =
        "quiz.html";
}


/* =========================================================
   QUIZ DATABASE
   ========================================================= */

const quizData = {


    /* =====================================================
       JAVA
       ===================================================== */

    java: {

        title:
            "Java Programming",

        description:
            "Test your knowledge of Java fundamentals and programming.",

        questions: [

            {
                question:
                    "Which programming language is used for Android development and enterprise applications?",

                options: [
                    "Java",
                    "HTML",
                    "CSS",
                    "SQL"
                ],

                answer:
                    "Java"
            },


            {
                question:
                    "Which keyword is used to define a class in Java?",

                options: [
                    "class",
                    "struct",
                    "define",
                    "object"
                ],

                answer:
                    "class"
            },


            {
                question:
                    "Which method is the entry point of a Java application?",

                options: [
                    "start()",
                    "main()",
                    "run()",
                    "execute()"
                ],

                answer:
                    "main"
            },


            {
                question:
                    "Which of the following is a non-primitive data type in Java?",

                options: [
                    "int",
                    "char",
                    "boolean",
                    "String"
                ],

                answer:
                    "String"
            },


            {
                question:
                    "Which keyword is used for inheritance in Java?",

                options: [
                    "implements",
                    "inherits",
                    "extends",
                    "super"
                ],

                answer:
                    "extends"
            },


            {
                question:
                    "Which Java collection does not allow duplicate elements?",

                options: [
                    "List",
                    "Set",
                    "ArrayList",
                    "Vector"
                ],

                answer:
                    "Set"
            },


            {
                question:
                    "Which symbol is used for a single-line comment in Java?",

                options: [
                    "//",
                    "/*",
                    "#",
                    "<!--"
                ],

                answer:
                    "//"
            },


            {
                question:
                    "Which tool is commonly used for Continuous Integration in DevOps?",

                options: [
                    "Jenkins",
                    "Photoshop",
                    "MySQL",
                    "Firefox"
                ],

                answer:
                    "Jenkins"
            },


            {
                question:
                    "Which technology is used to package applications into containers?",

                options: [
                    "Docker",
                    "HTML",
                    "Git",
                    "JDBC"
                ],

                answer:
                    "Docker"
            },


            {
                question:
                    "Which keyword is used to create an object in Java?",

                options: [
                    "object",
                    "create",
                    "new",
                    "make"
                ],

                answer:
                    "new"
            }

        ]

    },


    /* =====================================================
       C++
       ===================================================== */

    cpp: {

        title:
            "C++ Programming",

        description:
            "Practice C++ concepts, syntax and programming basics.",

        questions: [

            {
                question:
                    "Who developed the C++ programming language?",

                options: [
                    "Dennis Ritchie",
                    "Bjarne Stroustrup",
                    "James Gosling",
                    "Guido van Rossum"
                ],

                answer:
                    "Bjarne Stroustrup"
            },


            {
                question:
                    "Which symbol is used to end a statement in C++?",

                options: [
                    ".",
                    ";",
                    ":",
                    ","
                ],

                answer:
                    ";"
            },


            {
                question:
                    "Which function is the entry point of a C++ program?",

                options: [
                    "start()",
                    "main()",
                    "run()",
                    "begin()"
                ],

                answer:
                    "main()"
            },


            {
                question:
                    "Which concept allows the same function name with different parameters?",

                options: [
                    "Inheritance",
                    "Overloading",
                    "Encapsulation",
                    "Abstraction"
                ],

                answer:
                    "Overloading"
            },


            {
                question:
                    "Which keyword is used to create an object dynamically?",

                options: [
                    "create",
                    "malloc",
                    "new",
                    "object"
                ],

                answer:
                    "new"
            },


            {
                question:
                    "Which feature of OOP hides internal implementation details?",

                options: [
                    "Encapsulation",
                    "Inheritance",
                    "Polymorphism",
                    "Compilation"
                ],

                answer:
                    "Encapsulation"
            },


            {
                question:
                    "Which operator is used to access members through a pointer?",

                options: [
                    ".",
                    "::",
                    "->",
                    "#"
                ],

                answer:
                    "->"
            },


            {
                question:
                    "Which header file is commonly used for input and output in C++?",

                options: [
                    "<iostream>",
                    "<stdio>",
                    "<input>",
                    "<stream>"
                ],

                answer:
                    "<iostream>"
            },


            {
                question:
                    "Which keyword is used to inherit a class in C++?",

                options: [
                    "extends",
                    "inherits",
                    "using",
                    ":"
                ],

                answer:
                    ":"
            },


            {
                question:
                    "Which of these is an OOP principle?",

                options: [
                    "Encapsulation",
                    "Compilation",
                    "Linking",
                    "Debugging"
                ],

                answer:
                    "Encapsulation"
            }

        ]

    },


    /* =====================================================
       HTML
       ===================================================== */

    html: {

        title:
            "HTML Basics",

        description:
            "Test your understanding of HTML tags and web structure.",

        questions: [

            {
                question:
                    "What does HTML stand for?",

                options: [
                    "Hyper Text Markup Language",
                    "High Text Machine Language",
                    "Hyperlink Text Management Language",
                    "Home Tool Markup Language"
                ],

                answer:
                    "Hyper Text Markup Language"
            },


            {
                question:
                    "Which tag is used for the largest heading?",

                options: [
                    "<h1>",
                    "<h6>",
                    "<head>",
                    "<heading>"
                ],

                answer:
                    "<h1>"
            },


            {
                question:
                    "Which tag is used to create a hyperlink?",

                options: [
                    "<link>",
                    "<a>",
                    "<href>",
                    "<url>"
                ],

                answer:
                    "<a>"
            },


            {
                question:
                    "Which tag is used to insert an image?",

                options: [
                    "<image>",
                    "<img>",
                    "<picture>",
                    "<src>"
                ],

                answer:
                    "<img>"
            },


            {
                question:
                    "Which tag creates an unordered list?",

                options: [
                    "<ol>",
                    "<ul>",
                    "<li>",
                    "<list>"
                ],

                answer:
                    "<ul>"
            },


            {
                question:
                    "Which attribute provides alternative text for an image?",

                options: [
                    "src",
                    "alt",
                    "href",
                    "title"
                ],

                answer:
                    "alt"
            },


            {
                question:
                    "Which HTML tag is used to create a paragraph?",

                options: [
                    "<para>",
                    "<p>",
                    "<paragraph>",
                    "<text>"
                ],

                answer:
                    "<p>"
            },


            {
                question:
                    "Which tag is used to create a form?",

                options: [
                    "<input>",
                    "<form>",
                    "<field>",
                    "<submit>"
                ],

                answer:
                    "<form>"
            },


            {
                question:
                    "Which tag is used to create a table row?",

                options: [
                    "<td>",
                    "<th>",
                    "<tr>",
                    "<table-row>"
                ],

                answer:
                    "<tr>"
            },


            {
                question:
                    "Which tag contains metadata and links to stylesheets?",

                options: [
                    "<body>",
                    "<head>",
                    "<main>",
                    "<meta>"
                ],

                answer:
                    "<head>"
            }

        ]

    },


    /* =====================================================
       CSS
       ===================================================== */

    css: {

        title:
            "CSS Fundamentals",

        description:
            "Test your knowledge of CSS styling, selectors and layouts.",

        questions: [

            {
                question:
                    "What does CSS stand for?",

                options: [
                    "Cascading Style Sheets",
                    "Computer Style System",
                    "Creative Style Syntax",
                    "Colorful Style Sheets"
                ],

                answer:
                    "Cascading Style Sheets"
            },


            {
                question:
                    "Which property changes text color?",

                options: [
                    "font-color",
                    "text-color",
                    "color",
                    "foreground"
                ],

                answer:
                    "color"
            },


            {
                question:
                    "Which property changes the background color?",

                options: [
                    "background-color",
                    "bgcolor",
                    "color-background",
                    "background"
                ],

                answer:
                    "background-color"
            },


            {
                question:
                    "Which symbol is used to select an element by ID?",

                options: [
                    ".",
                    "#",
                    "*",
                    "@"
                ],

                answer:
                    "#"
            },


            {
                question:
                    "Which symbol is used for a class selector?",

                options: [
                    "#",
                    ".",
                    "*",
                    "$"
                ],

                answer:
                    "."
            },


            {
                question:
                    "Which property is used to change font size?",

                options: [
                    "font-style",
                    "font-size",
                    "text-size",
                    "size"
                ],

                answer:
                    "font-size"
            },


            {
                question:
                    "Which CSS property controls the space inside an element?",

                options: [
                    "margin",
                    "padding",
                    "spacing",
                    "border"
                ],

                answer:
                    "padding"
            },


            {
                question:
                    "Which CSS layout system is useful for one-dimensional layouts?",

                options: [
                    "Flexbox",
                    "Table",
                    "Float",
                    "Position"
                ],

                answer:
                    "Flexbox"
            },


            {
                question:
                    "Which property makes an element's corners rounded?",

                options: [
                    "corner-radius",
                    "border-radius",
                    "radius",
                    "round-border"
                ],

                answer:
                    "border-radius"
            },


            {
                question:
                    "Which property is used to make text bold?",

                options: [
                    "font-weight",
                    "text-bold",
                    "font-bold",
                    "weight"
                ],

                answer:
                    "font-weight"
            }

        ]

    },


    /* =====================================================
       FINANCIAL LITERACY
       ===================================================== */

    finance: {

        title:
            "Financial Literacy",

        description:
            "Learn about savings, budgeting, banking and personal finance.",

        questions: [

            {
                question:
                    "What is a budget?",

                options: [
                    "A plan for income and expenses",
                    "A type of loan",
                    "A bank account",
                    "A credit card"
                ],

                answer:
                    "A plan for income and expenses"
            },


            {
                question:
                    "What is saving?",

                options: [
                    "Spending all income",
                    "Setting aside money for future use",
                    "Borrowing money",
                    "Paying taxes"
                ],

                answer:
                    "Setting aside money for future use"
            },


            {
                question:
                    "What does ATM stand for?",

                options: [
                    "Automatic Transfer Machine",
                    "Automated Teller Machine",
                    "Account Transfer Method",
                    "Automatic Transaction Manager"
                ],

                answer:
                    "Automated Teller Machine"
            },


            {
                question:
                    "What is interest?",

                options: [
                    "A bank password",
                    "Money earned or paid on money",
                    "A type of tax",
                    "A shopping discount"
                ],

                answer:
                    "Money earned or paid on money"
            },


            {
                question:
                    "What is a loan?",

                options: [
                    "Money borrowed that is generally repaid",
                    "Free money",
                    "A savings account",
                    "A tax refund"
                ],

                answer:
                    "Money borrowed that is generally repaid"
            },


            {
                question:
                    "What is a credit score used for?",

                options: [
                    "Measuring temperature",
                    "Assessing creditworthiness",
                    "Calculating salary",
                    "Checking bank balance"
                ],

                answer:
                    "Assessing creditworthiness"
            },


            {
                question:
                    "What is an emergency fund?",

                options: [
                    "Money set aside for unexpected expenses",
                    "Money used only for shopping",
                    "A type of credit card",
                    "A tax account"
                ],

                answer:
                    "Money set aside for unexpected expenses"
            },


            {
                question:
                    "What is inflation?",

                options: [
                    "A decrease in all prices",
                    "A general rise in prices over time",
                    "A bank transfer",
                    "A type of investment"
                ],

                answer:
                    "A general rise in prices over time"
            },


            {
                question:
                    "Which is generally considered a good budgeting practice?",

                options: [
                    "Track income and expenses",
                    "Ignore expenses",
                    "Spend before saving",
                    "Borrow for every purchase"
                ],

                answer:
                    "Track income and expenses"
            },


            {
                question:
                    "What is diversification in investing?",

                options: [
                    "Putting all money in one asset",
                    "Spreading investments across different assets",
                    "Avoiding all savings",
                    "Borrowing money to invest"
                ],

                answer:
                    "Spreading investments across different assets"
            }

        ]

    }

};


/* =========================================================
   QUIZ PAGE
   ========================================================= */

const submitQuiz =
    document.getElementById(
        "submitQuiz"
    );


if (submitQuiz) {


    /* Check login */

    if (
        localStorage.getItem(
            "loggedIn"
        ) !== "true"
    ) {

        window.location.href =
            "index.html";
    }


    /* Selected Quiz */

    const selectedQuiz =
        localStorage.getItem(
            "selectedQuiz"
        ) || "java";


    const quiz =
        quizData[selectedQuiz] ||
        quizData.java;


    /* Quiz title */

    const quizTitle =
        document.getElementById(
            "quizTitle"
        );


    const quizHeading =
        document.getElementById(
            "quizHeading"
        );


    const quizDescription =
        document.getElementById(
            "quizDescription"
        );


    if (quizTitle) {

        quizTitle.textContent =
            quiz.title;
    }


    if (quizHeading) {

        quizHeading.textContent =
            quiz.title;
    }


    if (quizDescription) {

        quizDescription.textContent =
            quiz.description;
    }


    /* =====================================================
       GENERATE QUESTIONS
       ===================================================== */

    const questionsContainer =
        document.getElementById(
            "questionsContainer"
        );


    if (questionsContainer) {

        questionsContainer.innerHTML = "";


        quiz.questions.forEach(
            function (item, index) {

                const questionNumber =
                    index + 1;


                const questionCard =
                    document.createElement(
                        "div"
                    );


                questionCard.className =
                    "question-card";


                let optionsHTML = "";


                item.options.forEach(
                    function (option, optionIndex) {

                        optionsHTML += `

                            <label class="option">

                                <input
                                    type="radio"
                                    name="q${questionNumber}"
                                    value="${escapeHTML(option)}"
                                >

                                ${escapeHTML(option)}

                            </label>

                        `;

                    }
                );


                questionCard.innerHTML = `

                    <h3>
                        Q${questionNumber}.
                        ${escapeHTML(item.question)}
                    </h3>

                    ${optionsHTML}

                `;


                questionsContainer.appendChild(
                    questionCard
                );

            }
        );

    }


    /* =====================================================
       SUBMIT QUIZ
       ===================================================== */

    submitQuiz.addEventListener(
        "click",
        function () {

            let score = 0;

            let correct = 0;

            let wrong = 0;


            quiz.questions.forEach(
                function (item, index) {

                    const questionNumber =
                        index + 1;


                    const selected =
                        document.querySelector(
                            `input[name="q${questionNumber}"]:checked`
                        );


                    if (
                        selected &&
                        selected.value ===
                        item.answer
                    ) {

                        score += 10;

                        correct++;

                    } else {

                        wrong++;
                    }

                }
            );


            /* Save */

            localStorage.setItem(
                "quizScore",
                score
            );


            localStorage.setItem(
                "correctAnswers",
                correct
            );


            localStorage.setItem(
                "wrongAnswers",
                wrong
            );


            localStorage.setItem(
                "quizCompleted",
                "true"
            );


            localStorage.setItem(
                "completedQuiz",
                quiz.title
            );


            /* Best Score */

            const oldBest =
                Number(
                    localStorage.getItem(
                        "bestScore"
                    )
                ) || 0;


            if (
                score > oldBest
            ) {

                localStorage.setItem(
                    "bestScore",
                    score
                );
            }


            window.location.href =
                "result.html";

        }
    );


    /* =====================================================
       TIMER
       ===================================================== */

    let timeLeft = 300;


    const timer =
        document.getElementById(
            "timer"
        );


    const timerInterval =
        setInterval(
            function () {

                if (!timer) {

                    clearInterval(
                        timerInterval
                    );

                    return;
                }


                const minutes =
                    Math.floor(
                        timeLeft / 60
                    );


                const seconds =
                    timeLeft % 60;


                timer.textContent =
                    "⏱️ " +
                    minutes +
                    ":" +
                    String(seconds)
                        .padStart(
                            2,
                            "0"
                        );


                timeLeft--;


                if (
                    timeLeft < 0
                ) {

                    clearInterval(
                        timerInterval
                    );


                    alert(
                        "Time is over! Your quiz will be submitted."
                    );


                    submitQuiz.click();
                }

            },
            1000
        );

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   RESULT PAGE
   ========================================================= */

if (
    window.location.pathname.includes(
        "result.html"
    )
) {

    const score =
        Number(
            localStorage.getItem(
                "quizScore"
            )
        ) || 0;


    const correct =
        Number(
            localStorage.getItem(
                "correctAnswers"
            )
        ) || 0;


    const wrong =
        Number(
            localStorage.getItem(
                "wrongAnswers"
            )
        ) || 0;


    const completedQuiz =
        localStorage.getItem(
            "completedQuiz"
        ) || "Quiz";


    const scoreElement =
        document.getElementById(
            "score"
        );


    const correctElement =
        document.getElementById(
            "correctAnswers"
        );


    const wrongElement =
        document.getElementById(
            "wrongAnswers"
        );


    const statusElement =
        document.getElementById(
            "resultStatus"
        );


    const progress =
        document.getElementById(
            "scoreProgress"
        );


    if (scoreElement) {

        scoreElement.textContent =
            "Your Score: " +
            score +
            " / 100";
    }


    if (correctElement) {

        correctElement.textContent =
            correct;
    }


    if (wrongElement) {

        wrongElement.textContent =
            wrong;
    }


    if (statusElement) {

        if (score >= 40) {

            statusElement.textContent =
                "PASSED";

            statusElement.className =
                "result-status passed";

        } else {

            statusElement.textContent =
                "FAILED";

            statusElement.className =
                "result-status failed";
        }
    }


    if (progress) {

        progress.style.width =
            score + "%";
    }


    /* Quiz name if element exists */

    const resultQuizName =
        document.getElementById(
            "resultQuizName"
        );


    if (resultQuizName) {

        resultQuizName.textContent =
            completedQuiz;
    }

}


/* =========================================================
   RETRY
   ========================================================= */

function retryQuiz() {

    window.location.href =
        "quiz.html";
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function goToDashboard() {

    window.location.href =
        "dashboard.html";
}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    localStorage.removeItem(
        "loggedIn"
    );

    localStorage.removeItem(
        "username"
    );

    localStorage.removeItem(
        "selectedQuiz"
    );

    localStorage.removeItem(
        "quizScore"
    );

    localStorage.removeItem(
        "correctAnswers"
    );

    localStorage.removeItem(
        "wrongAnswers"
    );

    localStorage.removeItem(
        "quizCompleted"
    );

    localStorage.removeItem(
        "bestScore"
    );

    localStorage.removeItem(
        "completedQuiz"
    );


    window.location.href =
        "index.html";
}


/* =========================================================
   LOGOUT BUTTONS
   ========================================================= */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logoutUser
    );
}


const dashboardLogout =
    document.getElementById(
        "dashboardLogout"
    );


if (dashboardLogout) {

    dashboardLogout.addEventListener(
        "click",
        logoutUser
    );
}


const logoutTop =
    document.getElementById(
        "logoutTop"
    );


if (logoutTop) {

    logoutTop.addEventListener(
        "click",
        logoutUser
    );
}