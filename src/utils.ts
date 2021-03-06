import * as AWS from "aws-sdk";
import algoliasearch, { Index, Client } from "algoliasearch";

export const getDdbClient = () => {
  return new AWS.DynamoDB.DocumentClient();
};

export const getCurrentTime = (): string => {
  return new Date().toISOString();
};

export const getAlgoliaUserIndex = (): Index => {
  return getAlgoliaClient().initIndex(process.env.ALGOLIA_USER_INDEX!);
};

export const getAlgoliaEventsIndex = (): Index => {
  return getAlgoliaClient().initIndex(process.env.ALGOLIA_EVENTS_INDEX!);
};

export const publishToSnsTopic = async <T>(
  topic: string,
  message: T
): Promise<void> => {
  const sns = new AWS.SNS({ region: 'ap-southeast-2' });
  const topicArn = `${process.env.SNS_PREFIX}-${topic}`;

  console.log(topicArn);

  const params = {
    Message: JSON.stringify(message),
    TopicArn: topicArn
  };

  await sns.publish(params).promise();
};

const getAlgoliaClient = (): Client => {
  const algoliaApp = process.env.ALGOLIA_APP_ID!;
  const algoliaToken = process.env.ALGOLIA_TOKEN!;

  return algoliasearch(algoliaApp, algoliaToken);
};
