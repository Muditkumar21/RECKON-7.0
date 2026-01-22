const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Source: unoptimized folder
const inputDir = path.join(__dirname, '..', 'src', 'assets', 'unoptimized');
// Output: team-optimized folder
const outputDir = path.join(__dirname, '..', 'src', 'assets', 'team-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files from input directory
const imageFiles = fs.readdirSync(inputDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
});

console.log(`Found ${imageFiles.length} images to compress...`);

async function compressImage(filename) {
    const inputPath = path.join(inputDir, filename);
    const ext = path.extname(filename).toLowerCase();
    const baseName = path.basename(filename, ext);
    // Clean up the filename - remove spaces and special chars
    const cleanName = baseName.replace(/\s+/g, '_').toLowerCase();
    const outputPath = path.join(outputDir, `${cleanName}.jpg`);

    try {
        const stats = fs.statSync(inputPath);
        const originalSize = (stats.size / 1024).toFixed(2);

        await sharp(inputPath)
            .resize(800, 1000, { // Max dimensions for portrait team photos
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 65 }) // Aggressive compression
            .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSize = (newStats.size / 1024).toFixed(2);

        console.log(`✓ ${filename}: ${originalSize}KB → ${newSize}KB (saved ${((1 - newStats.size / stats.size) * 100).toFixed(1)}%)`);
    } catch (error) {
        console.error(`✗ Error compressing ${filename}:`, error.message);
    }
}

async function main() {
    console.log('\nStarting image compression...\n');
    console.log(`Input folder: ${inputDir}`);
    console.log(`Output folder: ${outputDir}\n`);

    for (const file of imageFiles) {
        await compressImage(file);
    }

    console.log('\n✓ Compression complete! Optimized images saved to:', outputDir);
}

main();

