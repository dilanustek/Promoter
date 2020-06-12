import React from "react";
import { green, grey, red, blue } from "@material-ui/core/colors";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Face from "@material-ui/icons/Face";

export interface NPSEntry {
  id: number;
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

export function scoreCalculator(allNPS: NPSEntry[]) {
  let numPromoters = 0;
  let numDetractors = 0;

  for (let i = 0; i < allNPS.length; i++) {
    if (allNPS[i].bucket === "Promoter") {
      numPromoters++;
    } else if (allNPS[i].bucket === "Detractor") {
      numDetractors++;
    }
  }

  const percentPromoters = (numPromoters / allNPS.length) * 100;
  const percentDetractors = (numDetractors / allNPS.length) * 100;

  return Math.round(percentPromoters - percentDetractors);
}

export function getTagKeys(availableKeys: string[], entry: any) {
  return availableKeys.filter(
    (tag) =>
      entry[tag] !== "" &&
      tag !== "Score" &&
      tag !== "Bucket" &&
      tag !== "Comment" &&
      tag !== "Id" &&
      tag !== "Date" &&
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
  allNPS: NPSEntry[],
  topXTags: number
) {
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
  allNPS: NPSEntry[]
) {
  if (bucket) {
    if (tag) {
      return allNPS.filter(
        (entry) => entry.bucket === bucket && entry.tags?.includes(tag)
      );
    } else {
      return filterByBucket(bucket, allNPS);
    }
  }
  return null;
}

export function styleIconByBucket(bucket: Bucket | null) {
  if (bucket === "Promoter") {
    return { color: green[400] };
  } else if (bucket === "Passive") {
    return { color: blue[300] };
  } else if (bucket === "Detractor") {
    return { color: red[400] };
  } else return { color: grey[500] };
}

export function titleEmoticonByBucket(bucket: Bucket | null) {
  if (bucket === "Promoter") {
    return (
      <InsertEmoticonIcon
        className="tagIcon"
        style={{ color: green[400], fontSize: 32 }}
      />
    );
  } else if (bucket === "Passive") {
    return (
      <SentimentSatisfiedIcon
        className="tagIcon"
        style={{ color: blue[200], fontSize: 32 }}
      />
    );
  } else if (bucket === "Detractor") {
    return (
      <MoodBadIcon
        className="tagIcon"
        style={{ color: red[400], fontSize: 32 }}
      />
    );
  } else
    return (
      <Face className="tagIcon" style={{ color: grey[500], fontSize: 32 }} />
    );
}

export function emoticonByBucket(bucket: Bucket | null) {
  if (bucket === "Promoter") {
    return <InsertEmoticonIcon style={styleIconByBucket(bucket)} />;
  } else if (bucket === "Passive") {
    return <SentimentSatisfiedIcon style={styleIconByBucket(bucket)} />;
  } else if (bucket === "Detractor") {
    return <MoodBadIcon style={styleIconByBucket(bucket)} />;
  } else return <Face style={styleIconByBucket(bucket)} />;
}
