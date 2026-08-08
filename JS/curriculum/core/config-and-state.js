// Configuration
const CONFIG = {
  jsonPath: "JSON/Curriculum.json",
  categoriesJsonPath: "JSON/categories.json",
  fallbackJsonPath: "JSON/Curriculum.json",
  animationDuration: 500,
  animationDelay: 100,
  debugMode: true,
  mobileBreakpoint: 768,
  siteImageMaxHeight: 120,
  removeScrollableContainers: true,
};

// State management
const STATE = {
  curriculumData: null,
  categoriesData: null,
  expandedSections: {},
  categorizedSkills: null,
  isLoading: true,
  hasError: false,
  errorMessage: "",
  isMobile: window.innerWidth <= CONFIG.mobileBreakpoint,
};

// DOM Elements cache
const DOM = {};

/**
 * Check if we're on mobile and update state
 */
