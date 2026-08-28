import bannerImage from '@/assets/banner.jpg';
import backend from '@/assets/development.png';
import eCommerce from '@/assets/e-commerce.png';
import maintainance from '@/assets/maintainance.png';
import management from '@/assets/management.png';
import webdev from '@/assets/programming.png';
import deploy from '@/assets/startup.png';

import docker from '@/assets/docker.png';
import firebase from '@/assets/firebase.png';
import graphQl from '@/assets/graphQl.png';
import jest from '@/assets/jest.png';
import mongoose from '@/assets/Mongoose.png';
import next from '@/assets/next.png';
import node from '@/assets/node.png';
import oauth from '@/assets/oauth.svg';
import react from '@/assets/react.png';
import redux from '@/assets/redux.png';
import mySql from '@/assets/sql.png';
import tailwind from '@/assets/tailwind.png';
import typescript from '@/assets/typescript.png';
import stripe from '@/assets/stripe.png';
import nest from '@/assets/nest.png';
import express from '@/assets/express.png';
import mongodb from '@/assets/mongodb.png';
import postgreSQL from '@/assets/postgreSQL.png';
import restApi from '@/assets/restApi.png';
import prisma from '@/assets/prisma.png';
import aws from '@/assets/aws.png';
import langchain from '@/assets/langchain.png';
import rag from '@/assets/rag.png';
import pinecone from '@/assets/pinecone.png';
import ollama from '@/assets/ollama.png';
import openAi from '@/assets/openAi.jpeg';
import claude from '@/assets/claude.png';

import website1 from '@/assets/website1.png';
import website2 from '@/assets/website2.png';
// People
import man1 from '@/assets/man1.jpg';
import man2 from '@/assets/man2.jpg';
import man3 from '@/assets/man3.png';
import man4 from '@/assets/man4.png';
import man5 from '@/assets/man5.png';
import { IBlog } from '@/types';

const services = [
  {
    name: 'Web Development',
    icon: webdev,
    description:
      'Build responsive and dynamic websites using modern technologies like HTML, CSS, JavaScript, React, and Next.js. Ensure high performance, seamless user experience, and optimized designs for all devices.',
  },
  {
    name: 'Backend Development',
    icon: backend,
    description:
      'Design and implement robust backend systems using Node.js, Express, and databases like MongoDB or PostgreSQL. Create secure APIs and ensure smooth data handling for scalable applications.',
  },
  {
    name: 'Management Systems',
    icon: management,
    description:
      'Design and implement customized management systems tailored to diverse sectors such as hospitals, schools, clinics, real estate, and other industries. Ensure efficient workflow automation, data management, and seamless integration to enhance operational effectiveness.',
  },
  {
    name: 'E-Commerce Solutions',
    icon: eCommerce,
    description:
      'Develop custom e-commerce platforms integrated with payment gateways, inventory management, and user-friendly product navigation to streamline the shopping experience.',
  },
  {
    name: 'Web Maintenance',
    icon: maintainance,
    description:
      'Provide ongoing support and maintenance for websites, ensuring performance optimization, security updates, and adaptability to changing business needs.',
  },
  {
    name: 'Deployment & Hosting',
    icon: deploy,
    description:
      'Deploy applications on platforms like Vercel, Netlify, AWS, or Heroku. Optimize hosting solutions for reliable uptime and performance, ensuring seamless accessibility.',
  },
];

const skills = {
  frontend: [tailwind, react, typescript, next, redux],
  backend: [node, express, graphQl, jest, docker, stripe, nest],
  database: [mongodb, mongoose, postgreSQL, mySql, prisma, aws, firebase],
  ai: [ollama, openAi, pinecone, rag, claude, langchain],
};

