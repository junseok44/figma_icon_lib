import "dotenv/config";
import { transform } from "@svgr/core";
import * as path from "path";

const FILE_KEY = process.env.FILE_KEY!;
const FIGMA_API_KEY = process.env.FIGMA_API_KEY!;
const savePath = "./icons";

async function main() {
  const data = await getNodeFromFile("1-2", FILE_KEY);
  const nodes = Object.values(data.nodes);

  for (const node of nodes) {
    const children = getChildrenNodesFrom(node);
    const childrenIds = children.map((item) => item.id);
    const imageUrls = (await getImageUrlsFrom(childrenIds, FILE_KEY)).images;
    const childrenDict = children.reduce(
      (acc: Record<string, (typeof children)[number]>, item) => {
        acc[item.id] = item;
        return acc;
      },
      {}
    );
    await saveSvgFiles(imageUrls, childrenDict);
  }
}

main();

async function saveSvgFiles(
  imageUrls: { [key: string]: string },
  childrenDict: Record<string, any>
) {
  // const promises = [];

  // for (const [id, url] of Object.entries(imageUrls)) {
  //   try {
  //     promises.push(fetchImageFile(url, id));
  //   } catch (error) {
  //     console.error(`파일 저장 중 오류 발생 (${id}):`, error);
  //   }
  // }

  const promises = Object.entries(imageUrls).map(([id, url]) => {
    try {
      return fetchImageFile(url, id);
    } catch (error) {
      console.error(`파일 저장 중 오류 발생 (${id}):`, error);
      throw error;
    }
  });

  const awaitedPromises = await Promise.all(promises);

  // const filePromises: Promise<any>[] = [];

  // awaitedPromises.forEach(async ([id, response], _) => {
  //   if (!response.ok) {
  //     throw new Error(`HTTP 오류! 상태: ${response.status}`);
  //   }

  //   const svgCode = await response.text();

  //   if (!svgCode.trim().startsWith("<svg")) {
  //     console.error(`유효하지 않은 SVG 코드: ${id}`, svgCode);
  //     return;
  //   }

  //   const IconName = snakecaseToPascalCase(childrenDict[id].name);

  //   const jsCode = await transform(
  //     svgCode,
  //     {
  //       plugins: [
  //         "@svgr/plugin-svgo",
  //         "@svgr/plugin-jsx",
  //         "@svgr/plugin-prettier",
  //       ],
  //       icon: true,
  //       ref: true,
  //       typescript: true,
  //     },
  //     { componentName: IconName }
  //   );

  //   filePromises.push(saveToFile(IconName, jsCode));
  // });

  const filePromises = awaitedPromises.map(async ([id, response]) => {
    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    const svgCode = await response.text();

    if (!svgCode.trim().startsWith("<svg")) {
      console.error(`유효하지 않은 SVG 코드: ${id}`, svgCode);
      throw new Error(`유효하지 않은 SVG 코드: ${id}`);
    }

    const IconName = snakecaseToPascalCase(childrenDict[id].name);

    const jsCode = transform.sync(
      svgCode,
      {
        plugins: [
          "@svgr/plugin-svgo",
          "@svgr/plugin-jsx",
          "@svgr/plugin-prettier",
        ],
        icon: true,
        ref: true,
        typescript: true,
      },
      { componentName: IconName }
    );

    return saveToFile(IconName, jsCode);
  });

  await Promise.all(filePromises);
}

async function saveToFile(filePath: string, content: string) {
  const fs = require("fs").promises;
  await fs.mkdir(savePath, { recursive: true });
  await fs.writeFile(path.join(savePath, `${filePath}.tsx`), content);
}

async function fetchImageFile(
  url: string,
  id: string
): Promise<[string, Response]> {
  return [
    id,
    await fetch(url.toString(), {
      headers: {
        "X-FIGMA-TOKEN": FIGMA_API_KEY,
      },
    }),
  ];
}

function snakecaseToPascalCase(str: string) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

async function getImageUrlsFrom(
  nodeIds: string[],
  fileKey: string
): Promise<{
  err: string;
  images: { [key: string]: string };
}> {
  const url = new URL(`/v1/images/${fileKey}`, "https://api.figma.com");
  url.searchParams.set("ids", nodeIds.join(","));
  url.searchParams.set("format", "svg");
  const response = await fetch(url.toString(), {
    headers: {
      "X-FIGMA-TOKEN": FIGMA_API_KEY,
    },
  });
  const data = await response.json();

  return data;
}

async function getNodeFromFile(
  NODE_ID: string,
  fileKey: string
): Promise<{
  nodes: Record<
    string,
    {
      document: {
        children: {
          id: string;
          name: string;
          type: "VECTOR";
          scrollBehavior: "SCROLLS";
          blendMode: "PASS_THROUGH";
          fills: any[];
          strokes: any[];
          strokeWeight: number;
          strokeAlign: "INSIDE";
          absoluteBoundingBox: object;
          absoluteRenderBounds: object;
          constraints: object;
          effects: any[];
          interactions: any[];
        }[];
      };
    }
  >;
}> {
  const url = new URL(`/v1/files/${fileKey}/nodes`, "https://api.figma.com");
  url.searchParams.set("ids", NODE_ID);
  const response = await fetch(url.toString(), {
    headers: {
      "X-FIGMA-TOKEN": FIGMA_API_KEY,
    },
  });
  const data = await response.json();
  return data;
}

function getChildrenNodesFrom(parent: {
  document: {
    children: {
      id: string;
      name: string;
      type: "VECTOR";
      scrollBehavior: "SCROLLS";
      blendMode: "PASS_THROUGH";
      fills: any[];
      strokes: any[];
      strokeWeight: number;
      strokeAlign: "INSIDE";
      absoluteBoundingBox: object;
      absoluteRenderBounds: object;
      constraints: object;
      effects: any[];
      interactions: any[];
    }[];
  };
}) {
  const nodeChildren = parent.document.children;

  return nodeChildren;
}
