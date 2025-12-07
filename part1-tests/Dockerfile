# part1-tests/Dockerfile
FROM python:3.10-slim

# Install dependencies for Chrome + Selenium
RUN apt-get update && \
    apt-get install -y wget unzip xvfb libxi6 default-jdk && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Python packages
RUN pip install --no-cache-dir pytest selenium

# Set working directory
WORKDIR /tests

# Copy test code into container
COPY . /tests

# Default command (optional)
CMD ["pytest", "tests", "--junitxml=/tests/results.xml", "-v"]
