const formatLocationName = (fullName: string): string => {
  const parts = fullName.split(",");
  if (parts.length >= 3) {
    return `${parts[0]}, ${parts[1]}, ${parts[2]}`;
  }
  return fullName;
};

export default formatLocationName;
