import fs from "fs";

/**
 * Get all files from a given directory
 * @param {string} directory 
 */
export const getAllFiles = (directory: string) => {
    let fileArray: string[] = [];
    const files = fs.readdirSync(directory);

    for (const file of files) {
        if (fs.statSync(`${directory}/${file}`).isDirectory()) fileArray.push(...getAllFiles(`${directory}/${file}`));
        else fileArray.push(`${process.cwd().replace(/\\/g, "/")}/${directory.slice(2)}/${file}`);
    }

    fileArray.forEach((file) => delete require.cache[require.resolve(file)]);
    return fileArray;
};