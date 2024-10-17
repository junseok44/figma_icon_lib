import "dotenv/config";
import { transform } from "@svgr/core";
import * as path from "path";
import * as fs from "fs/promises";

const FILE_KEY = process.env.FILE_KEY!;
const FIGMA_API_KEY = process.env.FIGMA_API_KEY!;

const iconsDir = "./icons";
const indexPath = "./icons/index.ts";

async function main() {
  const data = await getNodeFromFile("1-2", FILE_KEY);
  const nodes = Object.values(data.nodes);

  await Promise.all(nodes.map((node) => saveChildrenNodeImagesOf(node)));

  await convertIconFilesToIndexFile(iconsDir, indexPath);
}

main();

async function saveChildrenNodeImagesOf(node: any) {
  const children = getChildrenNodesFrom(node);
  const childrenIds = children.map((item) => item.id);
  const imageUrls = (await getImageUrlsFrom(childrenIds, FILE_KEY)).images;
  const childrenDict = createChildrenDictionary(children);
  await saveSvgFiles(imageUrls, childrenDict);
}

function createChildrenDictionary(children: any[]) {
  return children.reduce((acc: Record<string, any>, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
}

async function convertIconFilesToIndexFile(iconDir: string, indexDir: string) {
  // 아이콘 파일 목록 가져오기
  const files = await fs.readdir(iconDir);

  // import 문과 export 배열 생성
  let importStatements = "";
  const exportArray: string[] = [];

  for (const file of files) {
    if (file.endsWith(".tsx")) {
      const componentName = path.basename(file, ".tsx");
      importStatements += `import ${componentName} from "./${componentName}";\n`;
      exportArray.push(componentName);
    }
  }

  // export 문 생성
  const exportStatement = `export { ${exportArray.join(",\n")} };`;

  // index.ts 파일 내용 생성
  const indexContent = `${importStatements}\n${exportStatement}\n`;

  // index.ts 파일 작성
  await fs.writeFile(indexDir, indexContent);

  console.log("index.ts 파일이 성공적으로 생성되었습니다.");
}

async function saveSvgFiles(
  imageUrls: { [key: string]: string },
  childrenDict: Record<string, any>
) {
  const promises = Object.entries(imageUrls).map(([id, url]) => {
    try {
      return fetchImageFile(url, id);
    } catch (error) {
      console.error(`파일 저장 중 오류 발생 (${id}):`, error);
      throw error;
    }
  });

  const awaitedPromises = await Promise.all(promises);

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
  await fs.mkdir(iconsDir, { recursive: true });
  await fs.writeFile(path.join(iconsDir, `${filePath}.tsx`), content);
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
