export interface Node<T> {
  identity: number;
  labels: string[];
  properties: T;
  elementId: string;
}
