output "bucket_name" {
  description = "Created bucket name"
  value       = aws_s3_bucket.pdfs.bucket
}

output "bucket_arn" {
  description = "S3 bucket ARN"
  value       = aws_s3_bucket.pdfs.arn
}
