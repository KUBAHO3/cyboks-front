// Get a formatted date
export const getFormattedDate = (t: any) => {
    const date = new Date(t);
  
    const formattedDate = date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: "Europe/Paris",
    });
  
    return formattedDate;
  };
  
  // Get a capitalized text
  export const capitalizeText = (text: string) => {
    const words = text.split(" ");
  
    const capitalizedWords = words.map((word) => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return word;
    });
  
    const capitalizedText = capitalizedWords.join(" ");
  
    return capitalizedText;
  };
  
  // Force page refresh
  export const refreshPage = async (ms?: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // resolve
        resolve(true);
  
        // reload the page
        window.location.reload();
      }, ms || 4300);
    });
  };

  // helper function for getting the url based on the pathname
  export const getUrlByPathname = (url: string): string => {
    switch (url) {
      case "/dashboard/cyboks":
        return "/dashboard/cyboks";

      case "/dashboard/ncsa":
        return "/dashboard/ncsa";

      case "/dashboard/dpo":
        return "/dashboard/dpo";

      default:
        return "#";
    }
  };