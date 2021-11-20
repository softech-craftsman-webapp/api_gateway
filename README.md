# Api Gateway

## How to start

### Step 1. Create an environment file
```
cp env.example .env
```

Note: You can change the default values in the .env file.

## Step 2. Install dependencies

### Via npm
```
npm install
```

### Via yarn
```
yarn install
```

## Step 3. Run the server

### Virtual environment (Production)
```
docker-compose up --build -d
```

### Basic (Development)
```
yarn build
```

```
yarn start
```