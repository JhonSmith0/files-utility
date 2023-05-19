import { readdir, readFile, rename, rm, stat } from "fs/promises";
import { basename, dirname, resolve } from "path";

abstract class TreeItem {
  public parDirPath: string = dirname(this.path);
  public baseName: string = basename(this.path);
  public stat: Awaited<ReturnType<typeof stat>>;

  constructor(public path: string) {}

  public async remove() {
    await rm(this.path, { recursive: true });
  }

  public async move(newPath: string) {
    await rename(this.path, newPath);
  }
}

class Folder extends TreeItem {
  public async listDir() {
    const paths = await readdir(this.path);
    return paths.map((path) => resolve(this.parDirPath, path));
  }
}

abstract class File<T> extends TreeItem {
  public async readBuffer() {
    return await readFile(this.path);
  }
  public abstract read(): Promise<{ data: T; path: string }>;
}

async function main() {
  console.log("Hello world!");
}
main();
