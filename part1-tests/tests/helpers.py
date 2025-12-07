from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def wait_for_toast(driver, selector=".toast-success", timeout=10):
    """
    Waits for a toast to appear and returns its text.
    Handles short-lived toasts by polling frequently.
    """
    end_time = time.time() + timeout
    while time.time() < end_time:
        try:
            el = driver.find_element(By.CSS_SELECTOR, selector)
            if el.is_displayed():
                return el.text
        except:
            pass
        time.sleep(0.2)  # poll frequently
    raise TimeoutError(f"Toast '{selector}' did not appear within {timeout} seconds.")

def wait_for_toast_xpath(driver, xpath, timeout=10):
    """
    Waits for a toast to appear using XPath and returns its text.
    Handles short-lived toasts by polling frequently.
    """
    end_time = time.time() + timeout
    while time.time() < end_time:
        try:
            el = driver.find_element(By.XPATH, xpath)
            if el.is_displayed():
                return el.text
        except:
            pass
        time.sleep(0.5)  # poll frequently
    raise TimeoutError(f"Toast at XPath '{xpath}' did not appear within {timeout} seconds.")


def wait_for(driver, selector, by=By.CSS_SELECTOR, timeout=10):
    """
    Wait until the element is present and visible in the DOM.
    Returns the WebElement.
    """
    return WebDriverWait(driver, timeout).until(
        EC.visibility_of_element_located((by, selector))
    )

def click_and_wait(driver, selector, by=By.CSS_SELECTOR, timeout=10, scroll_into_view=True):
    """
    Wait for an element to be visible, scroll to it if needed, and click safely.
    Returns the WebElement.
    """
    el = wait_for(driver, selector, by, timeout)
    
    if scroll_into_view:
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", el)
        time.sleep(0.3)  # small pause to ensure scrolling finishes
    
    # Try normal click first, fallback to JS click if intercepted
    try:
        el.click()
    except Exception:
        driver.execute_script("arguments[0].click();", el)
    
    return el
