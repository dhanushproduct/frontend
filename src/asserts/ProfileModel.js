function createEmptyEducation() {
  return {
    levelofedu: " ",
    field: " ",
    school: " ",
    city: " ",
    country: " ",
    fromMonth: " ",
    fromYear: " ",
  };
}

function createEmptyJob() {
  return {
    jobTitle: " ",
    company: " ",
    country: " ",
    city: " ",
    fromMonth: " ",
    fromYear: " ",
    description: " ",
    toMonth: " ",
    toYear: " ",
  };
}

function createEmptySurvey() {
  return {
    gender: " ",
    race: {
      isAsian: false,
      isPacific: false,
      isBlack: false,
      isWhite: false,
      isLatinx: false,
      isNotListed: false,
      isNativeAmerican: false,
    },
    sex: " ",
    age: " ",
    militarystatus: " ",
  };
}
function createEmptyProject() {
  return {
    Title: " ",
    company: " ",
    fromMonth: " ",
    fromYear: " ",
    description: " ",
    toMonth: " ",
    toYear: " ",
    skills: [],
  };
}

function createEmptysociaclaccounts() {
  return {
    socialaccounts: {
      LinkedIn: "",
      GitHub: "",
      HackerRank: "",
      CodeChef: "",
      WebSite: "",
    },
  };
}

export default function createEmptyProfile() {
  return {
    FullName: {
      FirstName: "",
      LastName: "",
      DisplayFirstName: "",
      DisplayLastName: "",
    },
    Location: {
      Country: "",
      StreetAddress: "",
      City: "",
      PinCode: "",
    },
    education: [createEmptyEducation()],
    jobs: [createEmptyJob()],
    projects: [createEmptyProject()],
    skills: [],
    currentRole: "",
    socialaccounts: createEmptysociaclaccounts(),
    WorkLocation: [],
    Survey: createEmptySurvey(),
    componentOrder: [
      "Recognitions",
      "ProjectsComponent",
      "SkillsComponent",
      "ExperienceComponent",
      "EducationComponent",
    ],
  };
}
