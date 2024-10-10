import "dotenv/config";

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
    await saveSvgFiles(imageUrls, childrenDict, savePath);
  }
}

main();

async function saveSvgFiles(
  imageUrls: { [key: string]: string },
  childrenDict: Record<string, any>,
  savePath: string
) {
  const fs = require("fs").promises;
  const path = require("path");

  for (const [id, url] of Object.entries(imageUrls)) {
    try {
      const response = await fetch(url.toString(), {
        headers: {
          "X-FIGMA-TOKEN": FIGMA_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태: ${response.status}`);
      }

      const svgCode = await response.text();

      // SVG 코드가 유효한지 확인
      if (!svgCode.trim().startsWith("<svg")) {
        console.error(`유효하지 않은 SVG 코드: ${id}`, svgCode);
        continue;
      }

      const fileName = `${childrenDict[id].name}.svg`;
      const filePath = path.join(savePath, fileName);

      await fs.mkdir(savePath, { recursive: true });
      await fs.writeFile(filePath, svgCode, "utf8");

      console.log(`SVG 파일이 저장되었습니다: ${filePath}`);
    } catch (error) {
      console.error(`파일 저장 중 오류 발생 (${id}):`, error);
    }
  }
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
