import { green, grey, red, blue } from "@material-ui/core/colors";

export interface NPSEntry {
  score: number;
  bucket: Bucket;
  comment: string;
  tags: string[] | null;
}

export type Bucket = "Promoter" | "Passive" | "Detractor";

export function bucketFiller(score: number): Bucket {
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
      tag !== "Comment" &&
      tag !== "Very positive" &&
      tag !== "Somewhat positive" &&
      tag !== "Neutral" &&
      tag !== "Negative"
  );
}

function filterByBucket(bucket: Bucket, allNPS: NPSEntry[]) {
  return allNPS.filter((entry) => entry.bucket === bucket);
}

export function findCommonTags(
  bucket: Bucket,
  allNPS: NPSEntry[] | null,
  topXTags: number
) {
  if (!allNPS) return "";

  const filteredBucket = filterByBucket(bucket, allNPS);

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

  return sortable.slice(0, topXTags);
}

export function findCommentsFromBucketTag(
  bucket: Bucket | null,
  tag: string | null,
  allNPS: NPSEntry[] | null,
  topX: number
) {
  if (allNPS && tag && bucket) {
    const filteredComments = allNPS.filter(
      (entry) => entry.bucket === bucket && entry.tags?.includes(tag)
    );
    const topEntries = filteredComments.slice(0, topX);

    const comments: string[] = [];
    for (let entry of topEntries) {
      comments.push(entry.comment);
    }
    return comments;
  }
  return null;
}

export function styleIconByBucket(bucket: Bucket | null) {
  if (bucket === "Promoter") {
    return { color: green[500] };
  } else if (bucket === "Passive") {
    return { color: blue[500] };
  } else if (bucket === "Detractor") {
    return { color: red[500] };
  } else return { color: grey[500] };
}
