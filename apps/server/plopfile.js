// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require("child_process");

module.exports = (plop) => {
  const validate = (value) => {
    if (!value) return "Не может быть пустым";
    const lower = value.charAt(0).toLowerCase() + value.slice(1);

    if (lower !== value) {
      return "Недопустимое название компонента, название модуля должно быть с маленькой буквы";
    }

    return true;
  };

  plop.addHelper("capitalize", function (input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  });

  plop.addHelper("lowercase", function (input) {
    return input.toLowerCase();
  });

  plop.setActionType("formatCode", function (answers, config) {
    const { name } = answers;
    const { path } = config;
    const realPaths = path.replace("{{name}}", name);

    try {
      execSync(`prettier --write "${realPaths}/**/*.ts"`);
      // execSync(`eslint "{${realPaths}}/**/*.ts" --fix`);
      return "code formatted";
    } catch (error) {
      throw new Error("Formatting skipped", error);
    }
  });

  plop.setGenerator("Создание module api", {
    description: "",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Имя компонента (например, my-module)",
        validate,
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/core/{{name}}/{{name}}.module.ts",
        templateFile: "template/apiModule/module.hbs",
      }, //
      {
        type: "add",
        path: "src/core/{{name}}/{{name}}.controller.ts",
        templateFile: "template/apiModule/controller.hbs",
      }, //
      {
        type: "add",
        path: "src/core/{{name}}/repository/{{name}}.repository.ts",
        templateFile: "template/apiModule/repository/repository.hbs",
      },
      {
        type: "add",
        path: "src/core/{{name}}/repository/index.ts",
        templateFile: "template/apiModule/repository/index.hbs",
      }, //
      {
        type: "add",
        path: "src/core/{{name}}/service/{{name}}.service.ts",
        templateFile: "template/apiModule/service/service.hbs",
      },
      {
        type: "add",
        path: "src/core/{{name}}/service/index.ts",
        templateFile: "template/apiModule/service/index.hbs",
      },
      {
        type: "formatCode",
        path: "src/core/{{name}}",
      },
    ],
  });
};
