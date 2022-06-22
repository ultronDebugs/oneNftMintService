export const hashKey = (p1: string, p2: string): string => {
    if (p1.length < 3 || p2.length < 5 ) {
      throw new Error("param 1, 2  must be at least 8 characters long");
    }
    return (
      p1.substring(1, 3) +
      p2.substring(3, 5) +
      "Arfc_Kr_X4" 
    //   Date.now().toString().substring(5, 10)
    );
  };