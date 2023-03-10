const DEFAULT_TYPE_ENUM = [
  'feat',
  'bug',
  'wip',
  'refactor',
  'doc',
  'build',
  'chore',
  'revert',
  'style',
  'test',
  'major',
];

module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // Тело коммита должно начинаться с пустой строки
    'body-leading-blank': [2, 'always'],

    // Нижний колонтитул коммита должен начинаться с пустой строки
    'footer-leading-blank': [2, 'always'],

    // Максимальная длина заголовка 90 символов
    'header-max-length': [2, 'always', 90],

    // Описание не может быть пустым
    'subject-empty': [2, 'never'],

    // Описание не должно заканчиваться '.'
    'subject-full-stop': [2, 'never', '.'],

    // Описание должно начинаться с большой буквы
    'subject-case': [2, 'always', 'sentence-case'],

    // Тип всегда только в нижнем регистре
    'type-case': [2, 'always', 'lower-case'],

    // Тип не может быть пустым
    'type-empty': [2, 'never'],

    // Перечислим все возможные варианты коммитов
    'type-enum': [2, 'always', DEFAULT_TYPE_ENUM],
  },
};