const myWorks = [
  {
    photo: website1,
    name: 'School Management ERP',
    live: 'https://dm-academy.vercel.app',
    github: 'https://github.com/pmppiyas/EMS_School_Frontend',
    description:
      'A comprehensive school management system featuring student enrollment, attendance tracking, grade management, and real-time parent-teacher communication dashboard.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  },
  {
    photo: website2,
    name: 'E-Commerce Platform',
    live: 'https://shop-demo.vercel.app',
    github: 'https://github.com/username/ecommerce-platform',
    description:
      'Modern e-commerce solution with advanced product filtering, secure payment integration, real-time inventory management, and personalized user recommendations.',
    tags: ['React', 'Redux', 'Stripe', 'MongoDB', 'Express'],
  },
  {
    photo: website2,
    name: 'Real Estate Marketplace',
    live: 'https://property-finder.vercel.app',
    github: 'https://github.com/username/real-estate',
    description:
      'Interactive property listing platform with advanced search filters, 3D virtual tours, mortgage calculator, and AI-powered property recommendations.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Three.js', 'Mapbox'],
  },
];

const myReviews = [
  {
    name: 'John Doe',
    title: 'Founder of TechSpark',
    heading: 'Amazing development skills with exceptional attention to detail!',
    description:
      'The website you built is fast, responsive, and user-friendly. Your designs and backend expertise were unmatched.',
    image: man1,
  },
  {
    name: 'Sarah Williams',
    title: 'Marketing Manager at BrandHive',
    heading: 'A true professional who brings visions to life!',
    description:
      'You created a stunning, SEO-friendly website that boosted our online presence. Highly recommend!',
    image: man2,
  },
  {
    name: 'David Lee',
    title: 'CEO of NextGen Enterprises',
    heading: 'Exceeded expectations every step of the way!',
    description:
      'Your top-tier work delivered seamless integration and dynamic features that strengthened our platform.',
    image: man3,
  },
  {
    name: 'Jessica Taylor',
    title: 'Owner of TrendyShop',
    heading: 'Highly skilled and very communicative throughout the process!',
    description:
      'The e-commerce site is user-friendly and secure, significantly enhancing our customer satisfaction.',
    image: man4,
  },
  {
    name: 'Michael Carter',
    title: 'CTO of CloudCore Solutions',
    heading: 'Delivered cutting-edge solutions with flawless execution!',
    description:
      'Your expertise optimized scalability and performance, ensuring our long-term success.',
    image: man5,
  },
];

