#!/usr/bin/env node

import {createReadStream, createWriteStream} from 'node:fs';
import {mkdir, readFile} from 'node:fs/promises';
import {dirname} from 'node:path';
import {createInterface} from 'node:readline';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import chalk from 'chalk';
import got from 'got';
import {createOffer} from './helpers/create-offer.js';
import {generateOffer} from './helpers/generate-offer.js';
import {offerToTsv} from './helpers/offer-to-tsv.js';
import {MockOffer} from './types/mock-offer.type.js';

const HELP_TEXT = `
Программа для подготовки данных для REST API сервера.

Пример: npm run cli -- --<command> [--arguments]

Команды:
  --version                     выводит номер версии
  --help                        печатает этот текст
  --import <path>               импортирует данные из TSV
  --generate <n> <path> <url>   генерирует произвольное количество тестовых данных
`;

async function showVersion(): Promise<void> {
  const packagePath = new URL('../package.json', import.meta.url);
  const packageContent = await readFile(packagePath, 'utf-8');
  const packageData = JSON.parse(packageContent) as {version: string};

  console.log(chalk.green(packageData.version));
}

async function importOffers(filePath: string | undefined): Promise<void> {
  if (!filePath) {
    throw new Error('Укажите путь к TSV-файлу после команды --import.');
  }

  const fileStream = createReadStream(filePath, {encoding: 'utf-8'});
  const lines = createInterface({input: fileStream, crlfDelay: Infinity});
  let importedOffers = 0;

  for await (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    const offer = createOffer(line);
    importedOffers++;
    console.log(chalk.cyan(`Предложение №${importedOffers}: ${offer.title} (${offer.city.name})`));
  }

  console.log(chalk.green(`Импорт завершён. Загружено предложений: ${importedOffers}.`));
}

async function generateOffers(
  countText: string | undefined,
  filePath: string | undefined,
  url: string | undefined
): Promise<void> {
  const count = Number(countText);

  if (!countText || !Number.isSafeInteger(count) || count < 1 || !filePath || !url) {
    throw new Error('Использование: --generate <n> <filepath> <url>. n должно быть целым положительным числом.');
  }

  const templates = await got.get(url).json<MockOffer[]>();

  if (!Array.isArray(templates) || templates.length === 0) {
    throw new Error('JSON-сервис должен вернуть непустой список заготовок.');
  }

  await mkdir(dirname(filePath), {recursive: true});

  function* offerLines(): Generator<string> {
    for (let index = 0; index < count; index++) {
      yield `${offerToTsv(generateOffer(templates))}\n`;
    }
  }

  await pipeline(Readable.from(offerLines()), createWriteStream(filePath, {encoding: 'utf-8'}));
  console.log(chalk.green(`Создан файл ${filePath}. Предложений: ${count}.`));
}

async function run(): Promise<void> {
  const [command, ...commandArguments] = process.argv.slice(2);

  switch (command) {
    case undefined:
    case '--help':
      console.log(chalk.blue(HELP_TEXT));
      break;
    case '--version':
      await showVersion();
      break;
    case '--import':
      await importOffers(commandArguments[0]);
      break;
    case '--generate':
      await generateOffers(commandArguments[0], commandArguments[1], commandArguments[2]);
      break;
    default:
      console.log(chalk.red(`Неизвестная команда: ${command}`));
      console.log(chalk.blue(HELP_TEXT));
  }
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(chalk.red(`Ошибка: ${message}`));
  process.exitCode = 1;
});
