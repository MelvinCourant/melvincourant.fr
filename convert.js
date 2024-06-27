import {CWebp} from "cwebp/lib/webp.js";
import fs from "fs";

const config = JSON.parse(fs.readFileSync('./converter.config.json', 'utf-8'));
const directoryPath = config.directories;
const formatToMatch = config.format;
let filesUrl = [];

function getFiles() {
    let promises = directoryPath.map((path) => {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    console.error('Erreur lors de la lecture du dossier :', err);
                    reject(err);
                } else {
                    files.forEach((file) => {
                        if(file.match(formatToMatch)) {
                            filesUrl.push(`${path}/${file}`);
                        }
                    });
                    resolve();
                }
            });
        });
    });

    return Promise.all(promises);
}

async function converter() {
    for (const file of filesUrl) {
        await new Promise((resolve, reject) => {
            fs.access(file, fs.constants.F_OK | fs.constants.R_OK, (err) => {
                if (err) {
                    console.error(`Le fichier ${file} n'existe pas ou ne peut être lu.`);
                    reject(err);
                } else {
                    const encoder = CWebp(file);
                    const outputFile = file.replace('.jpg', '.webp');
                    const fileName = file.replace('src/assets/imgs', '');

                    encoder.write(outputFile, function (err) {
                        if (err) {
                            console.error(`Erreur lors de la conversion du fichier ${fileName} :`, err);
                            reject(err);
                        } else {
                            console.log(`Le fichier ${fileName} a bien été converti.`);
                            resolve();
                        }
                    });
                }
            });
        });
    }
}

async function convertFiles() {
    await getFiles();
    await converter();
}

convertFiles();