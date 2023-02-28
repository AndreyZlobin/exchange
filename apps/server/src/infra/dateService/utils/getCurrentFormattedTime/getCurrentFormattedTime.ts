const formatTime = Intl.DateTimeFormat("ru", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}).format;

export const getCurrentFormattedTime = (): string => formatTime();
