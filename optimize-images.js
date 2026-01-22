import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'src/assets/team images');
const outputDir = path.join(__dirname, 'src/assets/team-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir);

async function optimizeImages() {
    for (const file of files) {
        const ext = path.extname(file).toLowerCase();

        // Skip non-image files and HEIC files
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
            console.log(`Skipping: ${file}`);
            continue;
        }

        const inputPath = path.join(inputDir, file);
        const outputFileName = path.basename(file, ext) + '.jpg';
        const outputPath = path.join(outputDir, outputFileName);

        try {
            await sharp(inputPath)
                .resize(600, 750, { fit: 'cover' }) // Resize to reasonable dimensions
                .jpeg({ quality: 80 }) // Compress as JPEG with 80% quality
                .toFile(outputPath);

            const inputStats = fs.statSync(inputPath);
            const outputStats = fs.statSync(outputPath);
            const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

            console.log(`✓ ${file} → ${outputFileName}`);
            console.log(`  Original: ${(inputStats.size / 1024).toFixed(0)}KB → Optimized: ${(outputStats.size / 1024).toFixed(0)}KB (${savings}% smaller)`);
        } catch (err) {
            console.error(`✗ Error processing ${file}:`, err.message);
        }
    }
    console.log('\nDone! Optimized images are in: src/assets/team-optimized/');
}

optimizeImages();
