const slugify = (s) => {
  if (!s) return '';
  
  return s
      .toString()
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
};

export default slugify;
