import AdmZip from "adm-zip";

export async function extractZip(
  zipPath: string,
  location: string,
): Promise<void> {
  const zip = new AdmZip(zipPath);

  await new Promise<void>((resolve, reject) => {
    zip.extractAllToAsync(location, true, false, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
