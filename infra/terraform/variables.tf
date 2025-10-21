variable "bucket_name" {
  description = "Name of the S3 bucket to store PDFs"
  type        = string
}

variable "aws_region" {
  description = "AWS region (e.g., us-east-1)"
  type        = string
  default     = "us-east-1"
}
