export interface NPSEntry {
  score: number;
  bucket: string;
  comment: string;
  tags: string[] | null;
}

export function bucketFiller(score: number) {
  if (score >= 9) {
    return "Promoter";
  } else if (score >= 7) {
    return "Passive";
  } else {
    return "Detractor";
  }
}

export function scoreCalculator(allNPS: NPSEntry[] | null) {
  if (allNPS) {
    // let sumNPS = 0;
    let numPromoters = 0;
    let numDetractors = 0;

    for (let i = 0; i < allNPS.length; i++) {
      if (allNPS[i].bucket === "Promoter") {
        numPromoters++;
      } else if (allNPS[i].bucket === "Detractor") {
        numDetractors++;
      }
      // sumNPS += allNPS[i].score;
    }

    const percentPromoters = (numPromoters / allNPS.length) * 100;
    const percentDetractors = (numDetractors / allNPS.length) * 100;
    // const avgScore = sumNPS / allNPS.length;

    return Math.round(percentPromoters - percentDetractors);
  } else return 0;
}

export function getTagKeys(availableKeys: string[], entry: any) {
  return availableKeys.filter(
    (tag) =>
      entry[tag] !== "" &&
      tag !== "Score" &&
      tag !== "Bucket" &&
      tag !== "Comment"
  );
}

export function findCommonTags(
  bucketName: string,
  allNPS: NPSEntry[] | null,
  topXTags: number
) {
  if (!allNPS) return "";

  const filteredBucket = allNPS.filter((entry) => entry.bucket === bucketName);

  console.log(filteredBucket);

  const sizeofTags = Object.keys;
  // const tagCounts =
  // for (let i = 0; filteredBucket.length; i++) {

  // }
}
