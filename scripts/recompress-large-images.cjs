const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Target folder - team-optimized
const targetDir = path.join(__dirname, '..', 'src', 'assets', 'team-optimized');

// Get all image files and filter to only those > 99KB (100000 bytes)
const imageFiles = fs.readdirSync(targetDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return false;

    const stats = fs.statSync(path.join(targetDir, file));
    return stats.size > 99000; // Files larger than ~99KB
});

console.log(`Found ${imageFiles.length} images over 99KB to re-compress...`);

async function reCompressImage(filename) {
    const filePath = path.join(targetDir, filename);
    const tempPath = path.join(targetDir, `temp_${filename}`);

    try {
        const stats = fs.statSync(filePath);
        const originalSize = (stats.size / 1024).toFixed(2);

        // More aggressive compression
        await sharp(filePath)
            .resize(600, 800, { // Smaller dimensions
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 55 }) // More aggressive quality
            .toFile(tempPath);

        // Replace original with compressed version
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);

        const newStats = fs.statSync(filePath);
        const newSize = (newStats.size / 1024).toFixed(2);

        console.log(`✓ ${filename}: ${originalSize}KB → ${newSize}KB (saved ${((1 - newStats.size / stats.size) * 100).toFixed(1)}%)`);
    } catch (error) {
        console.error(`✗ Error compressing ${filename}:`, error.message);
        // Clean up temp file if exists
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
    }
}

async function main() {
    console.log('\nRe-compressing large images...\n');
    console.log(`Target folder: ${targetDir}\n`);

    for (const file of imageFiles) {
        await reCompressImage(file);
    }

    console.log('\n✓ Re-compression complete!');
}

main();
