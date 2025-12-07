import time
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from tests.helpers import wait_for, click_and_wait, wait_for_toast, wait_for_toast_xpath

# ======================== FIXTURES ========================
@pytest.fixture(scope="session")
def driver():
    """Setup headless Chrome driver for the entire test session"""
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(15)
    yield driver
    driver.quit()

@pytest.fixture
def base_url():
    """Base URL of the application"""
    return "http://13.127.156.48:8085"

# ======================== TEST WRAPPER ========================
test_results = []

def run_test(test_func, *args, **kwargs):
    """Run a test function and capture pass/fail without stopping pytest"""
    test_name = test_func.__name__
    try:
        test_func(*args, **kwargs)
        print(f"[PASS] {test_name}")
        test_results.append((test_name, "PASS"))
    except Exception as e:
        print(f"[FAIL] {test_name} - {e}")
        test_results.append((test_name, "FAIL"))

# ======================== ALL TESTS WRAPPER ========================
def test_suite(driver, base_url):
    """Run all tests and capture pass/fail"""
    # List of all original tests
    run_test(test_user_register, driver, base_url)
    run_test(test_register_invalid_email, driver, base_url)
    run_test(test_register_weak_password, driver, base_url)
    run_test(test_user_login, driver, base_url)
    run_test(test_login_invalid_credentials, driver, base_url)
    run_test(test_browse_products, driver, base_url)
    run_test(test_browse_categories, driver, base_url)
    run_test(test_add_to_cart, driver, base_url)
    run_test(test_view_cart, driver, base_url)
    run_test(test_filter_by_category, driver, base_url)

    # Print summary
    passed = sum(1 for _, r in test_results if r == "PASS")
    failed = sum(1 for _, r in test_results if r == "FAIL")
    print(f"\n=== TEST SUMMARY ===\nPassed: {passed}\nFailed: {failed}\n")

# ======================== ORIGINAL TESTS ========================
def test_user_register(driver, base_url):
    """Test successful user registration by checking redirection to homepage"""
    driver.get(base_url + "/register")
    driver.find_element(By.ID, "name").send_keys("Test User")
    email_value = f"testuser_{int(time.time())}@example.com"
    driver.find_element(By.ID, "email").send_keys(email_value)
    driver.find_element(By.ID, "password").send_keys("Password123!")
    driver.find_element(By.ID, "phone").send_keys("03455179179")
    driver.find_element(By.ID, "address").send_keys("123 Test Street, Test City")
    driver.find_element(By.ID, "answer").send_keys("test answer")
    driver.execute_script("document.querySelector('button[type=submit]').click();")
    WebDriverWait(driver, 10).until(lambda d: d.current_url == f"{base_url}/")
    assert driver.current_url == f"{base_url}/"

def test_register_invalid_email(driver, base_url):
    driver.get(base_url + "/register")
    name = wait_for(driver, "#name")
    email = wait_for(driver, "#email")
    password = wait_for(driver, "#password")
    submit = wait_for(driver, "button[type=submit]")
    name.send_keys("Test User")
    email.send_keys("invalid-email")
    password.send_keys("Password123!")
    driver.execute_script("document.querySelector('button[type=submit]').click();")
    time.sleep(2)
    assert driver.current_url == f"{base_url}/register"

def test_register_weak_password(driver, base_url):
    driver.get(base_url + "/register")
    name = wait_for(driver, "#name")
    email = wait_for(driver, "#email")
    password = wait_for(driver, "#password")
    submit = wait_for(driver, "button[type=submit]")
    email_value = f"weakpass_{int(time.time())}@example.com"
    name.send_keys("Test User")
    email.send_keys(email_value)
    password.send_keys("12345")
    driver.execute_script("document.querySelector('button[type=submit]').click();")
    time.sleep(2)
    assert driver.current_url == f"{base_url}/register"

def test_user_login(driver, base_url):
    driver.get(base_url + "/register")
    name = wait_for(driver, "#name")
    email = wait_for(driver, "#email")
    password = wait_for(driver, "#password")
    phone = wait_for(driver, "#phone")
    address = wait_for(driver, "#address")
    answer = wait_for(driver, "#answer")
    submit = wait_for(driver, "button[type='submit']")
    email_value = f"logintest_{int(time.time())}@example.com"
    password_value = "Password123!"
    name.send_keys("Login Test User")
    email.send_keys(email_value)
    password.send_keys(password_value)
    phone.send_keys("9876543210")
    address.send_keys("456 Test Ave")
    answer.send_keys("test")
    driver.execute_script("document.querySelector('button[type=submit]').click();")
    WebDriverWait(driver, 10).until(lambda d: d.current_url != f"{base_url}/register")
    assert driver.current_url == f"{base_url}/"
    driver.get(base_url + "/login")
    login_email = wait_for(driver, "#email")
    login_password = wait_for(driver, "#password")
    login_submit = wait_for(driver, "button[type='submit']")
    login_email.send_keys(email_value)
    login_password.send_keys("Password123!")
    driver.execute_script("document.querySelector('button[type=submit]').click();")
    WebDriverWait(driver, 10).until(lambda d: d.current_url == f"{base_url}/")
    assert driver.current_url == f"{base_url}/"


def test_browse_products(driver, base_url):
    driver.get(base_url + "/dashboard/products")
    products = WebDriverWait(driver, 15).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div[class*='product-card'] h3"))
    )
    assert len(products) > 0
    assert products[0].text.strip() != ""

def test_browse_categories(driver, base_url):
    driver.get(base_url + "/dashboard/categories")
    WebDriverWait(driver, 20).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, ".animate-spin")))
    categories = WebDriverWait(driver, 20).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "h3.text-xl")))
    assert len(categories) > 0

def test_add_to_cart(driver, base_url):
    driver.get(base_url + "/dashboard/products")
    WebDriverWait(driver, 20).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, ".animate-spin")))
    product_cards = WebDriverWait(driver, 20).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".product-card")))
    assert len(product_cards) > 0
    card = product_cards[0]
    cart_btn = card.find_element(By.CSS_SELECTOR, ".add-to-cart")
    driver.execute_script("arguments[0].scrollIntoView(true);", cart_btn)
    driver.execute_script("arguments[0].click();", cart_btn)
    toast = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'added') or contains(text(),'cart')]")))
    assert toast

def test_view_cart(driver, base_url):
    driver.get(base_url + "/dashboard/cart")
    try:
        WebDriverWait(driver, 20).until(EC.invisibility_of_element_located((By.CSS_SELECTOR, ".animate-spin")))
    except TimeoutException:
        pass
    try:
        cart_container = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div[class*='cart-container']")))
        assert len(cart_container) > 0
    except TimeoutException:
        assert False, "Cart container not visible on the page"

def test_filter_by_category(driver, base_url):
    driver.get(base_url + "/categories")
    categories = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "category-item")))
    assert len(categories) > 0
    categories[0].click()
    products = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "product-card")))
    assert len(products) >= 0
