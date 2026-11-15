/**
 * Cloudinary image upload (server-side).
 * Uses CLOUDINARY_CLOUD_NAME + API_KEY + API_SECRET when configured.
 * Otherwise saves the file locally to /public/uploads and returns that path.
 */
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const API_KEY = process.env.CLOUDINARY_API_KEY?.trim();
const API_SECRET = process.env.CLOUDINARY_API_SECRET?.trim();

export const cloudinaryConfigured = Boolean(
  CLOUD_NAME && API_KEY && API_SECRET
);

export interface UploadResult {
  url: string;
  publicId?: string;
  provider: "cloudinary" | "local";
}

function configureCloudinary() {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  });
}

/**
 * Upload a File to Cloudinary (signed server-side upload).
 * Falls back to saving locally when Cloudinary isn't configured.
 */
export async function uploadImage(file: File): Promise<UploadResult> {
  if (cloudinaryConfigured) {
    try {
      configureCloudinary();
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await new Promise<{
        secure_url: string;
        public_id: string;
      }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "raihan-portfolio", resource_type: "image" },
          (err, res) => {
            if (err || !res) reject(err ?? new Error("Upload failed"));
            else
              resolve({
                secure_url: res.secure_url,
                public_id: res.public_id,
              });
          }
        );
        Readable.from(buffer).pipe(uploadStream);
      });
      return {
        url: result.secure_url,
        publicId: result.public_id,
        provider: "cloudinary",
      };
    } catch (err) {
      console.error("Cloudinary upload failed, falling back to local:", err);
      // fall through to local
    }
  }

  // Local fallback — save to /public/uploads
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);
  return { url: `/uploads/${filename}`, provider: "local" };
}
