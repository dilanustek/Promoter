import React from "react";

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

  const tagCounts: { [tag: string]: number } = {};
  for (let entryIndex in filteredBucket) {
    const tags = filteredBucket[entryIndex].tags;

    if (tags) {
      for (let tagIndex in tags) {
        const currentTag = tags[tagIndex];
        if (currentTag in tagCounts) {
          tagCounts[currentTag]++;
        } else {
          tagCounts[currentTag] = 1;
        }
      }
    }
  }

  let sortable: [string, number][] = [];
  for (let tag in tagCounts) {
    const percentCountInBucket = Math.round(
      (tagCounts[tag] / filteredBucket.length) * 100
    );
    sortable.push([tag, percentCountInBucket]);
  }

  sortable.sort((a, b) => b[1] - a[1]);

  const topX = sortable.slice(0, topXTags);
  console.log(topX);

  const row = [];
  //for (let tag in topX) {
  for (let i = 0; i < topX.length; i++) {
    row.push(
      <li>
        {topX[i][0]} -> {topX[i][1]} %
      </li>
    );
  }

  return <ul>{row}</ul>;
}
