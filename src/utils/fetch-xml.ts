import { XMLParser } from "fast-xml-parser";

async function fetchXML(url: string): Promise<Document> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error fetching podcast feed! Status: ${response.status}`);
  }
  const text = await response.text();

  const parser = new XMLParser();
  let obj = parser.parse(text);

  return obj;
}

export default fetchXML;