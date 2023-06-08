export interface WordCloudData {
  text: string;
  value: number;
}

export interface WordCloudCommonOptions {
  autoFill: boolean;
  rotate: boolean;
  fillScheme: number;
  animations: boolean;
}

export interface WordCloudAdvancedOptions {
  rotate: any;
  fillMapper: any;
  animations: boolean;
  autoFill: boolean;
  width: number;
  height: number;
  padding: number;
  font: string;
}

export interface WordCloudSchemas {
  id: number;
  name: string;
  schema: readonly string[];
}
