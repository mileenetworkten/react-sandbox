# Challenge - input spamming prevention

git checkout challenge/react-input-spamming-prevention

Setup a function that will prevent the api call from being spammed as you type letters into the input field.

# How to change typescript to not fail compilation on errors

https://create-react-app.dev/docs/adding-custom-environment-variables/
https://create-react-app.dev/docs/advanced-configuration/#!

See below for macos:

```
# modify this in your package.json and make start script use the environment setting below
TSC_COMPILE_ON_ERROR=true && react-scripts start
```

in node projects use

```
tsc-watch --onCompilationComplete
```
