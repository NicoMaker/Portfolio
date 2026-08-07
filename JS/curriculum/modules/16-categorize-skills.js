function categorizeSkillsFromJson(competenze) {
  if (!competenze || !Array.isArray(competenze)) {
    return {};
  }

  const uniqueCategories = new Set();
  competenze.forEach((skill) => {
    if (skill.categoria) {
      uniqueCategories.add(skill.categoria);
    }
  });

  if (uniqueCategories.size === 0) {
    return categorizeSkillsByName(competenze);
  }

  const categorized = {};

  uniqueCategories.forEach((category) => {
    categorized[category] = competenze.filter(
      (skill) => skill.categoria === category,
    );
  });

  const categorizedSkillIds = Object.values(categorized)
    .flat()
    .map((skill) => skill.nome);

  const uncategorizedSkills = competenze.filter(
    (skill) => !skill.categoria && !categorizedSkillIds.includes(skill.nome),
  );

  if (uncategorizedSkills.length > 0) {
    const remainingCategorized = categorizeSkillsByName(uncategorizedSkills);
    Object.keys(remainingCategorized).forEach((category) => {
      if (categorized[category]) {
        categorized[category] = [
          ...categorized[category],
          ...remainingCategorized[category],
        ];
      } else {
        categorized[category] = remainingCategorized[category];
      }
    });
  }

  return categorized;
}

/**
 * Fallback categorization by skill name.
 */
function categorizeSkillsByName(competenze) {
  let categories = {};

  if (STATE.categoriesData && STATE.categoriesData.skillCategories) {
    categories = STATE.categoriesData.skillCategories;
  } else {
    categories = {
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
    };
  }

  const categorized = {};

  Object.keys(categories).forEach((category) => {
    categorized[category] = competenze.filter((skill) =>
      categories[category].includes(skill.nome),
    );
  });

  const categorizedSkillNames = Object.values(categorized)
    .flat()
    .map((skill) => skill.nome);

  const otherSkills = competenze.filter(
    (skill) => !categorizedSkillNames.includes(skill.nome),
  );

  if (otherSkills.length > 0) {
    categorized["Altro"] = otherSkills;
  }

  return categorized;
}

/**
 * Generate fallback data in case of loading failure.
 */
