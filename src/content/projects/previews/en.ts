import thumbnailPlaywright from "../../../assets/thumbnails/playwright-logo.png";
import thumbnailAppium from "../../../assets/thumbnails/appium.png";
import thumbnailCypress from "../../../assets/thumbnails/cypress.jpg";
import thumbnailRestSharp from "../../../assets/thumbnails/selenium-la-gi-1.jpg";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Playwright Demo Framework",
    slug: "playwright-demo-framework",
    repoUrl: "https://github.com/LeDoanTrung/Playwright_Demo_Framework",
    thumbnail: thumbnailPlaywright,
    description: "An automation testing framework for Unsplash using Playwright. It supports both UI and API testing with a well-structured Page Object Model pattern.",
  },
  {
    title: "Appium Java Framework",
    slug: "appium-java-framework",
    repoUrl: "https://github.com/LeDoanTrung/Appium_Java_Framework",
    thumbnail: thumbnailAppium,
    description: "A comprehensive test automation framework for mobile application testing using Appium, Java, TestNG, and Maven. This framework supports both local device testing and cloud testing via BrowserStack.",
  },
  {
    title: "Selenium .Net Framework",
    slug: "selenium-net-framework",
    repoUrl: "https://github.com/LeDoanTrung/Selenium_.Net_Framework",
    thumbnail: thumbnailRestSharp,
    description: "A .Net-based automation testing framework for web applications.",
  },
  {
    title: "Cypress Unsplash",
    slug: "cypress-unsplash",
    repoUrl: "https://github.com/LeDoanTrung/Cypress_Unsplash",
    thumbnail: thumbnailCypress,
    description: "This project is a Cypress framework designed for testing the Unsplash application. It includes various services and utilities to facilitate API testing and UI testing.",
  },

] as const satisfies ProjectPreview[];
