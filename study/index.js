/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// 获取上级目录的package.json文件路径
const packageJsonPath = path.join(__dirname, '../package.json');

// 读取package.json文件
const packageJson = require(packageJsonPath);

// 获取dependencies和devDependencies字段
const dependencies = packageJson.dependencies;
const devDependencies = packageJson.devDependencies;

fetch('https://run.dingjunjie.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer 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',
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'user',
        content: `以下文件node包分别什么作用:[${JSON.stringify(
          dependencies,
        )},${JSON.stringify(devDependencies)}]`,
      },
    ],
  }),
})
  .then((response) => response.json())
  .then((res) => console.log(res.choices[0].message.content));
