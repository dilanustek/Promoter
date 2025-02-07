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
  timestamp: number;
}

export type Bucket = "Promoter" | "Passive" | "Detractor";
export const bucketNames: Bucket[] = ["Promoter", "Passive", "Detractor"];

export function scoreToBucket(score: number): Bucket {
  if (score >= 9) {
    return "Promoter";
  } else if (score >= 7) {
    return "Passive";
  } else {
    return "Detractor";
  }
}

export function scoreCounter(allNPS: NPSEntry[]) {
  let numPromoters = 0;
  let numDetractors = 0;
  let numPassives = 0;

  for (let i = 0; i < allNPS.length; i++) {
    if (allNPS[i].bucket === "Promoter") {
      numPromoters++;
    } else if (allNPS[i].bucket === "Detractor") {
      numDetractors++;
    } else numPassives++;
  }

  return { numPromoters, numPassives, numDetractors };
}

export function npsScoreCalculator(allNPS: NPSEntry[]) {
  const scores = scoreCounter(allNPS);
  const ratePromoters = scores.numPromoters / allNPS.length;
  const rateDetractors = scores.numDetractors / allNPS.length;

  return Math.round((ratePromoters - rateDetractors) * 100);
}

export function getTagKeys(availableKeys: string[], entry: any) {
  const nonTagColumns = [
    "Score",
    "Bucket",
    "Comment",
    "Id",
    "Date",
    "Very Positive",
    "Somewhat positive",
    "Neutral",
    "Negative",
  ];

  return availableKeys.filter(
    (tag) => entry[tag] !== "" && !nonTagColumns.includes(tag)
  );
}

function filterByBucket(bucket: Bucket, allNPS: NPSEntry[]) {
  return allNPS.filter((entry) => entry.bucket === bucket);
}

function countTags(allNPS: NPSEntry[]) {
  const tagCounts: { [tag: string]: number } = {};

  for (let entry of allNPS) {
    const tags = entry.tags;

    if (tags) {
      for (let tag of tags) {
        tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
      }
    }
  }

  return tagCounts;
}

export function findCommonTagsInBucket(
  bucket: Bucket,
  allNPS: NPSEntry[],
  topXTags: number
) {
  const filteredByBucket = filterByBucket(bucket, allNPS);
  const tagCounts = countTags(filteredByBucket);

  let sortable: [string, number][] = [];
  for (let tag in tagCounts) {
    const rateInBucket = tagCounts[tag] / filteredByBucket.length;
    sortable.push([tag, rateInBucket]);
  }

  sortable.sort((a, b) => b[1] - a[1]);

  return sortable.slice(0, topXTags);
}

export function findCommentsFromBucketAndMaybeTag(
  bucket: Bucket | null,
  tag: string | null,
  allNPS: NPSEntry[]
) {
  if (bucket) {
    if (tag) {
      return allNPS.filter((entry) =>
        entry.bucket === bucket && entry.tags ? entry.tags.includes(tag) : !tag
      );
    } else {
      return filterByBucket(bucket, allNPS);
    }
  }
  return null;
}

export function colorIconByBucket(bucket: Bucket | null) {
  switch (bucket) {
    case "Promoter":
      return green[400];
    case "Passive":
      return blue[300];
    case "Detractor":
      return red[400];
    default:
      return grey[500];
  }
}

export function getStyledEmoticon(
  EmoticonComponent:
    | typeof InsertEmoticonIcon
    | typeof SentimentSatisfiedIcon
    | typeof MoodBadIcon
    | typeof Face,
  isTitle: boolean,
  bucket: Bucket | null
) {
  const styles: { color: string; fontSize?: number } = {
    color: colorIconByBucket(bucket),
  };

  if (isTitle) {
    styles.fontSize = 32;
  }

  return (
    <EmoticonComponent
      className={isTitle ? "titleIcon" : "smallIcon"}
      style={styles}
    />
  );
}

export function getEmoticonByBucket(bucket: Bucket | null, isTitle: boolean) {
  let icon;
  switch (bucket) {
    case "Promoter":
      icon = InsertEmoticonIcon;
      break;
    case "Passive":
      icon = SentimentSatisfiedIcon;
      break;
    case "Detractor":
      icon = MoodBadIcon;
      break;
    default:
      icon = Face;
  }

  return getStyledEmoticon(icon, isTitle, bucket);
}

export function getMinTime(data: NPSEntry[]) {
  const minTime = data.reduce(
    (minTime, entry) => Math.min(entry.timestamp, minTime),
    data[0].timestamp
  );
  return minTime;
}

export function getMaxTime(data: NPSEntry[]) {
  const maxTime = data.reduce(
    (maxTime, entry) => Math.max(entry.timestamp, maxTime),
    data[0].timestamp
  );
  return maxTime;
}
