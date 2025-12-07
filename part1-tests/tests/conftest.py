import pytest
from selenium import webdriver


@pytest.fixture(scope="session")
def driver():
    """Setup headless Chrome driver for the entire test session"""
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
    options.add_argument("--start-maximized")
    
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(15)
    driver.implicitly_wait(5)
    
    yield driver
    driver.quit()


@pytest.fixture
def base_url():
    """Base URL of the application"""
    return "http://localhost:5173"  # Change this to your app's actual URL
