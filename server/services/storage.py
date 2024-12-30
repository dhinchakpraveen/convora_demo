from minio import Minio
from ..config import settings

class StorageService:
    def __init__(self):
        self.client = Minio(
            settings.MINIO_ENDPOINT,
            access_key=settings.MINIO_ACCESS_KEY,
            secret_key=settings.MINIO_SECRET_KEY,
            secure=False
        )
        self._ensure_bucket_exists()

    def _ensure_bucket_exists(self):
        if not self.client.bucket_exists(settings.MINIO_BUCKET):
            self.client.make_bucket(settings.MINIO_BUCKET)

    async def upload_file(self, file):
        # Upload to MinIO and return URL
        file_path = f"{file.filename}"
        self.client.put_object(
            settings.MINIO_BUCKET,
            file_path,
            file.file,
            file.size
        )
        return self.client.presigned_get_object(settings.MINIO_BUCKET, file_path)