export const techBlogsDemo: IBlog[] = [
  {
    id: 1,
    title: 'মাস্টারিং নেক্সট জেএস ১৫: সার্ভার কম্পোনেন্টের ভবিষ্যৎ',
    content:
      'নেক্সট জেএস ১৫ (Next.js 15) বর্তমানে ওয়েব ডেভেলপমেন্টের জগতে একটি নতুন বিপ্লব নিয়ে এসেছে। ডাটা ফেচিং এবং সার্ভার-সাইড রেন্ডারিংয়ের ক্ষেত্রে এটি আগের চেয়ে অনেক বেশি উন্নত। এই ভার্সনে ক্যাশিং ডিফল্টভাবে সরিয়ে দেওয়া হয়েছে, যা ডেভেলপারদের ডাইনামিক ডাটা হ্যান্ডেল করতে আরও বেশি স্বাধীনতা দেয়। এছাড়াও পার্শিয়াল প্রি-রেন্ডারিং (PPR) এবং নতুন কম্পাইলার টার্বোপ্যাক (Turbopack) ডেভেলপমেন্ট অভিজ্ঞতাকে বহুগুণ বাড়িয়ে দিয়েছে। এই ব্লগে আমরা দেখব কীভাবে মিনিমাল কনফিগারেশনে আপনি আপনার অ্যাপ্লিকেশনকে আরও দ্রুত এবং স্কেলেবল করতে পারেন।',
    author: 'প্রিন্স মাহমুদ পিয়াস',
    thumbnail: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    cover: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    tags: ['NextJS', 'WebDev', 'Frontend'],
    isFeatured: true,
    views: 1240,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 2,
    title: 'এজেন্টিক এআই-এর উত্থান: সাধারণ চ্যাটবটের বাইরে এক নতুন জগত',
    content:
      'আর্টিফিশিয়াল ইন্টেলিজেন্স বা এআই এখন আর শুধু সাধারণ প্রশ্নের উত্তর দেওয়ার মধ্যে সীমাবদ্ধ নেই। এটি এখন রিয়্যাক্টিভ মোড থেকে প্রো-অ্যাক্টিভ টাস্ক এক্সিকিউশনের দিকে এগিয়ে যাচ্ছে। এজেন্টিক এআই (Agentic AI) হলো এমন একটি সিস্টেম যা স্বয়ংক্রিয়ভাবে পরিকল্পনা করতে পারে, যুক্তি দিতে পারে এবং নির্দিষ্ট লক্ষ্য অর্জনের জন্য বিভিন্ন টুল ব্যবহার করতে পারে। ল্যাংচেইন (LangChain) এবং অটোজিপিটি (AutoGPT)-র মতো ফ্রেমওয়ার্কগুলো এই পথটি আরও সহজ করে দিয়েছে। ভবিষ্যৎ প্রযুক্তিতে কীভাবে এই এজেন্টগুলো আমাদের কাজের ধরন বদলে দেবে, তা নিয়েই আজকের আলোচনা।',
    author: 'AI Strategist',
    thumbnail: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    cover: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    tags: ['AI', 'Automation', 'FutureTech'],
    isFeatured: true,
    views: 890,
    createdAt: new Date('2024-03-12'),
  },
  {
    id: 3,
    title: 'প্রিজমা এবং পোস্টগ্রেসকিউএল দিয়ে ব্যাকএন্ড সিস্টেম স্কেলিং',
    content:
      'একটি শক্তিশালী এবং স্কেলেবল অ্যাপ্লিকেশন তৈরির মূলে থাকে তার ডাটাবেস লেয়ার। প্রিজমা ওআরএম (Prisma ORM) এবং পোস্টগ্রেসকিউএল (PostgreSQL)-এর কম্বিনেশন ডেভেলপারদের একটি টাইপ-সেফ এনভায়রনমেন্ট প্রদান করে। এটি ডাটাবেস মাইগ্রেশনকে যেমন সহজ করে, তেমনি জটিল কোয়েরি অপ্টিমাইজেশনের মাধ্যমে হাই-ট্রাফিক অ্যাপ্লিকেশনের পারফরম্যান্স নিশ্চিত করে। রিলেশনাল ডাটা মডেলিং এবং ইনডেক্সিং কীভাবে আপনার ব্যাকএন্ডকে কয়েক গুণ বেশি দক্ষ করে তুলতে পারে, তা আমরা এই আর্টিকেলে বিস্তারিত জানব।',
    author: 'Backend Expert',
    thumbnail: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    cover: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    tags: ['Prisma', 'PostgreSQL', 'Backend'],
    isFeatured: false,
    views: 560,
    createdAt: new Date('2024-03-15'),
  },
  {
    id: 4,
    title: 'ওয়েব ইনফ্রাস্ট্রাকচারে রাস্ট কেন সেরা পছন্দ হয়ে উঠছে?',
    content:
      'আধুনিক কম্পিউটিংয়ের যুগে পারফরম্যান্স এবং মেমোরি সেফটি সবচেয়ে বড় চ্যালেঞ্জ। রাস্ট (Rust) ল্যাঙ্গুয়েজ তার ওনারশিপ মডেলের মাধ্যমে কোনো গার্বেজ কালেক্টর ছাড়াই মেমোরি সেফটি নিশ্চিত করে। একারণেই হাই-পারফরম্যান্স সার্ভার এবং ওয়েব অ্যাসেম্বলির জন্য রাস্ট এখন ডেভেলপারদের প্রথম পছন্দ। মেমোরি লিক রোধ এবং কনকারেন্সি হ্যান্ডেল করার ক্ষেত্রে রাস্টের দক্ষতা এটিকে সিস্টেম আর্কিটেকচারের জন্য এক অপ্রতিদ্বন্দ্বী ভাষা হিসেবে প্রতিষ্ঠিত করেছে। কেন বড় বড় টেক জায়ান্টরা এখন গো বা জাভাস্ক্রিপ্ট থেকে রাস্টে শিফট হচ্ছে, তা জানুন এখানে।',
    author: 'Systems Architect',
    thumbnail: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    cover: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    tags: ['Rust', 'Performance', 'Infrastructure'],
    isFeatured: false,
    views: 2100,
    createdAt: new Date('2024-03-18'),
  },
  {
    id: 5,
    title: '২০২৬ সালের ইউআই/ইউএক্স ট্রেন্ড: ইমারসিভ ডিজাইনের যুগ',
    content:
      'ফ্ল্যাট ডিজাইনের দিন শেষ হয়ে এখন শুরু হয়েছে ট্যাকটাইল এবং ইন্টারঅ্যাক্টিভ ডিজাইনের যুগ। ২০২৬ সালে স্পেশাল ইউআই (Spatial UI), গ্লাসমরফিজম এবং ফ্রেমার মোশন (Framer Motion) চালিত মাইক্রো-ইন্টারঅ্যাকশনগুলো ইউজার এক্সপেরিয়েন্সকে এক নতুন উচ্চতায় নিয়ে যাচ্ছে। ইউজার এখন শুধু কন্টেন্ট দেখতে চায় না, বরং সেটি অনুভব করতে চায়। কীভাবে মিনিমালিস্টিক ডিজাইনের সাথে ইমারসিভ এলিমেন্ট যুক্ত করে ব্যবহারকারীদের ধরে রাখা যায়, সেই সব লেটেস্ট ট্রেন্ড এবং সাইকোলজি নিয়ে আমাদের এই বিশেষ ব্লগ।',
    author: 'Creative Lead',
    thumbnail: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    cover: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    tags: ['UXDesign', 'FramerMotion', 'Frontend'],
    isFeatured: false,
    views: 1345,
    createdAt: new Date('2024-03-20'),
  },
  {
    id: 6,
    title: 'ইআরপি সলিউশন সুরক্ষিত করা: সাইবার নিরাপত্তা টিপস',
    content:
      'একটি প্রতিষ্ঠানের প্রাণকেন্দ্র হলো তার ইআরপি (ERP) সিস্টেম, যেখানে থাকে প্রতিষ্ঠানের সব গোপনীয় তথ্য। তাই সাইবার অপরাধীদের প্রধান লক্ষ্য থাকে এই সিস্টেমটি। শুধু একটি ফায়ারওয়াল এখন আর নিরাপত্তা নিশ্চিত করতে পারে না। আজকের সময়ে জিরো ট্রাস্ট আর্কিটেকচার (Zero Trust Architecture) এবং রোল-বেজড এক্সেস কন্ট্রোল (RBAC) বাস্তবায়ন করা অত্যন্ত জরুরি। ডাটা এনক্রিপশন থেকে শুরু করে নিয়মিত সিকিউরিটি অডিট কীভাবে আপনার এন্টারপ্রাইজ সলিউশনকে হ্যাকারদের হাত থেকে বাঁচাতে পারে, তা নিয়ে বিস্তারিত গাইডলাইন এখানে দেওয়া হলো।',
    author: 'Security Analyst',
    thumbnail: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    cover: 'https://i.ibb.co/fV500sDk/download-2.jpg',
    tags: ['ERP', 'Security', 'Enterprise'],
    isFeatured: true,
    views: 450,
    createdAt: new Date('2024-03-22'),
  },
];

const assets = {
  bannerImage,
  services,
  skills,
  myWorks,
  myReviews,
};

export default assets;
