export const cmd = {
  img: (name = '', url = '') => `![${name}](${url})\n`,
  table: '\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n',
  link: (name = '', url = '') => `[${name}](${url})\n`,
  code: '\n```\ncode\n```\n',
  tab: '  ',
};

export const uploadRPC = '//127.0.0.1:8090/file-upload';
