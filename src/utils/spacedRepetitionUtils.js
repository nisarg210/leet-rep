export const filterTodaysProblems = (problems) => {
    const now = Date.now();
    return problems.filter(
      (problem) =>
        !problem.lastReviewed || now - problem.lastReviewed >= problem.interval * 24 * 60 * 60 * 1000
    );
  };
  