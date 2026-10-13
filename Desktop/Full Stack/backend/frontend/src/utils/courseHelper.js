/**
 * Course Data Parser Utility
 * Safely parses structured JSON descriptions or returns plain text fallbacks.
 */
export const parseCourseDescription = (descriptionStr) => {
  if (!descriptionStr) {
    return {
      category: 'General',
      level: 'All Levels',
      duration: 'Flexible',
      overview: 'No description provided.',
      prerequisites: 'None',
      outcomes: [],
    };
  }

  try {
    const parsed = JSON.parse(descriptionStr);
    if (typeof parsed === 'object' && parsed !== null) {
      return {
        category: parsed.category || 'General',
        level: parsed.level || 'Beginner',
        duration: parsed.duration || 'Self-paced',
        overview: parsed.overview || descriptionStr,
        prerequisites: parsed.prerequisites || 'Basic computer literacy.',
        outcomes: Array.isArray(parsed.outcomes) ? parsed.outcomes : [],
      };
    }
  } catch {
    // If plain string
  }

  return {
    category: 'General',
    level: 'Beginner',
    duration: 'Self-paced',
    overview: descriptionStr,
    prerequisites: 'Basic computer literacy.',
    outcomes: [],
  };
};
