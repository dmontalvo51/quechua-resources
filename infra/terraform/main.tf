resource "aws_s3_bucket" "pdfs" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket                  = aws_s3_bucket.pdfs.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "public_read" {
  statement {
    sid     = "AllowPublicRead"
    effect  = "Allow"
    actions = ["s3:GetObject"]
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    resources = ["${aws_s3_bucket.pdfs.arn}/*"]
  }
}

resource "aws_s3_bucket_policy" "public" {
  bucket = aws_s3_bucket.pdfs.id
  policy = data.aws_iam_policy_document.public_read.json
}
