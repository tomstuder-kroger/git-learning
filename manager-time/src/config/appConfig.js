// Application Configuration - Phase 1 (Hardcoded)
// Phase 2 will make this editable via Settings

export const APP_CONFIG = {
  userProfile: {
    name: "Tom Studer",
    title: "Group Manager Product Design"
  },

  taskTypes: [
    {
      id: "1on1-meeting",
      label: "1:1 Meeting",
      icon: "kds-icon-calendar",
      defaultTime: 0.5,
      autoFill: {
        category: "Facilitator",
        taskCode: "General Admin"
      },
      customFields: ["participant"]
    },
    {
      id: "standup",
      label: "Standup",
      icon: "kds-icon-members",
      defaultTime: 0.25,
      autoFill: {
        category: "Collaborator",
        taskCode: "ProjEx - OKR / Discovery & Agile Ceremonies"
      },
      customFields: ["domain"]
    },
    {
      id: "focus-time",
      label: "Focus Time",
      icon: "kds-icon-light-bulb",
      defaultTime: 2.0,
      autoFill: {
        category: "Doer",
        taskCode: "Capital Expenses - The Work / Flows / Prototype"
      },
      customFields: ["focusArea"]
    },
    {
      id: "learning-dev",
      label: "Learning & Development",
      icon: "kds-icon-education",
      defaultTime: 1.0,
      autoFill: {
        category: "¯\\_(ツ)_/¯",
        taskCode: "Training - Corp/Personal Development"
      },
      customFields: ["topic"]
    },
    {
      id: "admin-emails",
      label: "Admin - Emails",
      icon: "kds-icon-email",
      defaultTime: 0.5,
      autoFill: {
        category: "Enabler",
        taskCode: "General Admin"
      },
      customFields: []
    },
    {
      id: "admin-planning",
      label: "Admin - Planning",
      icon: "kds-icon-docs",
      defaultTime: 1.0,
      autoFill: {
        category: "Enabler",
        taskCode: "General Admin"
      },
      customFields: []
    },
    {
      id: "admin-time-entry",
      label: "Admin - Time Entry",
      icon: "kds-icon-clock",
      defaultTime: 0.25,
      autoFill: {
        category: "Doer",
        taskCode: "General Admin"
      },
      customFields: []
    },
    {
      id: "manager-responsibilities",
      label: "Manager Responsibilities",
      icon: "kds-icon-briefcase",
      defaultTime: 1.0,
      autoFill: {
        category: "Facilitator",
        taskCode: "General Admin"
      },
      customFields: ["subtype"]
    },
    {
      id: "ktd-town-hall",
      label: "KTD Town Hall",
      icon: "kds-icon-hub",
      defaultTime: 1.0,
      autoFill: {
        category: "Collaborator",
        taskCode: "General Admin"
      },
      customFields: []
    },
    {
      id: "side-of-desk",
      label: "Side of Desk Work",
      icon: "kds-icon-puzzle-piece",
      defaultTime: null,
      autoFill: {
        category: "¯\\_(ツ)_/¯",
        taskCode: "ALL"
      },
      customFields: ["focusArea"]
    },
    {
      id: "it-support",
      label: "IT Support",
      icon: "kds-icon-laptop",
      defaultTime: 0.5,
      autoFill: {
        category: "¯\\_(ツ)_/¯",
        taskCode: "General Admin"
      },
      customFields: ["issue"]
    }
  ],

  categories: [
    "Facilitator",
    "Enabler",
    "Collaborator",
    "Doer",
    "¯\\_(ツ)_/¯"
  ],

  taskCodes: [
    "General Admin",
    "Training - Corp/Personal Development",
    "ProjEx - OKR / Discovery & Agile Ceremonies",
    "Capital Expenses - The Work / Flows / Prototype",
    "ALL",
    "¯\\_(ツ)_/¯"
  ],

  portfolios: [
    "Assortment",
    "Supplier",
    "Item",
    "S/I/A",
    "MSCX",
    "KTD",
    "Other"
  ],

  impacts: [
    "High",
    "Medium",
    "Low",
    "¯\\_(ツ)_/¯"
  ],

  roleExpectations: [
    "Value direction not delivery",
    "Step back see the horizon",
    "Delegation",
    "Focus: why what not how",
    "Delivery of strategy document",
    "Build bridges not silos",
    "Capacity multiplication",
    "Psychological safety",
    "Standards & docs",
    "Personal Professional Growth",
    "ALL",
    "Other"
  ],

  // Custom field definitions
  customFieldOptions: {
    participant: [], // Learned from entries
    domain: [
      "Assortment",
      "Supplier",
      "Item",
      "S/I/A",
      "MSCX",
      "KTD",
      "Other"
    ],
    subtype: [
      "Team Reviews",
      "Coaching",
      "Finance & Accounting",
      "Performance Management",
      "Hiring/Recruiting"
    ]
  }
};
