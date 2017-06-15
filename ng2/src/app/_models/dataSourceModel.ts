export class DataSourceModel {
  sourceID: string; // Unique dataSource key
  projectName: string;
  projectID: string;
  teamName: string;
  teamMembers: {
    name: string;
    role?: string;
    uuid: string;
  }[];
  service: {
    type: string; // Github, OpenShift, etc.
    apikey: string;
    misc?: string[]; // ?
  };
  serviceID: string; // Database Key
  metadata: string[]; // Should be a json object, but metadata input doesn't allow it yet
}
