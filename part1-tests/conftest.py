import os
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller

BASE_URL = os.getenv("BASE_URL", "http://localhost:5173")

@pytest.fixture(scope="session")
def base_url():
    return BASE_URL

@pytest.fixture(scope="session")
def chrome_options():
    opts = Options()
    # headless Chrome required for Jenkins/EC2
    opts.add_argument("--headless=new")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--disable-gpu")
    opts.add_argument("--window-size=1920,1080")
    # optional: run without logging
    opts.add_argument("--log-level=3")
    return opts

@pytest.fixture(scope="function")
def driver(chrome_options):
    # ensure chromedriver matches installed Chrome
    chromedriver_autoinstaller.install()
    driver = webdriver.Chrome(options=chrome_options)
    yield driver
    driver.quit()
