
const colors = require('colors')

const { mv, rm, which, exec, sed } = require("shelljs")


const replace = require('replace-in-file');
const _prompt = require("prompt")

const _promptSchemaLibraryName = {
  properties: {
    library: {
      description: colors.cyan(
        "What do you want the library to be called? (use kebab-case)"
      ),
      pattern: /^[a-z]+(\-[a-z]+)*$/,
      type: "string",
      required: true,
      message:
        '"kebab-case" uses lowercase letters, and hyphens for any punctuation'
    }
  }
}

const _promptSchemaUsername = {
  properties: {
    username: {
      description: colors.cyan(
        "What is your Github username?"
      ),
      pattern: /^[a-z]+(\-[a-z]+)*$/,
      type: "string",
      required: true,
      message: 'type your username to replace the occurrence in this template'
    }
  }
}

_prompt.start()
_prompt.message = ""

const files = [
  '**/*.md',
  '**/*.json',
  '**/*.yml',
]

_prompt.get(_promptSchemaUsername, (err: any, res: any) => {
  if (err) {
    console.log(colors.red("Sorry, you'll need to type the library name"))
  }

  replace.sync({
    files,
    //Replacement to make (string or regex)
    from: /chaoyangnz/g,
    to: res.username,
  })
})

_prompt.get(_promptSchemaLibraryName, (err: any, res: any) => {
  if (err) {
    console.log(colors.red("Sorry, there was an error building the workspace :("))
    process.exit(1)
    return
  }

  replace.sync({
    files,
    //Replacement to make (string or regex)
    from: /node-library-template/g,
    to: res.library,
  })
})







