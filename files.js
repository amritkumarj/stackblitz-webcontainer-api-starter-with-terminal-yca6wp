/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.js': {
    file: {
      contents: `
      import * as fs from 'fs';
      import * as path from 'path';
      import {unzip} from 'unzipit';
      
      async function unzipFile(zipFilePath, outputDir) {
          const zipBuffer = fs.readFileSync(zipFilePath);
      
          const {entries} = await unzip(zipBuffer);
      
          for (const [name, entry] of Object.entries(entries)) {
              const filePath = path.join("repo", name);
              const directory = path.dirname(filePath);
      
              // Ensure the directory exists
              if (!fs.existsSync(directory)) {
                  fs.mkdirSync(directory, { recursive: true });
              }
              const data = Buffer.from(await entry.arrayBuffer())
              fs.writeFileSync(filePath, data);
      
          }
      }
      
      unzipFile('repo.zip', 'output/directory');`,
    },
  },
  'package.json': {
    file: {
      contents: `
          {
            "name": "example-app",
            "type": "module",
            "dependencies": {
              "express": "latest",
              "nodemon": "latest"
              "unzipit": "latest",
            },
            "scripts": {
              "start": "nodemon index.js"
            }
          }`,
    },
  },
};
