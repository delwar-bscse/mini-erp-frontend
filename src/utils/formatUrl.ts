

export const formatUrl = (path?: string | null | undefined) => {
  if (!path) {
    return "";
  }
  
  if (path.startsWith("http")) {
    return path;
  }
  
  // Replace backslashes with forward slashes for Windows paths
  let cleanPath = path.replace(/\\/g, '/');

  // Avoid duplicated "uploads/" in the final URL
  if (cleanPath.startsWith("uploads/")) {
    cleanPath = cleanPath.substring(8);
  } else if (cleanPath.startsWith("/uploads/")) {
    cleanPath = cleanPath.substring(9);
  }

  if (cleanPath.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}${cleanPath}`;
  } else {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${cleanPath}`;
  }
};