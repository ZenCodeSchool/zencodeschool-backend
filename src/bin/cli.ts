#!/usr/bin/env ts-node
require('dotenv').config()

const { version } = require('../../package')

import { program } from 'commander'

import { start as server } from '../server'

import { start as actors } from '../rabbi/actors'

import { start as main } from '../main'

import { PrismaClient } from '@prisma/client';
import * as readline from 'readline';


program
  .version(version)
  .option('--config <path>')
  .option('--host <ipaddress>')
  .option('--port <integer>')
  .option('--prometheus_enabled <boolean>')
  .option('--amqp_enabled <boolean>')
  .option('--http_api_enabled <boolean>')
  .option('--swagger_enabled <boolean>')
  .option('--postgres_enabled <boolean>')
  .option('--database_url <connection_string>')
  .option('--amqp_url <connection_string>')
  .option('--amqp_exchange <name>')
  .option('--amqp_enabled <boolean>')

program
  .command('echo <statement>')
  .action((statement) => {

    console.log({ statement })

    process.exit(0)

  })

program
  .command('start')
  .action(() => {

    main()

  })

program
  .command('server')
  .action(() => {

    server()

  })

program
  .command('actors')
  .action(() => {

    actors()

  })

const prisma = new PrismaClient();

interface CourseInput {
  youtubeUrl: string;
  imgSrc: string;
  price: string;
  author: string;
  title: string;
  slug: string;
  lessons: number;
  students: number;
  desc: string;
  age: string;
  time: string;
  seat: number;
}

interface BlogInput {
  imgSrc: string;
  date: string | Date;
  title: string;
  author: string;
  category: string;
  desc: string;
  slug: string;
}

interface EventInput {
  imgSrc: string;
  youtubeUrl: string;
  dayDate: string;
  monthYear: string;
  location: string;
  startTime: string;
  endTime: string;
  participants?: number | string;
  skillLevel: string; // Assuming these are the possible skill levels
  title: string;
  slug: string;
}


async function importCourseList(data: CourseInput[]) {
  for (const course of data) {
    delete course['id']
    const result = await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
    // log result as json
    console.log({ result });
  }
}

async function importEventList(data: EventInput[]) {
  for (const event of data) {
    delete event['id']
    delete event['participants']
    const result = await prisma.event.upsert({
      where: { slug: event.slug },
      update: Object.create(event),
      create: Object.create(event),
    });
    // log result as json
    console.log({ result });
  }
}


async function importBlogList(data: BlogInput[]) {
  for (const blog of data) {
    delete blog['id']
    delete blog['comments']
    blog['date'] = new Date(blog['date'])
    const result = await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog,
    });
    // log result as json
    console.log({ result });
  }
}


import { courseList, blogList, eventList } from '../../data/Data'

program
.command('import-course-list')
.action(async () => {

  await importCourseList(courseList)

  process.exit(0)

})

program
.command('import-blog-list')
.action(async () => {

  await importBlogList(blogList)

  process.exit(0)

})


program
.command('import-event-list')
.action(async () => {

  await importEventList(eventList)

  process.exit(0)

})



program.parse(process.argv)
