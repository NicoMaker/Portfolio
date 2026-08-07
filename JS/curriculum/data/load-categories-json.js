async function loadCategoriesData() {
  try {
    console.log(
      `Curriculum.js: Attempting to load categories from ${CONFIG.categoriesJsonPath}`,
    );
    const response = await fetch(CONFIG.categoriesJsonPath);

    if (!response.ok) {
      console.warn(
        `Curriculum.js: Failed to load categories from ${CONFIG.categoriesJsonPath}`,
      );
      STATE.categoriesData = {
        skillCategories: {
          Programmazione: [
            "C",
            "C#",
            "C++",
            "Python",
            "JavaScript",
            "HTML5",
            "CSS3",
            "React JS",
            "Node.js",
            "Vite",
          ],
          "DevOps & Tools": [
            "Git",
            "VS Code",
            "Docker",
            "PostgreSQL",
            "Linux",
            "Windows",
          ],
          "IoT & Protocolli": [
            "MQTT",
            "AMQP",
            "CoAP",
            "HTTP",
            "OPC-UA",
            "Raspberry Pi",
            "Node-RED",
          ],
          Visualizzazione: ["Mermaid", "Chart.js", "MathJax"],
        },
        defaultProjectTags: [
          "HTML",
          "CSS",
          "JavaScript",
          "Responsive",
          "Frontend",
          "UI/UX",
        ],
      };
    } else {
      STATE.categoriesData = await response.json();
      console.log("Curriculum.js: Categories data loaded successfully");
    }

    return STATE.categoriesData;
  } catch (error) {
    console.error("Curriculum.js: Error loading categories data:", error);
    STATE.categoriesData = {
      skillCategories: {
        Programmazione: [
          "C",
          "C#",
          "C++",
          "Python",
          "JavaScript",
          "HTML5",
          "CSS3",
          "React JS",
          "Node.js",
          "Vite",
        ],
        "DevOps & Tools": [
          "Git",
          "VS Code",
          "Docker",
          "PostgreSQL",
          "Linux",
          "Windows",
        ],
        "IoT & Protocolli": [
          "MQTT",
          "AMQP",
          "CoAP",
          "HTTP",
          "OPC-UA",
          "Raspberry Pi",
          "Node-RED",
        ],
        Visualizzazione: ["Mermaid", "Chart.js", "MathJax"],
      },
      defaultProjectTags: [
        "HTML",
        "CSS",
        "JavaScript",
        "Responsive",
        "Frontend",
        "UI/UX",
      ],
    };
  }
}

/**
 * Load curriculum data from JSON file.
 */
