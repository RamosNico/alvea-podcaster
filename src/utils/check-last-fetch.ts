const checkLastFetch = (lastFetch: string | null) => {
  if(!lastFetch) return false;
  const now = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  return now - +lastFetch < oneDay;
};

export default checkLastFetch;