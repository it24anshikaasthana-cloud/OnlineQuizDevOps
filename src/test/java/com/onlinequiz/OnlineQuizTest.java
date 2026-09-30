package com.onlinequiz;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class OnlineQuizTest {

    private WebDriver driver;
    private WebDriverWait wait;

    private String baseUrl =
            System.getProperty(
                    "app.url",
                    "http://localhost:8081"
            );

    @BeforeEach
    void setUp() {

        ChromeOptions options = new ChromeOptions();

        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");

        driver = new ChromeDriver(options);

        wait = new WebDriverWait(
                driver,
                Duration.ofSeconds(10)
        );
    }

    @AfterEach
    void tearDown() {

        if (driver != null) {
            driver.quit();
        }
    }

    // ------------------------------------------------
    // TEST 1 - LOGIN
    // ------------------------------------------------

    @Test
    void testLogin() {

        driver.get(baseUrl + "/index.html");

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.id("username")
                )
        ).sendKeys("admin");

        driver.findElement(
                By.id("password")
        ).sendKeys("admin123");

        driver.findElement(
                By.id("loginButton")
        ).click();

        wait.until(
                ExpectedConditions.urlContains(
                        "dashboard.html"
                )
        );

        assertTrue(
                driver.getCurrentUrl()
                        .contains("dashboard.html")
        );
    }

    // ------------------------------------------------
    // TEST 2 - INVALID LOGIN
    // ------------------------------------------------

    @Test
    void testInvalidLogin() {

        driver.get(baseUrl + "/index.html");

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.id("username")
                )
        ).sendKeys("wrong");

        driver.findElement(
                By.id("password")
        ).sendKeys("wrong");

        driver.findElement(
                By.id("loginButton")
        ).click();

        String message =
                wait.until(
                        ExpectedConditions.visibilityOfElementLocated(
                                By.id("loginError")
                        )
                ).getText();

        assertTrue(
                message.contains(
                        "Invalid username"
                )
        );
    }

    // ------------------------------------------------
    // TEST 3 - DASHBOARD / QUIZ LIBRARY
    // ------------------------------------------------

    @Test
    void testQuizLibrary() {

        driver.get(
                baseUrl + "/index.html"
        );

        login();

        // Wait for dashboard
        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.id("quizGrid")
                )
        );

        // Check Java quiz
        WebElement javaQuiz =
                driver.findElement(
                        By.cssSelector(
                                ".quiz-card[data-name='Java Programming']"
                        )
                );

        assertTrue(
                javaQuiz.isDisplayed()
        );

        // Check C++ quiz
        WebElement cppQuiz =
                driver.findElement(
                        By.cssSelector(
                                ".quiz-card[data-name='C++ Programming']"
                        )
                );

        assertTrue(
                cppQuiz.isDisplayed()
        );

        // Check HTML quiz
        WebElement htmlQuiz =
                driver.findElement(
                        By.cssSelector(
                                ".quiz-card[data-name='HTML Basics']"
                        )
                );

        assertTrue(
                htmlQuiz.isDisplayed()
        );

        // Check CSS quiz
        WebElement cssQuiz =
                driver.findElement(
                        By.cssSelector(
                                ".quiz-card[data-name='CSS Fundamentals']"
                        )
                );

        assertTrue(
                cssQuiz.isDisplayed()
        );

        // Check Financial quiz
        WebElement financeQuiz =
                driver.findElement(
                        By.cssSelector(
                                ".quiz-card[data-name='Financial Literacy']"
                        )
                );

        assertTrue(
                financeQuiz.isDisplayed()
        );
    }

    // ------------------------------------------------
    // TEST 4 - LOGOUT
    // ------------------------------------------------

    @Test
    void testLogout() {

        driver.get(
                baseUrl + "/index.html"
        );

        login();

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.id("dashboardLogout")
                )
        );

        driver.findElement(
                By.id("dashboardLogout")
        ).click();

        wait.until(
                ExpectedConditions.urlContains(
                        "index.html"
                )
        );

        assertTrue(
                driver.getCurrentUrl()
                        .contains("index.html")
        );
    }

    // ------------------------------------------------
    // LOGIN HELPER
    // ------------------------------------------------

    private void login() {

        wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.id("username")
                )
        ).sendKeys("admin");

        driver.findElement(
                By.id("password")
        ).sendKeys("admin123");

        driver.findElement(
                By.id("loginButton")
        ).click();

        wait.until(
                ExpectedConditions.urlContains(
                        "dashboard.html"
                )
        );
    }
}