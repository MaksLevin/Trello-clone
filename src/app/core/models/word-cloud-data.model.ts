export interface WordCloudData {
  text: string;
  value: number;
}

export interface WordCloudOptions {
  autoFill: boolean;
  rotate: any;
  fillScheme?: number;
  animations: boolean;
  fillMapper?: any;
  width?: number;
  height?: number;
  padding?: number;
  font?: string;
}

export interface WordCloudSchemas {
  id: number;
  name: string;
  schema: readonly string[];
}
