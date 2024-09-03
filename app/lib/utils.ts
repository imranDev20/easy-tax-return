export function kebabToNormal(text: string): string {
    return text
      .split("_") // Split the string at each hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words with a space
  }