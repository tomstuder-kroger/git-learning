export function parseMarkdown(content) {
  const lines = content.split('\n');

  return {
    overall: parseOverallProgress(lines),
    phases: parsePhases(lines)
  };
}

function parseOverallProgress(lines) {
  // Find the overall progress table
  const tableStart = lines.findIndex(l => l.includes('## 📊 Overall Progress'));
  if (tableStart === -1) return { totalTime: 305, completedTime: 0, percentComplete: 0 };

  // Look for total time in the table
  const totalLine = lines.slice(tableStart, tableStart + 25).find(l => l.includes('**TOTAL**'));
  const totalTime = totalLine ? parseInt(totalLine.match(/(\d+) mins/)?.[1] || '305') : 305;

  // Sum up completed time from each phase
  let completedTime = 0;
  for (let i = tableStart; i < tableStart + 25; i++) {
    if (!lines[i]) break;
    const match = lines[i].match(/Phase \d.*?\|\s*(\d+) mins/);
    if (match) {
      completedTime += parseInt(match[1]);
    }
  }

  return {
    totalTime,
    completedTime,
    percentComplete: Math.round((completedTime / totalTime) * 100)
  };
}

function parsePhases(lines) {
  const phases = [];
  const phaseHeaders = [
    { pattern: /^(?:##\s*)?🌱 Phase 0:/, id: 0, name: 'Git Foundations - The Basics' },
    { pattern: /^(?:##\s*)?🛡️ Phase 1:/, id: 1, name: 'Safety Setup' },
    { pattern: /^(?:##\s*)?🔍 Phase 2:/, id: 2, name: 'Inspection' },
    { pattern: /^(?:##\s*)?🌿 Phase 3:/, id: 3, name: 'Branching' },
    { pattern: /^(?:##\s*)?🔀 Phase 4:/, id: 4, name: 'Pull Requests' },
    { pattern: /^(?:##\s*)?🤖 Phase 5:/, id: 5, name: 'Claude + Git Safety' }
  ];

  phaseHeaders.forEach(({ pattern, id, name }) => {
    const startIdx = lines.findIndex(l => pattern.test(l));
    if (startIdx === -1) return;

    // Find the next phase or end
    const nextPhaseIdx = lines.slice(startIdx + 1).findIndex(l => /^(?:##\s*)?(🌱|🛡️|🔍|🌿|🔀|🤖)/.test(l));
    const endIdx = nextPhaseIdx === -1 ? lines.length : startIdx + 1 + nextPhaseIdx;
    const phaseLines = lines.slice(startIdx, endIdx);

    const phase = {
      id,
      name,
      status: extractPhaseStatus(phaseLines),
      timeEstimate: extractTimeEstimate(phaseLines),
      timeSpent: extractTimeSpent(phaseLines),
      sessions: parseSessions(phaseLines, id)
    };

    phases.push(phase);
  });

  return phases;
}

function extractPhaseStatus(lines) {
  const statusLine = lines.find(l => l.includes('**Status:**'));
  if (!statusLine) return 'not-started';

  if (statusLine.includes('✅') || statusLine.includes('COMPLETE')) return 'complete';
  if (statusLine.includes('🔄') || statusLine.includes('IN PROGRESS')) return 'in-progress';
  return 'not-started';
}

function extractTimeEstimate(lines) {
  const timeLine = lines.find(l => l.includes('**Total Time:**') || l.includes('**Timeline:**'));
  if (!timeLine) return 0;

  const match = timeLine.match(/(\d+)\s*min/i);
  return match ? parseInt(match[1]) : 0;
}

function extractTimeSpent(lines) {
  const spentLine = lines.find(l => l.includes('**Total Time Spent:**'));
  if (!spentLine) return 0;

  const match = spentLine.match(/(\d+)\s*min/i);
  return match ? parseInt(match[1]) : 0;
}

function parseSessions(phaseLines, phaseId) {
  const sessions = [];
  const sessionPattern = /^### (Session|Task) ([\d.]+):/;

  phaseLines.forEach((line, idx) => {
    const match = line.match(sessionPattern);
    if (!match) return;

    const sessionId = match[2];
    const sessionStartIdx = idx;

    // Find next session or end
    const nextSessionIdx = phaseLines.slice(sessionStartIdx + 1).findIndex(l => sessionPattern.test(l));
    const sessionEndIdx = nextSessionIdx === -1 ? phaseLines.length : sessionStartIdx + 1 + nextSessionIdx;
    const sessionLines = phaseLines.slice(sessionStartIdx, sessionEndIdx);

    const session = {
      id: sessionId,
      name: extractSessionName(sessionLines),
      status: extractSessionStatus(sessionLines),
      learningTime: extractLearningTime(sessionLines),
      practiceTime: extractPracticeTime(sessionLines),
      objectives: extractObjectives(sessionLines),
      resources: extractResources(sessionLines),
      exercise: extractExercise(sessionLines),
      reflectionQuestions: extractReflection(sessionLines)
    };

    session.totalTime = session.learningTime + session.practiceTime;
    sessions.push(session);
  });

  return sessions;
}

function extractSessionName(lines) {
  const headerLine = lines[0];
  const match = headerLine.match(/### (?:Session|Task) [\d.]+: (.+?)(?:\s*\(|$)/);
  return match ? match[1].trim() : 'Unknown Session';
}

function extractSessionStatus(lines) {
  const statusLine = lines.find(l => l.includes('- **Status:**'));
  if (!statusLine) return 'not-started';

  if (statusLine.includes('✅')) return 'complete';
  if (statusLine.includes('🔄')) return 'in-progress';
  return 'not-started';
}

function extractLearningTime(lines) {
  // Look for pattern like "15 min learning"
  const timeLine = lines.find(l => l.toLowerCase().includes('learning') && l.includes('min'));
  if (timeLine) {
    const match = timeLine.match(/(\d+)\s*min/i);
    return match ? parseInt(match[1]) : 0;
  }
  return 0;
}

function extractPracticeTime(lines) {
  // Look for pattern like "15 min practice"
  const timeLine = lines.find(l => l.toLowerCase().includes('practice') && l.includes('min'));
  if (timeLine) {
    const match = timeLine.match(/(\d+)\s*min/i);
    return match ? parseInt(match[1]) : 0;
  }

  // Fallback: look for total time estimate
  const estimateLine = lines.find(l => l.includes('**Time Estimate:**'));
  if (estimateLine) {
    const match = estimateLine.match(/(\d+)\s*min/i);
    return match ? parseInt(match[1]) : 0;
  }

  return 0;
}

function extractObjectives(lines) {
  const objectives = [];
  let inObjectives = false;

  lines.forEach(line => {
    if (line.includes('**Learning Objectives:**')) {
      inObjectives = true;
      return;
    }
    if (inObjectives && line.match(/^(- \[|☐)/)) {
      const text = line.replace(/^- \[\s*[x ]?\s*\]\s*/, '').replace(/^☐\s*/, '').trim();
      if (text) objectives.push(text);
    }
    if (inObjectives && line.trim() === '') {
      inObjectives = false;
    }
  });

  return objectives;
}

function extractResources(lines) {
  const resources = [];

  lines.forEach(line => {
    // Match pattern: 📖 [Title](url) (X mins)
    const readingMatch = line.match(/📖.*?\[(.+?)\]\((.+?)\).*?\((\d+)\s*min/);
    if (readingMatch) {
      resources.push({
        type: 'reading',
        title: readingMatch[1],
        url: readingMatch[2],
        time: parseInt(readingMatch[3])
      });
    }

    // Match pattern: 🎥 [Title](url) (X mins)
    const videoMatch = line.match(/🎥.*?\[(.+?)\]\((.+?)\).*?\((\d+)\s*min/);
    if (videoMatch) {
      resources.push({
        type: 'video',
        title: videoMatch[1],
        url: videoMatch[2],
        time: parseInt(videoMatch[3])
      });
    }
  });

  return resources;
}

function extractExercise(lines) {
  const steps = [];
  const commands = [];

  let inCodeBlock = false;
  let currentCommand = '';

  lines.forEach(line => {
    // Detect step patterns
    if (line.match(/^(STEP \d+|Step \d+|\d+\.)/)) {
      const stepText = line.replace(/^(STEP \d+( of \d+)?:|Step \d+:|\d+\.)\s*/, '').trim();
      if (stepText) steps.push(stepText);
    }

    // Extract bash code blocks
    if (line.trim().startsWith('```bash') || line.trim().startsWith('```')) {
      if (inCodeBlock && currentCommand.trim()) {
        commands.push(currentCommand.trim());
        currentCommand = '';
      }
      inCodeBlock = !inCodeBlock;
    } else if (inCodeBlock && line.trim()) {
      currentCommand += line + '\n';
    }
  });

  return { steps, commands };
}

function extractReflection(lines) {
  const questions = [];
  let inReflection = false;

  lines.forEach(line => {
    if (line.includes('Reflection Questions')) {
      inReflection = true;
      return;
    }
    if (inReflection && line.match(/^\d+\.|^-|^•/)) {
      const text = line.replace(/^\d+\.\s*|^-\s*|^•\s*/, '').trim();
      if (text) questions.push(text);
    }
    if (inReflection && line.trim() === '') {
      inReflection = false;
    }
  });

  return questions;
}
