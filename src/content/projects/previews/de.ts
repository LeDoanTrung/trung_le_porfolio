import thumbnailPlaywright from "../../../assets/thumbnails/playwright-logo.png";
import thumbnailAppium from "../../../assets/thumbnails/appium.png";
import thumbnailSpecflow from "../../../assets/thumbnails/specflow.png";
import thumbnailCypress from "../../../assets/thumbnails/cypress.jpg";
import thumbnailRestSharp from "../../../assets/thumbnails/selenium-la-gi-1.jpg";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Playwright Demo Framework",
    slug: "playwright-demo-framework",
    repoUrl: "https://github.com/LeDoanTrung/Playwright_Demo_Framework",
    thumbnail: thumbnailPlaywright,
    description: "App für tägliche Gewohnheiten",
  },
  {
    title: "Appium Java Framework",
    slug: "appium-java-framework",
    repoUrl: "https://github.com/LeDoanTrung/Appium_Java_Framework",
    thumbnail: thumbnailAppium,
    description: "Multiplayer-Strategiespiel",
  },
  {
    title: "Selenium Specflow BDD Framework",
    slug: "selenium-specflow-bdd-framework",
    repoUrl: "https://github.com/LeDoanTrung/Selenium_Specflow_DemoQA",
    thumbnail: thumbnailSpecflow,
    description: "Multiplayer-Gaming-Plattform",
  },
  {
    title: "Cypress Unsplash",
    slug: "cypress-unsplash",
    repoUrl: "https://github.com/LeDoanTrung/Cypress_Unsplash",
    thumbnail: thumbnailCypress,
    description: "2D-Abenteuerspiel",
  },
  {
    title: "Selenium RestSharp DemoQA",
    slug: "selenium-restsharp-demoqa",
    repoUrl: "https://github.com/LeDoanTrung/Selenium_RestSharp_DemoQA",
    thumbnail: thumbnailRestSharp,
    description: "Open-Source Lernprojekt",
  },
] as const satisfies ProjectPreview[];
