export const getBgImage = (weatherCondition: string): string | null => {
  const lowerCaseCondition = weatherCondition.toLowerCase();

  if (
    lowerCaseCondition.includes("clear") ||
    lowerCaseCondition.includes("sunny")
  ) {
    return "/clear.jpg";
  } else if (lowerCaseCondition.includes("partly cloudy")) {
    return "/partly-cloudy.jpg";
  } else if (lowerCaseCondition.includes("cloudy")) {
    return "/cloudy.jpg";
  } else if (lowerCaseCondition.includes("overcast")) {
    return "/overcast.jpg";
  } else if (
    lowerCaseCondition.includes("mist") ||
    lowerCaseCondition.includes("fog") ||
    lowerCaseCondition.includes("freezing fog")
  ) {
    return "/foggy.jpg";
  } else if (
    lowerCaseCondition.includes("drizzle") ||
    lowerCaseCondition.includes("light rain") ||
    lowerCaseCondition.includes("patchy rain")
  ) {
    return "/light-rain.jpg";
  } else if (
    lowerCaseCondition.includes("rain") ||
    lowerCaseCondition.includes("moderate rain") ||
    lowerCaseCondition.includes("heavy rain") ||
    lowerCaseCondition.includes("showers") ||
    lowerCaseCondition.includes("torrential rain")
  ) {
    return "/heavy-rain.jpg";
  } else if (
    lowerCaseCondition.includes("sleet") ||
    lowerCaseCondition.includes("freezing drizzle") ||
    lowerCaseCondition.includes("ice pellets")
  ) {
    return "/sleet.jpg";
  } else if (
    lowerCaseCondition.includes("snow") ||
    lowerCaseCondition.includes("blizzard") ||
    lowerCaseCondition.includes("blowing snow")
  ) {
    return "/snow.jpg";
  } else if (
    lowerCaseCondition.includes("thunder") ||
    lowerCaseCondition.includes("thundery outbreaks")
  ) {
    return "/thunderstorm.jpg";
  }

  return null;
};
