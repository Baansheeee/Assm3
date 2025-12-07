# E-Commerce Website Test Suite

This test suite contains 10 comprehensive test cases for the Shop Sphere e-commerce website using Selenium and headless Chrome.

## Test Cases Overview

1. **test_user_register** - Test successful user registration with valid credentials
2. **test_register_invalid_email** - Test registration fails with invalid email format
3. **test_register_weak_password** - Test registration fails with weak password
4. **test_user_login** - Test successful user login after registration
5. **test_login_invalid_credentials** - Test login fails with invalid credentials
6. **test_browse_products** - Test browsing products on products page
7. **test_search_products** - Test product search functionality
8. **test_add_to_cart** - Test adding a product to shopping cart
9. **test_view_cart** - Test viewing shopping cart page
10. **test_filter_by_category** - Test filtering products by category

## Setup Instructions

### Prerequisites
- Python 3.8+
- Chrome browser installed
- ChromeDriver (matching your Chrome version)

### Installation

1. **Install Python dependencies:**
```bash
pip install selenium pytest
```

2. **Download ChromeDriver:**
   - Download from: https://chromedriver.chromium.org/
   - Or install via package manager:
   ```bash
   # For Windows (if using Chocolatey)
   choco install chromedriver
   ```

3. **Update the base_url in conftest.py:**
   - Change `http://localhost:5173` to your actual application URL

### Directory Structure
```
tests/
├── conftest.py          # Pytest configuration and fixtures
├── helpers.py           # Helper functions for Selenium
└── test_ecommerce.py    # Main test suite
```

## Running the Tests

### Run all tests:
```bash
pytest tests/test_ecommerce.py -v
```

### Run specific test:
```bash
pytest tests/test_ecommerce.py::test_user_register -v
```

### Run with detailed output:
```bash
pytest tests/test_ecommerce.py -v -s
```

### Run with coverage report:
```bash
pip install pytest-cov
pytest tests/test_ecommerce.py --cov=tests --cov-report=html
```

### Run tests in parallel (faster execution):
```bash
pip install pytest-xdist
pytest tests/test_ecommerce.py -n auto
```

## Test Configuration

The tests use **headless Chrome** which means:
- No browser window opens during test execution
- Faster test execution
- Can run on CI/CD servers without display

### Headless Chrome Options Used:
- `--headless`: Run in headless mode
- `--no-sandbox`: Bypass sandbox security
- `--disable-dev-shm-usage`: Reduce memory usage
- `--disable-blink-features=AutomationControlled`: Hide automation signatures
- Custom user-agent: Bypass bot detection

## Important Notes

### Update CSS Selectors
The test cases use these CSS selectors. Update them in `test_ecommerce.py` if your HTML IDs are different:

**Registration Form:**
- `#register-name`
- `#register-email`
- `#register-password`
- `#register-phone`
- `#register-address`
- `#register-answer`
- `#register-submit`

**Login Form:**
- `#login-email`
- `#login-password`
- `#login-submit`

**Product Elements:**
- `.product-card`
- `#search-input`
- `#search-button`
- `#add-to-cart`
- `.cart-container`
- `.category-item`

**Notifications:**
- `.toast-success`
- `.toast-error`

### Environment Requirements
- Application must be running before tests execute
- API endpoints must be accessible
- Database must be in a clean state or handle test data appropriately

## Troubleshooting

### ChromeDriver Issues
```bash
# Check if chromedriver is in PATH
chromedriver --version

# If not found, provide explicit path in conftest.py:
driver = webdriver.Chrome('/path/to/chromedriver', options=options)
```

### Timeout Issues
- Increase timeout values in helper functions if your app is slow
- Adjust `set_page_load_timeout(15)` in conftest.py

### Element Not Found
- Verify CSS selectors match your HTML
- Use browser dev tools to inspect element IDs and classes
- Update selectors in test_ecommerce.py accordingly

### Test Data Issues
- Ensure database allows duplicate registrations or clean up between runs
- Consider adding test data cleanup fixtures

## CI/CD Integration

### GitHub Actions Example:
```yaml
name: Selenium Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.10'
      - name: Install dependencies
        run: |
          pip install selenium pytest
      - name: Run tests
        run: pytest tests/test_ecommerce.py -v
```

## Performance Tips

1. Use implicit waits (`driver.implicitly_wait()`)
2. Use explicit waits with `wait_for()` helper
3. Reuse driver instance across multiple tests (session scope)
4. Run tests in parallel with pytest-xdist

## Helper Functions

The `helpers.py` file provides two utility functions:

```python
def wait_for(driver, selector, by=By.CSS_SELECTOR, timeout=8):
    """Wait for an element to be present before returning"""
    return WebDriverWait(driver, timeout).until(
        EC.presence_of_element_located((by, selector))
    )

def click_and_wait(driver, selector, by=By.CSS_SELECTOR, timeout=8):
    """Click an element and return it"""
    el = wait_for(driver, selector, by, timeout)
    el.click()
    return el
```

Use these functions to prevent timing issues and flaky tests.

## Additional Resources

- Selenium Documentation: https://selenium-python.readthedocs.io/
- Pytest Documentation: https://docs.pytest.org/
- WebDriver Wait Conditions: https://selenium-python.readthedocs.io/api.html#selenium.webdriver.support.expected_conditions
