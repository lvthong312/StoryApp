
## Example
Go to link below to see:
  [https://drive.google.com/drive/folders/1l_jplyD3XxnlDNEJPyRGfSEfwys0RIio?usp=sharing](https://drive.google.com/drive/folders/1l_jplyD3XxnlDNEJPyRGfSEfwys0RIio?usp=sharing)

# Guideline
First, you need to clone the project. To do so, you need to run these commands:

```sh
1. git clone https://github.com/lvthong312/StoryApp.git
```
```sh
2. cd StoryApp
```
The project Stucture like:
```sh

StoryApp
│
├── Client
│   └── PetProject
│       └── ...
└── Server
    └── ...
```
## Server - NodeJS
Go to the Server folder path:
you need to install the new dependencies in your NodeJS project. To do so, you need to run this command:
```sh
  1. cd Server
```
```sh
  2. npm install
```

```sh
  3. npm run dev
```

> [!Note]
> If you haven't set up the NodeJS environment before. Please see the documentation: [https://nodejs.org/en/learn/getting-started/how-to-install-nodejs](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

## Client - React Native
Then, you need to install the new dependencies in your React Native project. To do so, you need to run these commands:

```sh
1. cd Client && cd PetProject
```
```sh
2. npm install
```
### For IOS
```sh
1. cd ios && pod install && cd ..
```
```sh
2. npx react-native run-ios
```

### For Android
```sh
npx react-native run-android
```


> [!Note]
> If you haven't set up the React Native environment before. Please see the documentation: [https://reactnative.dev/docs/set-up-your-environment](https://reactnative.dev/docs/set-up-your-environment)







