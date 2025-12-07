FROM python:3.10-slim

# Install dependencies for Chrome + Selenium
RUN apt-get update && \
    apt-get install -y wget unzip xvfb libxi6 libxss1 libnss3 libasound2 default-jdk gnupg2 curl && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
